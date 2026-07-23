import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, RotateCcw, Send, Sparkles, User } from "lucide-react";
import { useGame } from "@/data/store";
import { SectionTitle } from "../ui/Primitives";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const opening: Message = {
  id: "opening",
  role: "assistant",
  content: "Good evening, CEO. I have the current RiskVerse position in view. Ask me for a risk briefing, a decision challenge, or the next priority.",
};

export function AthenaView() {
  const metrics = useGame((s) => s.metrics);
  const bank = useGame((s) => s.bank);
  const events = useGame((s) => s.events);
  const activeEventId = useGame((s) => s.activeEventId);
  const decisions = useGame((s) => s.decisions);
  const score = useGame((s) => s.score());
  const grade = useGame((s) => s.grade());
  const [messages, setMessages] = useState<Message[]>([opening]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const context = useMemo(
    () => ({
      executiveScore: { score, grade },
      metrics,
      bank,
      activeScenario: events.find((event) => event.id === activeEventId) ?? null,
      recentDecisions: decisions.slice(0, 5).map(({ eventTitle, optionLabel }) => ({ eventTitle, optionLabel })),
    }),
    [activeEventId, bank, decisions, events, grade, metrics, score],
  );

  async function sendMessage() {
    const content = draft.trim();
    if (!content || isSending) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setDraft("");
    setError("");
    setIsSending(true);

    try {
      const response = await fetch("/api/athena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content: message }) => ({ role, content: message })),
          context,
        }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || typeof data.reply !== "string" || !data.reply) {
        throw new Error(data.error || "ATHENA could not respond.");
      }
      const reply = data.reply;
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "assistant", content: reply },
      ]);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "ATHENA could not respond.");
    } finally {
      setIsSending(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6 md:p-10">
      <div className="mx-auto flex min-h-full max-w-6xl flex-col">
        <SectionTitle
          eyebrow="AI Advisor"
          title="Athena"
          subtitle="A live strategic intelligence briefing for the current RiskVerse simulation."
        />

        <section className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-gold-400/20 bg-navy-900/60 p-4 shadow-2xl backdrop-blur">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-200 to-gold-500 text-navy-950 shadow-lg shadow-gold-500/20">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="font-display text-sm tracking-[0.24em] text-gradient-gold">ATHENA · ONLINE</p>
              <p className="truncate font-serif text-sm italic text-slate-300/70">Executive Score {score} · {grade} risk posture</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { setMessages([opening]); setError(""); }}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-500/30 px-3 py-2 text-xs font-display tracking-wider text-slate-300 transition hover:border-gold-400/50 hover:text-gold-200"
            title="Start a new conversation"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </section>

        <section className="flex min-h-[440px] flex-1 flex-col overflow-hidden rounded-2xl border border-slate-500/20 bg-navy-950/65 shadow-2xl">
          <div className="flex-1 space-y-5 overflow-y-auto p-5 md:p-7">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.article
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${message.role === "assistant" ? "bg-gold-500 text-navy-950" : "bg-slate-700 text-slate-100"}`}>
                    {message.role === "assistant" ? <Bot size={17} /> : <User size={16} />}
                  </div>
                  <div className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-lg ${message.role === "assistant" ? "rounded-tl-sm border border-gold-300/15 bg-navy-900 text-slate-100" : "rounded-tr-sm bg-gold-500/15 text-gold-50"}`}>
                    <p className="mb-1 font-display text-[10px] tracking-[0.18em] text-gold-300/80">{message.role === "assistant" ? "ATHENA" : "CEO"}</p>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
            {isSending && (
              <div className="flex items-center gap-3 text-sm text-gold-200/80">
                <Loader2 className="animate-spin" size={18} /> ATHENA is assessing the horizon…
              </div>
            )}
          </div>

          <form onSubmit={(event) => { event.preventDefault(); void sendMessage(); }} className="border-t border-slate-500/20 bg-navy-900/70 p-4">
            {error && <p className="mb-3 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
            <div className="flex items-end gap-3">
              <textarea
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void sendMessage(); }
                }}
                rows={2}
                placeholder="Ask ATHENA about the current risk position…"
                className="min-h-[52px] flex-1 resize-none rounded-xl border border-slate-500/30 bg-navy-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/30"
              />
              <button
                type="submit"
                disabled={!draft.trim() || isSending}
                className="grid h-[52px] w-[52px] place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                title="Send message"
              >
                {isSending ? <Loader2 className="animate-spin" size={19} /> : <Send size={19} />}
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-400">Enter to send · Shift + Enter for a new line · Simulation analysis only</p>
          </form>
        </section>
      </div>
    </div>
  );
}
