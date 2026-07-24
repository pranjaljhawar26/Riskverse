import type { VercelRequest, VercelResponse } from "@vercel/node";

type ChatMessage = { role: "user" | "assistant"; content: string };

// Production counterpart of the Vite dev middleware in vite.config.ts.
// Runs as a Vercel Serverless Function so ATHENA works on deployed builds.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-5.4-mini";

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
    if (!apiKey) {
      return res.status(500).json({ error: "OPENAI_API_KEY is missing from the environment." });
    }

    const conversation = messages
      .map((message) => `${message.role === "user" ? "CEO" : "ATHENA"}: ${message.content}`)
      .join("\n\n");
    const context = JSON.stringify(body.context ?? {}, null, 2).slice(0, 8_000);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        instructions:
          "You are ATHENA, the strategic risk intelligence advisor for RiskVerse, an executive banking crisis simulation. Speak with calm, precise executive judgment. Use the supplied simulation context, distinguish facts from assumptions, and give practical next actions. You are not a substitute for regulated financial, legal, or investment advice. Keep most replies under 180 words and use short bullets when they improve clarity.",
        input: `SIMULATION CONTEXT:\n${context}\n\nCONVERSATION:\n${conversation}\n\nATHENA:`,
        text: { verbosity: "medium" },
      }),
    });

    const result = (await response.json()) as {
      output_text?: string;
      error?: { message?: string };
    };

    if (!response.ok) {
      return res.status(response.status).json({
        error: result.error?.message ?? "ATHENA could not reach the AI service.",
      });
    }

    return res.status(200).json({
      reply:
        result.output_text?.trim() ||
        "I have reviewed the situation. Please ask me to focus on a specific risk.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to process this request.";
    return res.status(500).json({ error: message });
  }
}
