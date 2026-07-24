import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  Repeat,
  MessageSquare,
  TrendingDown,
  TrendingUp,
  Tv,
  Newspaper,
  Smartphone,
  Activity,
  ArrowRight,
  Calendar,
  ShieldAlert,
  CheckCircle2,
  Coffee,
  Flame,
  User,
} from "lucide-react";
import { useGame } from "@/data/store";

export function ExecutiveCommandDesk() {
  const bank = useGame((s) => s.bank);
  const resolveDecision = useGame((s) => s.resolveDecision);
  const events = useGame((s) => s.events);

  const primaryEvent = events[0] || {
    title: "Forest Fire California",
    creditImpact: "€750M",
    plImpact: "-2.1%",
    horizon: "3-4 Quarters",
    options: [],
  };

  // Interactive Social Feed Likes
  const [likes, setLikes] = useState<Record<string, number>>({
    investor: 1240,
    green: 904,
    market: 612,
    finance: 428,
  });
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const toggleLike = (key: string) => {
    setLiked((p) => ({ ...p, [key]: !p[key] }));
    setLikes((p) => ({ ...p, [key]: p[key] + (liked[key] ? -1 : 1) }));
  };

  // Active Strategy Action Feedback
  const [actionApplied, setActionApplied] = useState<string | null>(null);

  const handleAction = (label: string, actionId: string) => {
    setActionApplied(label);
    const matchedOpt = primaryEvent.options.find((o) => o.id === actionId);
    if (matchedOpt) {
      resolveDecision(primaryEvent, matchedOpt);
    }
  };

  return (
    <div className="relative h-full w-full overflow-y-auto bg-[#070b14] p-4 md:p-6 text-slate-100 font-sans">
      {/* DESK ENVIRONMENT HEADER */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-gold-500/20 pb-3">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-600 font-display text-navy-950 font-bold shadow-gold">
            R
          </div>
          <div>
            <h1 className="font-display text-base tracking-[0.2em] text-gradient-gold">
              EXECUTIVE CRISIS COMMAND CENTER
            </h1>
            <p className="font-serif text-xs text-slate-400 italic">
              CEO War Room Table · Live System Analysis & Strategy Execution
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-red-500/30 bg-red-950/60 px-3 py-1 font-display text-[10px] tracking-widest text-red-300 animate-pulse flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            CRISIS MODE ACTIVE
          </div>
        </div>
      </div>

      {/* MASTER DESK GRID: 5 MODULE LAYOUT */}
      <div className="space-y-5">
        {/* TOP ROW: MODULES 1, 2, 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* 1. NEWSPAPER ARRIVES (Col 4) */}
          <div className="lg:col-span-4 rounded-2xl border border-[#3d2e1e] bg-gradient-to-b from-[#18120c] to-[#0c0906] p-4 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#3d2e1e] pb-2 mb-3">
              <span className="font-display text-[10px] tracking-widest text-amber-400/80 flex items-center gap-1.5">
                <Newspaper size={14} /> 1. NEWSPAPER ARRIVES
              </span>
              <span className="font-serif text-[10px] text-amber-200/50 italic">
                Scenario: FOREST FIRE - CALIFORNIA
              </span>
            </div>

            {/* Broadsheet Paper Sheet */}
            <div className="paper rounded-sm border-[5px] border-[#221a12] p-4 shadow-2xl relative text-[#111]">
              <p className="font-serif text-[8px] tracking-[0.4em] text-[#554b3a] font-bold text-center">
                FINANCIAL TIMES
              </p>
              <p className="font-serif text-[7px] text-[#666] text-center mb-1">
                APRIL 27, 2027
              </p>
              <h2 className="font-serif text-lg font-extrabold uppercase leading-tight text-center border-y border-[#332a1f]/30 py-1">
                WILDFIRES CAUSE BILLIONS IN DAMAGE
              </h2>
              <p className="font-serif text-[10px] italic text-[#443c31] text-center mt-1">
                European banks exposed through commercial real estate portfolios
              </p>

              {/* Floating Impact Summary Overlay Card */}
              <div className="mt-3 rounded border border-[#221a12]/30 bg-[#fbf6ea] p-2.5 shadow-md">
                <p className="font-display text-[8px] tracking-widest text-[#554b3a] font-bold border-b border-[#221a12]/20 pb-1 mb-1.5">
                  IMPACT SUMMARY
                </p>
                <div className="space-y-1 font-serif text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-[#665d50]">
                      Estimated Credit Loss:
                    </span>
                    <span className="font-bold text-red-700">€750M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#665d50]">Share Price Impact:</span>
                    <span className="font-bold text-red-700">-6.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#665d50]">CRE Stress:</span>
                    <span className="font-bold text-amber-800">Rising</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#665d50]">Insurance Claims:</span>
                    <span className="font-bold text-red-700">Surge</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desk Nameplate & Actions */}
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#3d2e1e]/60">
              <div className="rounded border border-[#554231] bg-[#1d160e] px-3 py-1 font-display text-[9px] tracking-widest text-amber-200/90 shadow-inner flex items-center gap-1.5">
                <User size={12} className="text-amber-400" /> ALEX MORGAN · CEO
              </div>

              <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-700 px-3 py-1.5 font-display text-[10px] font-bold text-navy-950 shadow-md hover:brightness-110">
                NEXT <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* 2. TV BREAKING NEWS (Col 5) */}
          <div className="lg:col-span-5 rounded-2xl border-4 border-slate-800 bg-black p-3.5 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="font-display text-[10px] tracking-widest text-red-400 flex items-center gap-1.5">
                  <Tv size={14} /> 2. TV BREAKING NEWS
                </span>
                <span className="font-serif text-[10px] text-slate-400 italic">
                  The world reacts...
                </span>
              </div>

              {/* CNBC Live Broadcast Banner */}
              <div className="rounded bg-red-950 border border-red-600/50 p-2 mb-3 text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="rounded bg-red-600 px-1.5 py-0.5 font-display text-[9px] font-bold animate-pulse">
                    LIVE
                  </span>
                  <span className="font-mono text-[9px] font-bold text-gold-300">
                    CNBC
                  </span>
                </div>
                <h3 className="font-display text-xs md:text-sm font-extrabold tracking-wide text-red-100 uppercase">
                  CALIFORNIA WILDFIRES TRIGGER INSURANCE SHOCK
                </h3>
                <p className="font-serif text-[10px] text-red-200/80 italic mt-0.5">
                  Markets fall as losses mount across key sectors
                </p>
              </div>

              {/* Market Impact Grid */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                <Ticker symbol="S&P 500" val="-2.10%" down />
                <Ticker symbol="EURO STOXX 50" val="-1.85%" down />
                <Ticker symbol="BANK INDEX" val="-1.62%" down />
                <Ticker symbol="OIL PRICE" val="+4.05%" down={false} />
              </div>

              <div className="text-[9px] font-serif text-slate-400 mb-2 flex items-center justify-between border-t border-slate-800 pt-1">
                <span>
                  • European banks face exposure through CRE portfolios
                </span>
                <span>• Analysts warn credit costs to rise</span>
              </div>
            </div>

            {/* Analysts React */}
            <div>
              <p className="font-display text-[9px] tracking-widest text-slate-400 mb-1.5">
                ANALYSTS REACT
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Analyst
                  firm="J.P. Global Research"
                  text="Climate exposure remains underestimated."
                  time="2m ago"
                />
                <Analyst
                  firm="Morgan Stanley"
                  text="Expect pressure on earnings for banks in Q2."
                  time="3m ago"
                />
                <Analyst
                  firm="Goldman Sachs"
                  text="Monitor CRE and insurance-linked losses."
                  time="4m ago"
                />
                <Analyst
                  firm="DB Research"
                  text="Impact manageable if response is fast."
                  time="5m ago"
                />
              </div>
            </div>
          </div>

          {/* 3. SOCIAL FEED ON MOBILE (Col 3) */}
          <div className="lg:col-span-3 rounded-2xl border border-slate-700 bg-slate-950 p-3.5 shadow-2xl relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="font-display text-[10px] tracking-widest text-sky-400 flex items-center gap-1.5">
                  <Smartphone size={14} /> 3. SOCIAL FEED ON MOBILE
                </span>
              </div>

              {/* Smartphone Inner Screen */}
              <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 p-3 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="font-display text-[10px] font-bold text-gold-300">
                    🌐 WorldWire
                  </span>
                  <div className="flex gap-2 text-[8px] font-mono text-slate-400">
                    <span className="text-white font-bold">Trending</span>
                    <span>Following</span>
                    <span>For You</span>
                  </div>
                </div>

                <div className="flex gap-1 text-[8px] text-sky-400 font-mono">
                  <span>#Wildfires</span> <span>#ClimateRisk</span>{" "}
                  <span>#Banking</span> <span>#Econ</span>
                </div>

                {/* Viral Tweet Feed */}
                <div className="space-y-2 text-[10px] max-h-48 overflow-y-auto pr-1">
                  {[
                    {
                      key: "investor",
                      user: "InvestorDaily",
                      handle: "@InvestorDaily",
                      time: "10m",
                      text: "Concern growing around European banks exposed to US commercial real estate. #Wildfires #Risk #Banking",
                    },
                    {
                      key: "green",
                      user: "GreenFuture",
                      handle: "@GreenFuture",
                      time: "18m",
                      text: "Banks must do more to support climate resilience. Action speaks louder. #ClimateAction",
                    },
                    {
                      key: "market",
                      user: "MarketWatcher",
                      handle: "@MarketWatcher",
                      time: "34m",
                      text: "Credit costs expected to rise. How will banks respond? #Markets",
                    },
                    {
                      key: "finance",
                      user: "FinanceFocus",
                      handle: "@FinanceFocus",
                      time: "42m",
                      text: "Insurance sector under heavy pressure after wildfire losses.",
                    },
                  ].map((tw) => (
                    <div
                      key={tw.key}
                      className="rounded-lg bg-slate-950/80 p-2 border border-slate-800/80 space-y-1"
                    >
                      <div className="flex items-center justify-between text-[9px]">
                        <span className="font-bold text-slate-200">
                          {tw.user}
                        </span>
                        <span className="text-slate-500">{tw.time}</span>
                      </div>
                      <p className="text-slate-300 leading-tight">{tw.text}</p>
                      <div className="flex items-center gap-3 text-slate-500 pt-0.5 text-[9px]">
                        <button
                          onClick={() => toggleLike(tw.key)}
                          className={`flex items-center gap-1 ${liked[tw.key] ? "text-red-400" : ""}`}
                        >
                          <Heart
                            size={10}
                            fill={liked[tw.key] ? "#f87171" : "none"}
                          />{" "}
                          {likes[tw.key]}
                        </button>
                        <span className="flex items-center gap-1">
                          <Repeat size={10} /> 342
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare size={10} /> 128
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: MODULES 4 & 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* 4. SENTIMENT ANALYZER (Col 5) */}
          <div className="lg:col-span-5 rounded-2xl border border-gold-400/20 bg-navy-950/90 p-4 md:p-5 shadow-2xl flex flex-col justify-between backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between border-b border-gold-500/15 pb-2 mb-3">
                <span className="font-display text-xs tracking-widest text-gold-300 flex items-center gap-1.5">
                  <Activity size={15} /> 4. SENTIMENT ANALYZER
                </span>
                <span className="font-serif text-[10px] text-slate-400 italic">
                  Athena analyzes public mood in real-time.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Gauges Column */}
                <div className="space-y-3">
                  <p className="font-display text-[9px] tracking-widest text-slate-400 border-b border-white/5 pb-1">
                    PUBLIC SENTIMENT OVERVIEW
                  </p>
                  <GaugeRing
                    label="INVESTOR CONFIDENCE"
                    val={42}
                    status="LOW"
                    color="red"
                  />
                  <GaugeRing
                    label="CUSTOMER CONFIDENCE"
                    val={58}
                    status="MODERATE"
                    color="gold"
                  />
                  <GaugeRing
                    label="EMPLOYEE MORALE"
                    val={74}
                    status="GOOD"
                    color="green"
                  />
                  <GaugeRing
                    label="PUBLIC TRUST"
                    val={38}
                    status="LOW"
                    color="red"
                  />
                </div>

                {/* Drivers Column */}
                <div className="space-y-3">
                  <p className="font-display text-[9px] tracking-widest text-slate-400 border-b border-white/5 pb-1">
                    SENTIMENT DRIVERS
                  </p>
                  <div className="space-y-2 text-[11px] font-serif">
                    <DriverRow
                      label="Wildfire Exposure Concerns"
                      delta="-28%"
                      bad
                    />
                    <DriverRow label="CRE Portfolio Risks" delta="-22%" bad />
                    <DriverRow label="Management Response" delta="-5%" bad />
                    <DriverRow label="Transparency" delta="+8%" bad={false} />
                    <DriverRow label="ESG Actions" delta="+12%" bad={false} />
                  </div>

                  <div className="mt-4 rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 text-center">
                    <p className="font-display text-[9px] tracking-widest text-amber-200">
                      OVERALL SENTIMENT SCORE
                    </p>
                    <p className="font-display text-2xl font-bold text-amber-300">
                      53{" "}
                      <span className="text-xs font-normal text-amber-200">
                        /100
                      </span>
                    </p>
                    <p className="font-display text-[9px] tracking-widest text-amber-400 font-bold">
                      MODERATE RISK
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="font-serif text-[9px] italic text-slate-500 mt-3 pt-2 border-t border-white/5">
              Monitoring 18.4K conversations across news, social and forums ·
              Updated just now
            </p>
          </div>

          {/* 5. ATHENA MEMO & IMPACT ON BANK (Col 7) */}
          <div className="lg:col-span-7 rounded-2xl border border-gold-400/30 bg-navy-950/95 p-4 md:p-5 shadow-2xl flex flex-col justify-between backdrop-blur-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-gold-500/20 pb-2 mb-3">
                <span className="font-display text-xs tracking-widest text-gold-300 flex items-center gap-1.5">
                  <Sparkles size={15} /> 5. ATHENA MEMO & IMPACT ON BANK
                </span>
                <span className="font-serif text-[10px] text-slate-400 italic">
                  AI advisor provides guidance and bank metrics adjust.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Moleskine Spiral Notepad */}
                <div className="md:col-span-5 paper rounded-lg p-4 shadow-xl border border-neutral-300 flex flex-col justify-between relative">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display text-[9px] font-bold tracking-widest text-gold-700 flex items-center gap-1">
                        <Sparkles size={12} /> Athena AI ADVISOR
                      </span>
                      <span className="font-serif text-[9px] text-neutral-500 italic">
                        April 27, 2027
                      </span>
                    </div>
                    <p className="font-serif text-xs font-bold text-[#222] mb-1">
                      To: CEO
                    </p>
                    <p className="font-pen text-sm text-[#111] leading-relaxed italic">
                      "Public concern is increasing. Deposit behavior remains
                      stable. We should consider a targeted communication
                      campaign and review CRE exposures."
                    </p>
                  </div>
                  <p className="font-serif text-right text-xs italic text-[#555] mt-3">
                    – Athena
                  </p>
                </div>

                {/* Bank Impact Summary 8-Metric Grid */}
                <div className="md:col-span-7 space-y-3">
                  <p className="font-display text-[9px] tracking-widest text-slate-400 border-b border-white/5 pb-1">
                    BANK IMPACT SUMMARY
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <MetricCard
                      label="SHARE PRICE"
                      val="€102.45"
                      delta="-6.2%"
                      bad
                    />
                    <MetricCard
                      label="NET PROFIT (YTD)"
                      val="€4.2B"
                      delta="-2.1%"
                      bad
                    />
                    <MetricCard
                      label="CET1 RATIO"
                      val="14.3%"
                      delta="-0.4%"
                      bad
                    />
                    <MetricCard label="LCR" val="152%" delta="-12%" bad />
                    <MetricCard
                      label="CREDIT RISK INDEX"
                      val="68 /100"
                      delta="+15"
                      bad
                    />
                    <MetricCard
                      label="MARKET RISK INDEX"
                      val="54 /100"
                      delta="+9"
                      bad
                    />
                    <MetricCard
                      label="REPUTATION SCORE"
                      val="62 /100"
                      delta="-8"
                      bad
                    />
                    <MetricCard
                      label="ESG SCORE"
                      val="72 /100"
                      delta="+3"
                      bad={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy Actions & Board Meeting Footer */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex-1">
                <p className="font-display text-[9px] tracking-widest text-slate-400 mb-1.5">
                  RECOMMENDED ACTIONS
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      handleAction("Review CRE Portfolio", "review-cre")
                    }
                    className="rounded-lg border border-gold-400/40 bg-navy-900 px-3 py-1.5 text-left transition hover:bg-gold-400/10 hover:border-gold-300"
                  >
                    <p className="font-display text-[9px] text-gold-200 font-bold">
                      Review CRE Portfolio
                    </p>
                    <p className="font-serif text-[8px] text-slate-400">
                      High exposure in California ➔ TAKE ACTION
                    </p>
                  </button>

                  <button
                    onClick={() =>
                      handleAction("Client Communication", "launch-comms")
                    }
                    className="rounded-lg border border-gold-400/40 bg-navy-900 px-3 py-1.5 text-left transition hover:bg-gold-400/10 hover:border-gold-300"
                  >
                    <p className="font-display text-[9px] text-gold-200 font-bold">
                      Client Communication
                    </p>
                    <p className="font-serif text-[8px] text-slate-400">
                      Reassure stakeholders ➔ LAUNCH CAMPAIGN
                    </p>
                  </button>

                  <button
                    onClick={() =>
                      handleAction("Increase Provisions", "increase-provisions")
                    }
                    className="rounded-lg border border-gold-400/40 bg-navy-900 px-3 py-1.5 text-left transition hover:bg-gold-400/10 hover:border-gold-300"
                  >
                    <p className="font-display text-[9px] text-gold-200 font-bold">
                      Increase Provisions
                    </p>
                    <p className="font-serif text-[8px] text-slate-400">
                      Prepare for credit losses ➔ EXECUTE NOW
                    </p>
                  </button>
                </div>
              </div>

              {/* Next Board Meeting Badge */}
              <div className="rounded-xl border border-gold-400/20 bg-gold-400/5 px-4 py-2 text-right">
                <p className="font-display text-[8px] tracking-widest text-gold-300 flex items-center justify-end gap-1">
                  <Calendar size={10} /> NEXT BOARD MEETING
                </p>
                <p className="font-display text-xs font-bold text-slate-100 mt-0.5">
                  FRIDAY, MAY 02, 2027
                </p>
                <p className="font-mono text-[9px] text-slate-400">09:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   HELPER SUB-COMPONENTS
   ========================================================================= */

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
    <div className="rounded bg-slate-900 p-1.5 text-center border border-white/5">
      <p className="font-display text-[8px] text-slate-400">{symbol}</p>
      <p
        className={`font-mono text-xs font-bold ${down ? "text-red-400" : "text-emerald-400"}`}
      >
        {val}
      </p>
    </div>
  );
}

function Analyst({
  firm,
  text,
  time,
}: {
  firm: string;
  text: string;
  time: string;
}) {
  return (
    <div className="rounded bg-slate-900/90 p-2 border border-white/5 text-[9px]">
      <div className="flex justify-between font-bold text-gold-300">
        <span>{firm}</span>
        <span className="text-[8px] text-slate-500 font-mono">{time}</span>
      </div>
      <p className="text-slate-300 italic mt-0.5 line-clamp-2">{text}</p>
    </div>
  );
}

function GaugeRing({
  label,
  val,
  status,
  color,
}: {
  label: string;
  val: number;
  status: string;
  color: "red" | "gold" | "green";
}) {
  const stroke =
    color === "red" ? "#f87171" : color === "gold" ? "#fbbf24" : "#34d399";
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-10 w-10 place-items-center">
        <svg className="h-10 w-10 -rotate-90">
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="#1e293b"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke={stroke}
            strokeWidth="4"
            fill="none"
            strokeDasharray={100}
            strokeDashoffset={100 - val}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute font-display text-[9px] font-bold text-slate-100">
          {val}%
        </span>
      </div>
      <div>
        <p className="font-display text-[8px] tracking-wider text-slate-400">
          {label}
        </p>
        <p
          className={`font-display text-[9px] font-bold ${color === "red" ? "text-red-400" : color === "gold" ? "text-amber-300" : "text-emerald-400"}`}
        >
          {val}% · {status}
        </p>
      </div>
    </div>
  );
}

function DriverRow({
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
        className={`font-mono font-bold ${bad ? "text-red-400" : "text-emerald-400"}`}
      >
        {delta}
      </span>
    </div>
  );
}

function MetricCard({
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
    <div className="rounded-lg bg-navy-900/80 p-2 border border-white/5 text-center">
      <p className="font-display text-[7.5px] tracking-wider text-slate-400 truncate">
        {label}
      </p>
      <p className="font-display text-xs font-bold text-slate-100">{val}</p>
      <p
        className={`font-mono text-[9px] font-bold ${bad ? "text-red-400" : "text-emerald-400"}`}
      >
        {delta}
      </p>
    </div>
  );
}
