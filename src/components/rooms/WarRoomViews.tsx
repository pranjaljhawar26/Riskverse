import { useGame } from "@/data/store";
import { motion } from "framer-motion";
import { SectionTitle, Panel } from "../ui/Primitives";
import { AlertTriangle, Flame, ShieldAlert } from "lucide-react";
import { MetricBars } from "../hud/MetricBars";

const SEV_COLOR: Record<string, string> = {
  low: "text-emerald-400 border-emerald-400/40",
  medium: "text-gold-300 border-gold-400/40",
  high: "text-orange-400 border-orange-400/40",
  critical: "text-red-400 border-red-500/40",
  endgame: "text-fuchsia-400 border-fuchsia-500/40",
};

export function ScenariosView() {
  const events = useGame((s) => s.events);
  const openInvestigation = useGame((s) => s.openInvestigation);

  return (
    <div className="h-full overflow-y-auto p-8 md:p-12">
      <SectionTitle
        eyebrow="Situation Deck"
        title="Active Scenarios"
        subtitle="Live threats developing across the global system. Investigate to decide."
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {events.map((e, i) => (
          <motion.button
            key={e.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            onClick={() => openInvestigation(e.id)}
            className="glass group rounded-2xl p-5 text-left shadow-note"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-3xl">{e.icon}</span>
              <span
                className={`rounded-full border px-2 py-0.5 font-display text-[9px] tracking-[0.2em] ${SEV_COLOR[e.severity]}`}
              >
                {e.severity.toUpperCase()}
              </span>
            </div>
            <h3 className="font-display text-lg tracking-wide text-gold-100">
              {e.title}
            </h3>
            <p className="mt-1 line-clamp-2 font-serif text-sm text-slate-400">
              {e.summary}
            </p>
            <div className="mt-4 flex items-center gap-4 border-t border-white/5 pt-3 text-[11px]">
              <span className="text-red-300">Credit {e.creditImpact}</span>
              <span className="text-orange-300">P&L {e.plImpact}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export function WarRoomView() {
  const mood = useGame((s) => s.mood());
  const events = useGame((s) => s.events);
  const decisions = useGame((s) => s.decisions);

  return (
    <div className="h-full overflow-y-auto p-8 md:p-12">
      <SectionTitle
        eyebrow="Threat Monitoring"
        title="War Room"
        subtitle="Real-time crisis command. Monitor threat level and executive posture."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel title="Threat Level" icon={<ShieldAlert size={16} />}>
          <div
            className={`grid place-items-center rounded-xl p-8 ${
              mood === "crisis"
                ? "bg-red-950/40 animate-crisisPulse"
                : mood === "tense"
                  ? "bg-amber-950/30"
                  : "bg-emerald-950/20"
            }`}
          >
            <AlertTriangle
              size={54}
              className={
                mood === "crisis"
                  ? "text-red-400"
                  : mood === "tense"
                    ? "text-amber-300"
                    : "text-emerald-400"
              }
            />
            <p className="mt-3 font-display text-2xl tracking-[0.3em] text-gold-100">
              {mood.toUpperCase()}
            </p>
          </div>
        </Panel>

        <Panel title="Pillar Readiness" className="lg:col-span-1">
          <MetricBars />
        </Panel>

        <Panel title="Live Incident Feed" icon={<Flame size={16} />}>
          <div className="space-y-3">
            {events.map((e) => (
              <div
                key={e.id}
                className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3"
              >
                <span className="text-xl">{e.icon}</span>
                <div>
                  <p className="font-display text-xs tracking-wide text-gold-100">
                    {e.title}
                  </p>
                  <p className="font-serif text-[11px] text-slate-400">
                    {e.horizon}
                  </p>
                </div>
              </div>
            ))}
            <p className="pt-2 font-serif text-xs italic text-slate-500">
              {decisions.length} decisions logged this session.
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
