import { useGame } from "@/data/store";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export function ScoreBadge() {
  const score = useGame((s) => s.score());
  const grade = useGame((s) => s.grade());
  const mood = useGame((s) => s.mood());

  const ring =
    mood === "crisis"
      ? "border-red-500/60 shadow-[0_0_30px_-5px_rgba(220,38,38,0.6)]"
      : mood === "tense"
        ? "border-amber-400/50 shadow-[0_0_28px_-6px_rgba(255,179,71,0.5)]"
        : "border-gold-400/50 shadow-gold";

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-strong flex items-center gap-3 rounded-2xl border px-4 py-2 ${ring}`}
    >
      <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-navy-950">
        <Crown size={20} strokeWidth={2.4} />
      </div>
      <div className="leading-tight">
        <p className="font-display text-[10px] tracking-[0.35em] text-gold-300/80">
          EXECUTIVE SCORE
        </p>
        <p className="font-display text-xl text-gradient-gold">
          {score}
          <span className="ml-2 rounded-md bg-gold-400/15 px-2 py-0.5 text-sm text-gold-200">
            {grade}
          </span>
        </p>
      </div>
    </motion.div>
  );
}
