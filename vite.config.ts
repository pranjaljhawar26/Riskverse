import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import type { IncomingMessage, ServerResponse } from "node:http";

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

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
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

async function readJson(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function athenaApi(provider: AthenaProvider): Plugin {
  return {
    name: "athena-chat-api",
    configureServer(server) {
      server.middlewares.use("/api/athena", async (req, res) => {
        if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed." });

        try {
          const body = (await readJson(req)) as {
            messages?: ChatMessage[];
            context?: Record<string, unknown>;
          };
          const messages = (body.messages ?? [])
            .filter((message) =>
              (message.role === "user" || message.role === "assistant") &&
              typeof message.content === "string",
            )
            .slice(-12)
            .map((message) => ({
              role: message.role,
              content: message.content.trim().slice(0, 2_000),
            }))
            .filter((message) => message.content);

          if (!messages.length) return sendJson(res, 400, { error: "Please enter a message." });
          if (!provider.apiKey) {
            return sendJson(res, 500, { error: provider.missingKeyMessage });
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
            return sendJson(res, response.status, {
              error: result.error?.message ?? "ATHENA could not reach the AI service.",
            });
          }

          const reply = responseText(result);
          if (!reply) {
            return sendJson(res, 502, {
              error: "ATHENA received a response without assistant text. Check the Azure deployment and response format.",
            });
          }

          return sendJson(res, 200, { reply });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unable to process this request.";
          return sendJson(res, 500, { error: message });
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const azureEndpoint = env.AZURE_OPENAI_ENDPOINT?.replace(/\/$/, "");
  const azureBaseUrl = azureEndpoint?.endsWith("/openai/v1")
    ? azureEndpoint
    : azureEndpoint && `${azureEndpoint}/openai/v1`;
  const azureApiVersion = env.AZURE_OPENAI_API_VERSION || "v1";
  const provider: AthenaProvider = azureBaseUrl
    ? {
        apiKey: env.AZURE_OPENAI_API_KEY,
        model: env.AZURE_OPENAI_DEPLOYMENT,
        url: `${azureBaseUrl}/responses?api-version=${encodeURIComponent(azureApiVersion)}`,
        headers: { "api-key": env.AZURE_OPENAI_API_KEY },
        missingKeyMessage: "AZURE_OPENAI_API_KEY is missing from .env.local.",
      }
    : {
        apiKey: env.OPENAI_API_KEY,
        model: env.OPENAI_MODEL || "gpt-5.4-mini",
        url: "https://api.openai.com/v1/responses",
        headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}` },
        missingKeyMessage: "OPENAI_API_KEY is missing from .env.local.",
      };

  return {
    plugins: [react(), athenaApi(provider)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5173,
      open: true,
    },
  };
});
