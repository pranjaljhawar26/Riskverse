import { useGame } from "@/data/store";
import { motion } from "framer-motion";
import type { Metrics } from "@/data/types";

const LABELS: Record<keyof Metrics, string> = {
  profitability: "Profitability",
  risk: "Risk Management",
  capital: "Capital",
  liquidity: "Liquidity",
  reputation: "Reputation",
  esg: "ESG",
};

export function MetricBars() {
  const metrics = useGame((s) => s.metrics);
  return (
    <div className="space-y-3">
      {(Object.keys(LABELS) as (keyof Metrics)[]).map((k) => {
        const v = metrics[k];
        const color =
          v >= 72
            ? "from-emerald-400 to-emerald-600"
            : v >= 55
              ? "from-gold-300 to-gold-500"
              : "from-red-400 to-red-600";
        return (
          <div key={k}>
            <div className="mb-1 flex items-center justify-between">
              <span className="font-display text-[10px] tracking-[0.2em] text-slate-300">
                {LABELS[k].toUpperCase()}
              </span>
              <span className="font-display text-xs text-gold-200">{v}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${v}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
