import { useGame } from "@/data/store";
import { motion } from "framer-motion";
import { SectionTitle, Panel } from "../ui/Primitives";
import {
  AlertTriangle,
  Flame,
  ShieldAlert,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { MetricBars } from "../hud/MetricBars";

const SEV_COLOR: Record<string, string> = {
  low: "text-emerald-400 border-emerald-400/40 bg-emerald-500/10",
  medium: "text-gold-300 border-gold-400/40 bg-gold-500/10",
  high: "text-orange-400 border-orange-400/40 bg-orange-500/10",
  critical: "text-red-400 border-red-500/40 bg-red-500/10",
  endgame: "text-fuchsia-400 border-fuchsia-500/40 bg-fuchsia-500/10",
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
                className={`rounded-full border px-2 py-0.5 font-display text-[9px] tracking-[0.2em] ${
                  SEV_COLOR[e.severity] || "text-gold-300 border-gold-400/40"
                }`}
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
  const openInvestigation = useGame((s) => s.openInvestigation);

  // Track resolved vs unresolved incidents
  const resolvedTitles = new Set(decisions.map((d) => d.eventTitle));
  const unresolvedEvents = events.filter((e) => !resolvedTitles.has(e.title));
  const activeCount = unresolvedEvents.length;

  const isCrisis = mood === "crisis";
  const isTense = mood === "tense";

  const statusLabel = isCrisis
    ? "CRISIS ALERT"
    : isTense
      ? "ELEVATED ALERT"
      : "SYSTEM STABLE";

  return (
    <div className="h-full overflow-y-auto p-8 md:p-12">
      <SectionTitle
        eyebrow="Threat Monitoring"
        title="War Room"
        subtitle="Real-time crisis command. Monitor system threat levels and live incident vectors."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* PERFECTLY CENTERED THREAT LEVEL PANEL */}
        <Panel title="System Threat Level" icon={<ShieldAlert size={16} />}>
          <div
            className={`relative flex flex-col items-center justify-center text-center rounded-2xl p-8 border transition-all duration-700 ${
              isCrisis
                ? "bg-red-950/60 border-red-500/60 shadow-[0_0_60px_rgba(239,68,68,0.4)] animate-crisisPulse"
                : isTense
                  ? "bg-amber-950/50 border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.3)]"
                  : "bg-emerald-950/30 border-emerald-500/30"
            }`}
          >
            {/* Live Beacon Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isCrisis
                    ? "bg-red-500 animate-ping"
                    : isTense
                      ? "bg-amber-400 animate-pulse"
                      : "bg-emerald-400"
                }`}
              />
              <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase">
                {isCrisis ? "LIVE THREAT" : isTense ? "WARNING" : "NOMINAL"}
              </span>
            </div>

            {/* Centered Alert Icon */}
            <motion.div
              animate={{ scale: isCrisis ? [1, 1.08, 1] : 1 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="my-3 flex justify-center"
            >
              <AlertTriangle
                size={64}
                className={
                  isCrisis
                    ? "text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.8)]"
                    : isTense
                      ? "text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.6)]"
                      : "text-emerald-400"
                }
              />
            </motion.div>

            {/* Centered Status Text */}
            <h2
              className={`w-full text-center font-display text-2xl md:text-3xl font-extrabold tracking-[0.25em] leading-tight ${
                isCrisis
                  ? "text-red-400"
                  : isTense
                    ? "text-amber-300"
                    : "text-emerald-400"
              }`}
            >
              {statusLabel}
            </h2>

            {/* Centered Status Subtext & Pill Badge */}
            <div className="mt-5 flex flex-col items-center justify-center text-center gap-2 w-full pt-4 border-t border-white/10">
              <div className="inline-flex items-center justify-center rounded-full bg-black/40 border border-white/10 px-4 py-1.5 font-mono text-xs text-slate-200 text-center">
                {activeCount > 0 ? (
                  <strong className="text-red-400 font-bold">
                    {activeCount} Active Unresolved Threats
                  </strong>
                ) : (
                  <span className="text-emerald-400 font-medium">
                    All System Hazards Mitigated
                  </span>
                )}
              </div>

              {isCrisis && (
                <p className="font-serif text-xs text-red-300 text-center italic mt-1">
                  High-severity hazards detected. Immediate executive
                  intervention required.
                </p>
              )}
            </div>
          </div>
        </Panel>

        {/* PILLAR READINESS BAR CHART */}
        <Panel title="Pillar Readiness" className="lg:col-span-1">
          <MetricBars />
        </Panel>

        {/* INTERACTIVE LIVE INCIDENT FEED */}
        <Panel title="Live Incident Feed" icon={<Flame size={16} />}>
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {events.map((e) => {
              const isResolved = resolvedTitles.has(e.title);
              return (
                <div
                  key={e.id}
                  onClick={() => openInvestigation(e.id)}
                  className={`group flex items-center justify-between gap-3 rounded-xl border p-3 cursor-pointer transition-all hover:border-gold-400/50 ${
                    isResolved
                      ? "border-emerald-500/20 bg-emerald-950/10 opacity-70"
                      : "border-white/10 bg-navy-950/60 hover:bg-navy-900/80 shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{e.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-display text-xs tracking-wide text-gold-100 font-bold">
                          {e.title}
                        </p>
                        <span
                          className={`rounded px-1.5 py-0.2 font-display text-[8px] tracking-wider uppercase border ${
                            SEV_COLOR[e.severity] ||
                            "text-gold-300 border-gold-400/30"
                          }`}
                        >
                          {e.severity}
                        </span>
                      </div>
                      <p className="font-serif text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock size={10} /> Horizon: {e.horizon}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isResolved ? (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 font-display text-[9px] font-bold text-emerald-300">
                        <CheckCircle2 size={10} /> RESOLVED
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-red-500/20 border border-red-500/40 px-2.5 py-0.5 font-display text-[9px] font-bold text-red-300 group-hover:bg-red-500/30">
                        ACTION ▸
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="pt-3 border-t border-white/5 font-serif text-xs italic text-slate-400 flex items-center justify-between mt-3">
            <span>{decisions.length} Executive Decisions Logged</span>
            <span className="text-gold-300 font-mono text-[10px]">
              Click any incident to investigate ▸
            </span>
          </p>
        </Panel>
      </div>
    </div>
  );
}
