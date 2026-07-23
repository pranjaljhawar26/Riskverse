import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import type { IncomingMessage, ServerResponse } from "node:http";

type ChatMessage = { role: "user" | "assistant"; content: string };

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

async function readJson(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function athenaApi(apiKey: string, model: string): Plugin {
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
          if (!apiKey) {
            return sendJson(res, 500, { error: "OPENAI_API_KEY is missing from .env.local." });
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
            return sendJson(res, response.status, {
              error: result.error?.message ?? "ATHENA could not reach the AI service.",
            });
          }

          return sendJson(res, 200, {
            reply: result.output_text?.trim() || "I have reviewed the situation. Please ask me to focus on a specific risk.",
          });
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

  return {
    plugins: [react(), athenaApi(env.OPENAI_API_KEY, env.OPENAI_MODEL || "gpt-5.4-mini")],
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
