import type { VercelRequest, VercelResponse } from "@vercel/node";

type ChatMessage = { role: "user" | "assistant"; content: string };
type AthenaProvider = {
  apiKey: string;
  model: string;
  url: string;
  headers: Record<string, string>;
  missingKeyMessage: string;
};
type ResponsesOutputItem = {
  content?: Array<{ text?: string; type?: string }>;
};
type ResponsesResult = {
  output_text?: string;
  output?: ResponsesOutputItem[];
  error?: { message?: string };
};

// Production counterpart of the Vite dev middleware in vite.config.ts.
// Runs as a Vercel Serverless Function so ATHENA works on deployed builds.
// Keep the provider selection in sync with vite.config.ts.
function resolveProvider(): AthenaProvider {
  const env = process.env;
  const azureEndpoint = env.AZURE_OPENAI_ENDPOINT?.replace(/\/$/, "");
  const azureBaseUrl = azureEndpoint?.endsWith("/openai/v1")
    ? azureEndpoint
    : azureEndpoint && `${azureEndpoint}/openai/v1`;
  const azureApiVersion = env.AZURE_OPENAI_API_VERSION || "v1";

  if (azureBaseUrl) {
    const apiKey = env.AZURE_OPENAI_API_KEY ?? "";
    return {
      apiKey,
      model: env.AZURE_OPENAI_DEPLOYMENT ?? "",
      url: `${azureBaseUrl}/responses?api-version=${encodeURIComponent(azureApiVersion)}`,
      headers: { "api-key": apiKey },
      missingKeyMessage: "AZURE_OPENAI_API_KEY is missing from the environment.",
    };
  }

  const apiKey = env.OPENAI_API_KEY ?? "";
  return {
    apiKey,
    model: env.OPENAI_MODEL || "gpt-5.4-mini",
    url: "https://api.openai.com/v1/responses",
    headers: { Authorization: `Bearer ${apiKey}` },
    missingKeyMessage: "OPENAI_API_KEY is missing from the environment.",
  };
}

function responseText(result: ResponsesResult): string {
  if (typeof result.output_text === "string" && result.output_text.trim()) {
    return result.output_text.trim();
  }

  return (result.output ?? [])
    .flatMap((item) => item.content ?? [])
    .filter((part) => part.type === "output_text" && typeof part.text === "string")
    .map((part) => part.text!.trim())
    .filter(Boolean)
    .join("\n");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const provider = resolveProvider();

  try {
    const body = (req.body ?? {}) as {
      messages?: ChatMessage[];
      context?: Record<string, unknown>;
    };

    const messages = (body.messages ?? [])
      .filter(
        (message) =>
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string",
      )
      .slice(-12)
      .map((message) => ({
        role: message.role,
        content: message.content.trim().slice(0, 2_000),
      }))
      .filter((message) => message.content);

    if (!messages.length) return res.status(400).json({ error: "Please enter a message." });
    if (!provider.apiKey) {
      return res.status(500).json({ error: provider.missingKeyMessage });
    }

    const conversation = messages
      .map((message) => `${message.role === "user" ? "CEO" : "ATHENA"}: ${message.content}`)
      .join("\n\n");
    const context = JSON.stringify(body.context ?? {}, null, 2).slice(0, 8_000);

    const response = await fetch(provider.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...provider.headers,
      },
      body: JSON.stringify({
        model: provider.model,
        instructions:
          "You are ATHENA, the strategic risk intelligence advisor for RiskVerse, an executive banking crisis simulation. Speak with calm, precise executive judgment. Use the supplied simulation context, distinguish facts from assumptions, and give practical next actions. You are not a substitute for regulated financial, legal, or investment advice. Keep most replies under 180 words and use short bullets when they improve clarity.",
        input: `SIMULATION CONTEXT:\n${context}\n\nCONVERSATION:\n${conversation}\n\nATHENA:`,
        text: { verbosity: "medium" },
      }),
    });

    const result = (await response.json()) as ResponsesResult;

    if (!response.ok) {
      return res.status(response.status).json({
        error: result.error?.message ?? "ATHENA could not reach the AI service.",
      });
    }

    const reply = responseText(result);
    if (!reply) {
      return res.status(502).json({
        error:
          "ATHENA received a response without assistant text. Check the Azure deployment and response format.",
      });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to process this request.";
    return res.status(500).json({ error: message });
  }
}
