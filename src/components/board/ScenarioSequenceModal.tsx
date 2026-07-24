import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  Sparkles,
  Heart,
  Repeat,
  MessageSquare,
  Newspaper,
  Tv,
  Smartphone,
  Activity,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { GameEvent } from "@/data/types";
import { useGame } from "@/data/store";

interface ModalProps {
  events: GameEvent[];
  onClose: () => void;
}

export function ScenarioSequenceModal({ events, onClose }: ModalProps) {
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const resolveDecision = useGame((s) => s.resolveDecision);

  // Social Feed Interactive Likes state
  const [likes, setLikes] = useState<Record<number, number>>({
    1: 1240,
    2: 904,
    3: 612,
  });
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    setLikes((prev) => ({ ...prev, [id]: prev[id] + (liked[id] ? -1 : 1) }));
  };

  // Compute Aggregated Impacts
  const aggregatedKpi = events.reduce(
    (acc, ev) => {
      const k = ev.kpiImpacts || {};
      return {
        sharePrice: +(acc.sharePrice + (k.sharePrice || -2.5)).toFixed(1),
        netProfit: +(acc.netProfit + (k.netProfit || -1.2)).toFixed(1),
        cet1: +(acc.cet1 + (k.cet1 || -0.3)).toFixed(2),
        lcr: acc.lcr + (k.lcr || -5),
        creditRiskIndex: acc.creditRiskIndex + (k.creditRiskIndex || 10),
        marketRiskIndex: acc.marketRiskIndex + (k.marketRiskIndex || 6),
        reputationScore: acc.reputationScore + (k.reputationScore || -4),
        esgScore: acc.esgScore + (k.esgScore || k.esg || 1),
      };
    },
    {
      sharePrice: -6.2,
      netProfit: -2.1,
      cet1: -0.4,
      lcr: -12,
      creditRiskIndex: 68,
      marketRiskIndex: 54,
      reputationScore: 62,
      esgScore: 72,
    },
  );

  const mergedIndustries = Array.from(
    new Set(events.flatMap((e) => e.industries || [])),
  );
  const primaryEvent = events[0];

  const stageIcons = [
    { id: 1, label: "Newspaper", icon: Newspaper },
    { id: 2, label: "TV Breaking", icon: Tv },
    { id: 3, label: "Social Wire", icon: Smartphone },
    { id: 4, label: "Sentiment", icon: Activity },
    { id: 5, label: "Athena Memo", icon: Sparkles },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 md:p-6 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-gold-400/30 bg-[#080d1a] shadow-[0_30px_120px_rgba(0,0,0,0.95)] text-slate-100 my-auto"
        >
          {/* STEPPER HEADER */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-navy-950 px-4 md:px-6 py-3 gap-3">
            <div className="flex items-center gap-2">
              <span className="rounded bg-gradient-to-r from-gold-500/20 to-gold-400/10 px-2.5 py-1 font-display text-[10px] tracking-widest text-gold-300 border border-gold-400/30">
                SCENARIO SIMULATOR
              </span>
              <span className="font-serif text-xs text-slate-300 font-semibold truncate max-w-[200px] sm:max-w-none">
                {events.length > 1
                  ? `${events.length} Scenarios Aggregated`
                  : primaryEvent.title}
              </span>
            </div>

            {/* Stepper Tabs */}
            <div className="flex items-center gap-1.5 font-display text-[10px]">
              {stageIcons.map((st) => {
                const Icon = st.icon;
                const active = stage === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setStage(st.id as any)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all ${
                      active
                        ? "bg-gold-400 text-navy-950 font-bold shadow-gold"
                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                    }`}
                  >
                    <Icon size={13} />
                    <span className="hidden sm:inline">{st.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* STAGE DISPLAY AREA */}
          <div className="p-5 md:p-8 min-h-[460px] flex flex-col justify-between">
            {/* STAGE 1: NEWSPAPER ARRIVES */}
            {stage === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                <div className="md:col-span-7 paper rounded-sm border-[6px] border-[#221c15] p-6 shadow-2xl relative overflow-hidden">
                  <div className="border-b-2 border-double border-[#332c22] pb-2 text-center">
                    <p className="font-serif text-[9px] tracking-[0.4em] text-[#554b3a] font-bold">
                      FINANCIAL TIMES
                    </p>
                    <h2 className="my-1 font-serif text-2xl font-extrabold uppercase leading-tight text-[#111]">
                      {primaryEvent.headline}
                    </h2>
                    <p className="font-serif text-[9px] italic text-[#666]">
                      LONDON • NEW YORK • FRANKFURT
                    </p>
                  </div>

                  <div className="mt-4 font-serif text-xs text-[#222] leading-relaxed text-justify md:columns-2 gap-4">
                    <p className="whitespace-pre-line">
                      <span className="float-left text-4xl font-extrabold pr-1.5 pt-0.5 leading-none text-[#111]">
                        {primaryEvent.narrative.charAt(0)}
                      </span>
                      {primaryEvent.narrative.slice(1)}
                    </p>
                  </div>

                  {events.length > 1 && (
                    <div className="mt-4 border-t border-dashed border-[#555]/30 pt-2 font-serif text-[10px] italic text-[#444]">
                      * Compound risk report aggregating {events.length}{" "}
                      simultaneous shocks across {mergedIndustries.join(", ")}.
                    </div>
                  )}
                </div>

                <div className="md:col-span-5 rounded-2xl border border-gold-400/20 bg-navy-950/80 p-5 shadow-xl backdrop-blur">
                  <h3 className="font-display text-xs tracking-[0.2em] text-gold-300 mb-4 border-b border-gold-500/15 pb-2">
                    IMPACT SUMMARY
                  </h3>
                  <div className="space-y-3 font-serif text-xs">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">
                        Estimated Credit Loss:
                      </span>
                      <span className="font-bold text-red-400">
                        {primaryEvent.creditImpact}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">
                        Share Price Impact:
                      </span>
                      <span className="font-bold text-red-400">
                        {aggregatedKpi.sharePrice}%
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">Exposed Sectors:</span>
                      <span className="font-bold text-gold-200">
                        {mergedIndustries.join(", ") || "Banking"}
                      </span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-slate-400">Time Horizon:</span>
                      <span className="font-mono text-slate-300">
                        {primaryEvent.horizon}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STAGE 2: TV BREAKING NEWS (CNBC) */}
            {stage === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border-4 border-slate-800 bg-black p-4 md:p-6 shadow-2xl relative overflow-hidden"
              >
                {/* TV Scanlines overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-30" />

                {/* CNBC Live Broadcast Banner */}
                <div className="flex items-center justify-between bg-red-950 border border-red-500/40 px-4 py-2 rounded.lg mb-4 text-white">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 rounded bg-red-600 px-2 py-0.5 font-display text-[10px] font-bold animate-pulse">
                      <span className="h-2 w-2 rounded-full bg-white animate-ping" />{" "}
                      LIVE
                    </span>
                    <span className="font-display text-xs md:text-sm font-bold tracking-wider text-red-100">
                      BREAKING NEWS: {primaryEvent.headline}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-gold-300 hidden sm:inline">
                    CNBC
                  </span>
                </div>

                {/* Market Ticker Tape */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                  <Ticker symbol="S&P 500" val="-2.10%" down />
                  <Ticker symbol="EURO STOXX 50" val="-1.85%" down />
                  <Ticker symbol="BANK INDEX" val="-1.62%" down />
                  <Ticker symbol="OIL PRICE" val="+4.05%" down={false} />
                </div>

                {/* Analysts React */}
                <p className="font-display text-[10px] tracking-widest text-slate-400 mb-2">
                  ANALYSTS REACT
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <AnalystCard
                    firm="J.P. Morgan"
                    quote="Climate exposure remains underestimated."
                  />
                  <AnalystCard
                    firm="Morgan Stanley"
                    quote="Expect pressure on Q2 bank earnings."
                  />
                  <AnalystCard
                    firm="Goldman Sachs"
                    quote="Monitor CRE and insurance losses."
                  />
                  <AnalystCard
                    firm="DB Research"
                    quote="Impact manageable if response is fast."
                  />
                </div>
              </motion.div>
            )}

            {/* STAGE 3: SOCIAL FEED ON MOBILE */}
            {stage === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-md w-full rounded-[36px] border-[6px] border-slate-700 bg-slate-950 p-4 shadow-2xl text-slate-100 relative"
              >
                {/* Phone Notch */}
                <div className="mx-auto mb-3 h-4 w-28 rounded-full bg-slate-800" />

                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="font-display text-xs font-bold text-gold-300">
                    🌐 WorldWire
                  </span>
                  <span className="font-mono text-[9px] text-slate-400">
                    Public Sentiment Feed
                  </span>
                </div>

                <div className="flex gap-2 text-[10px] text-sky-400 font-mono mb-3">
                  <span>#Wildfires</span> <span>#ClimateRisk</span>{" "}
                  <span>#Banking</span>
                </div>

                <div className="space-y-3 font-sans text-xs">
                  {[
                    {
                      id: 1,
                      user: "InvestorDaily",
                      handle: "@InvestorDaily",
                      text: `Concern growing around European banks exposed to CRE hazards after ${primaryEvent.title}.`,
                    },
                    {
                      id: 2,
                      user: "GreenFuture",
                      handle: "@GreenFuture",
                      text: "Banks must do more to support climate resilience. Action speaks louder!",
                    },
                    {
                      id: 3,
                      user: "MarketWatcher",
                      handle: "@MarketWatcher",
                      text: "Credit costs expected to rise. How will executive boards respond?",
                    },
                  ].map((tw) => (
                    <div
                      key={tw.id}
                      className="rounded-xl bg-slate-900/90 p-3 border border-slate-800 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-200">
                          {tw.user}
                        </span>
                        <span className="text-slate-500 font-mono">
                          {tw.handle}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-snug">{tw.text}</p>
                      <div className="flex items-center gap-4 text-slate-500 pt-1 text-[10px]">
                        <button
                          onClick={() => toggleLike(tw.id)}
                          className={`flex items-center gap-1 hover:text-red-400 ${liked[tw.id] ? "text-red-400" : ""}`}
                        >
                          <Heart
                            size={12}
                            fill={liked[tw.id] ? "#f87171" : "none"}
                          />{" "}
                          {likes[tw.id]}
                        </button>
                        <span className="flex items-center gap-1">
                          <Repeat size={12} /> 342
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare size={12} /> 128
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STAGE 4: SENTIMENT ANALYZER */}
            {stage === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-4 rounded-2xl border border-white/10 bg-navy-950 p-5">
                  <h3 className="font-display text-xs tracking-widest text-gold-300">
                    PUBLIC SENTIMENT OVERVIEW
                  </h3>
                  <Gauge label="Investor Confidence" val={42} tone="low" />
                  <Gauge label="Customer Confidence" val={58} tone="mod" />
                  <Gauge label="Employee Morale" val={74} tone="good" />
                  <Gauge label="Public Trust" val={38} tone="low" />
                </div>

                <div className="rounded-2xl border border-white/10 bg-navy-950 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xs tracking-widest text-gold-300 mb-4">
                      SENTIMENT DRIVERS
                    </h3>
                    <div className="space-y-2 text-xs font-serif">
                      <Driver
                        label="Wildfire Exposure Concerns"
                        delta="-28%"
                        bad
                      />
                      <Driver label="CRE Portfolio Risks" delta="-22%" bad />
                      <Driver label="Management Response" delta="-5%" bad />
                      <Driver label="Transparency" delta="+8%" bad={false} />
                      <Driver label="ESG Actions" delta="+12%" bad={false} />
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 text-center">
                    <span className="font-display text-2xl text-amber-300 font-bold">
                      53 / 100
                    </span>
                    <p className="font-display text-[9px] tracking-widest text-amber-200 mt-0.5">
                      OVERALL MODERATE RISK
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STAGE 5: ATHENA MEMO & BANK IMPACT GRID */}
            {stage === 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                <div className="paper rounded-lg p-5 shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-gold-600 mb-2">
                      <Sparkles size={16} />
                      <span className="font-display text-[10px] tracking-widest">
                        ATHENA AI ADVISOR
                      </span>
                    </div>
                    <p className="font-serif text-xs font-bold text-[#333] mb-2">
                      To: CEO
                    </p>
                    <p className="font-pen text-sm text-[#222] leading-relaxed">
                      "Public concern is increasing. Deposit behavior remains
                      stable. We should consider a targeted communication
                      campaign and review CRE exposures."
                    </p>
                  </div>
                  <p className="font-serif text-right text-xs italic text-[#555] mt-4">
                    – Athena
                  </p>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <h3 className="font-display text-xs tracking-widest text-gold-300">
                    BANK IMPACT SUMMARY
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <MetricBox
                      label="SHARE PRICE"
                      val="€102.45"
                      delta={`${aggregatedKpi.sharePrice}%`}
                      bad
                    />
                    <MetricBox
                      label="NET PROFIT"
                      val="€4.2B"
                      delta={`${aggregatedKpi.netProfit}%`}
                      bad
                    />
                    <MetricBox
                      label="CET1 RATIO"
                      val="14.3%"
                      delta={`${aggregatedKpi.cet1}%`}
                      bad
                    />
                    <MetricBox
                      label="LCR"
                      val="152%"
                      delta={`${aggregatedKpi.lcr}%`}
                      bad
                    />
                    <MetricBox
                      label="CREDIT RISK"
                      val={`${aggregatedKpi.creditRiskIndex}/100`}
                      delta="+15"
                      bad
                    />
                    <MetricBox
                      label="MARKET RISK"
                      val={`${aggregatedKpi.marketRiskIndex}/100`}
                      delta="+9"
                      bad
                    />
                    <MetricBox
                      label="REPUTATION"
                      val={`${aggregatedKpi.reputationScore}/100`}
                      delta="-8"
                      bad
                    />
                    <MetricBox
                      label="ESG SCORE"
                      val={`${aggregatedKpi.esgScore}/100`}
                      delta="+3"
                      bad={false}
                    />
                  </div>

                  <div className="pt-2">
                    <p className="font-display text-[10px] tracking-widest text-slate-400 mb-2">
                      RECOMMENDED ACTIONS
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {primaryEvent.options.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            resolveDecision(primaryEvent, opt);
                            onClose();
                          }}
                          className="rounded-lg border border-gold-400/40 bg-gradient-to-r from-gold-500/20 to-gold-400/10 px-4 py-2 font-display text-xs text-gold-200 hover:border-gold-300 hover:bg-gold-400/30 transition-all"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* BOTTOM NAVIGATION BAR */}
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <button
                disabled={stage === 1}
                onClick={() => setStage((s) => (s - 1) as any)}
                className="rounded-lg border border-slate-700 px-4 py-2 font-display text-xs text-slate-300 hover:border-slate-500 disabled:opacity-30"
              >
                ◄ PREVIOUS
              </button>

              {stage < 5 ? (
                <button
                  onClick={() => setStage((s) => (s + 1) as any)}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 px-6 py-2 font-display text-xs text-navy-950 font-bold shadow-gold hover:brightness-110"
                >
                  NEXT <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="rounded-lg bg-emerald-500 px-6 py-2 font-display text-xs text-slate-950 font-bold hover:bg-emerald-400"
                >
                  FINISH SIMULATION
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function Ticker({
  symbol,
  val,
  down,
}: {
  symbol: string;
  val: string;
  down: boolean;
}) {
  return (
    <div className="rounded-lg bg-slate-900/90 p-2 text-center border border-white/10">
      <p className="font-display text-[9px] text-slate-400">{symbol}</p>
      <p
        className={`font-mono text-xs font-bold ${down ? "text-red-400" : "text-emerald-400"}`}
      >
        {val}
      </p>
    </div>
  );
}

function AnalystCard({ firm, quote }: { firm: string; quote: string }) {
  return (
    <div className="rounded-lg bg-slate-900/80 p-2.5 border border-white/5 text-[10px]">
      <p className="font-bold text-gold-300">{firm}</p>
      <p className="text-slate-300 italic mt-0.5">{quote}</p>
    </div>
  );
}

function Gauge({
  label,
  val,
  tone,
}: {
  label: string;
  val: number;
  tone: "low" | "mod" | "good";
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-300">{label}</span>
        <span className="font-bold text-gold-200">{val}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${tone === "low" ? "bg-red-500" : tone === "mod" ? "bg-amber-400" : "bg-emerald-400"}`}
          style={{ width: `${val}%` }}
        />
      </div>
    </div>
  );
}

function Driver({
  label,
  delta,
  bad,
}: {
  label: string;
  delta: string;
  bad: boolean;
}) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-1">
      <span className="text-slate-300">{label}</span>
      <span
        className={
          bad ? "text-red-400 font-bold" : "text-emerald-400 font-bold"
        }
      >
        {delta}
      </span>
    </div>
  );
}

function MetricBox({
  label,
  val,
  delta,
  bad,
}: {
  label: string;
  val: string;
  delta: string;
  bad: boolean;
}) {
  return (
    <div className="rounded-lg bg-navy-950 p-3 border border-white/10 text-center">
      <p className="font-display text-[8px] text-slate-400">{label}</p>
      <p className="font-display text-sm font-bold text-slate-100">{val}</p>
      <p
        className={`font-mono text-[10px] ${bad ? "text-red-400" : "text-emerald-400"}`}
      >
        {delta}
      </p>
    </div>
  );
}
