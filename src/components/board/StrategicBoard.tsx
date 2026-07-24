import { useState, useMemo } from "react";
import { useGame } from "@/data/store";
import { motion } from "framer-motion";
import {
  MapPin,
  Search,
  RotateCcw,
  Play,
  Sparkles,
  Paperclip,
  Eye,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";
import type { GameEvent } from "@/data/types";
import { ScenarioSequenceModal } from "./ScenarioSequenceModal";

const CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "climate", label: "CLIMATE" },
  { id: "financial", label: "FINANCIAL" },
  { id: "tech", label: "TECH" },
  { id: "regulatory", label: "REGULATORY" },
];

export function StrategicBoard() {
  const events = useGame((s) => s.events);
  const bank = useGame((s) => s.bank);
  const mood = useGame((s) => s.mood());

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [droppedIds, setDroppedIds] = useState<string[]>(["forest-fire-ca"]);
  const [activeModalEvents, setActiveModalEvents] = useState<
    GameEvent[] | null
  >(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Filtered sidebar catalog
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesTab = activeTab === "all" || e.category === activeTab;
      const matchesSearch = e.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [events, activeTab, search]);

  const droppedEvents = events.filter((e) => droppedIds.includes(e.id));

  // Compute aggregated impacts for single merged whiteboard card
  const aggregatedImpactSummary = useMemo(() => {
    if (droppedEvents.length === 0) return null;

    const totalCreditLoss = droppedEvents.reduce((acc, ev) => {
      const val = parseFloat(ev.creditImpact.replace(/[^0-9.]/g, "")) || 0;
      return acc + val;
    }, 0);

    const mergedImpacts = Array.from(
      new Set(droppedEvents.flatMap((e) => e.impacts || [])),
    );
    const mergedIndustries = Array.from(
      new Set(droppedEvents.flatMap((e) => e.industries || [])),
    );

    return {
      title:
        droppedEvents.length === 1
          ? droppedEvents[0].title
          : `COMPOUND RISK DECK (${droppedEvents.length} SCENARIOS)`,
      headline:
        droppedEvents.length === 1
          ? droppedEvents[0].headline
          : `${droppedEvents.length} OVERLAPPING SYSTEMIC HAZARDS DETECTED`,
      totalCreditLoss:
        totalCreditLoss > 0 ? `-€${totalCreditLoss.toFixed(0)}M` : "-€750M",
      impacts: mergedImpacts.slice(0, 4),
      industries: mergedIndustries,
    };
  }, [droppedEvents]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const id = e.dataTransfer.getData("text/plain");
    if (id && !droppedIds.includes(id)) {
      setDroppedIds((prev) => [...prev, id]);
    }
  };

  const runSimulation = () => {
    if (droppedEvents.length > 0) {
      setActiveModalEvents(droppedEvents);
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden p-2 md:p-4 flex flex-col md:flex-row gap-4 bg-[#080b14] text-slate-100 font-sans">
      {/* SIDEBAR SCENARIOS CATALOG */}
      <div className="w-full md:w-72 shrink-0 flex flex-col gap-2 glass rounded-2xl p-3 overflow-hidden max-h-[88vh]">
        <div className="flex items-center justify-between border-b border-gold-500/15 pb-2">
          <p className="font-display text-xs tracking-widest text-gold-300">
            EXPLORE SCENARIOS
          </p>
          <span className="font-mono text-[10px] text-slate-400">
            {events.length} Catalog
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search size={14} className="absolute left-3 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scenarios..."
            className="w-full rounded-xl border border-slate-700 bg-navy-950/60 py-1.5 pl-9 pr-3 font-sans text-xs text-slate-200 outline-none focus:border-gold-400/50"
          />
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`rounded-lg px-2 py-0.5 font-display text-[9px] tracking-wider transition-all ${
                activeTab === cat.id
                  ? "bg-gold-400 text-navy-950 font-bold shadow-gold"
                  : "bg-white/5 text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filteredEvents.map((ev) => {
            const isDropped = droppedIds.includes(ev.id);
            return (
              <div
                key={ev.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", ev.id)}
                onClick={() => {
                  if (!isDropped) setDroppedIds((p) => [...p, ev.id]);
                }}
                className={`cursor-grab rounded-xl border p-2.5 transition-all ${
                  isDropped
                    ? "border-gold-400/60 bg-gold-500/15 text-gold-100 shadow-sm"
                    : "border-white/10 bg-navy-950/60 text-slate-300 hover:border-gold-400/30"
                }`}
              >
                <div className="flex items-center justify-between font-display text-xs font-bold">
                  <span>
                    {ev.icon} {ev.title}
                  </span>
                  <span className="text-[9px] uppercase text-gold-400 font-normal">
                    {ev.category}
                  </span>
                </div>
                <p className="mt-1 font-serif text-[10px] text-slate-400 line-clamp-2">
                  {ev.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CORKBOARD CANVAS CONTAINER */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Control Bar */}
        <div className="mb-2 flex items-center justify-between glass px-4 py-1.5 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs text-gold-300 font-bold">
              TURN 4 / 12
            </span>
            <span className="font-serif text-xs text-slate-300 italic hidden sm:inline">
              "Tomorrow the world might change and you're responsible."
            </span>
          </div>

          {droppedEvents.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDroppedIds([])}
                className="flex items-center gap-1 rounded px-2.5 py-1 font-display text-[10px] text-slate-400 hover:text-red-400"
              >
                <RotateCcw size={12} /> CLEAR
              </button>
              <button
                onClick={runSimulation}
                className="flex items-center gap-1.5 rounded bg-gradient-to-r from-gold-400 to-gold-600 px-4 py-1.5 font-display text-xs text-navy-950 font-bold shadow-gold hover:brightness-110"
              >
                <Play size={12} /> RUN SIMULATION ({droppedEvents.length})
              </button>
            </div>
          )}
        </div>

        {/* RESTORED INITIAL DARK CORKBOARD CANVAS */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`cork relative flex-1 rounded-2xl border-[10px] border-[#3a2413] shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden select-none transition-all ${
            isDragOver ? "ring-4 ring-gold-400" : ""
          } ${mood === "crisis" ? "animate-crisisPulse" : ""}`}
        >
          {/* RED STRATEGIC CONNECTING STRINGS (SVG) */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
              </marker>
            </defs>

            {/* Red string network connecting prominent scenario card to risk nodes */}
            <path
              d="M 520 280 L 680 180"
              stroke="#dc2626"
              strokeWidth="2"
              strokeOpacity="0.85"
              markerEnd="url(#arrow)"
            />
            <path
              d="M 580 320 L 710 240"
              stroke="#dc2626"
              strokeWidth="2"
              strokeOpacity="0.85"
              markerEnd="url(#arrow)"
            />
            <path
              d="M 580 380 L 700 410"
              stroke="#dc2626"
              strokeWidth="2"
              strokeOpacity="0.85"
              markerEnd="url(#arrow)"
            />
            <path
              d="M 380 260 L 260 210"
              stroke="#dc2626"
              strokeWidth="1.5"
              strokeOpacity="0.6"
              strokeDasharray="4 2"
            />
          </svg>

          {/* BOARD TITLE */}
          <div className="absolute left-1/2 top-2 -translate-x-1/2 text-center">
            <h1 className="font-hand text-xl font-bold tracking-wider text-amber-100 uppercase border-b-2 border-amber-500/30 pb-0.5">
              ← Executive Strategic Overview →
            </h1>
          </div>

          {/* =========================================================================
             LEFT COLUMN (BANK HEALTH -> NET PROFIT/SHARE PRICE -> LOAN BOOK)
             ========================================================================= */}

          {/* 1. BANK HEALTH (TOP LEFT) */}
          <div className="absolute left-4 top-6 space-y-1">
            <p className="font-hand text-[11px] font-bold text-amber-200/90 border-b border-amber-500/30 pb-0.5 inline-block">
              BANK HEALTH
            </p>
            <div className="flex gap-2 pt-0.5">
              {/* CET1 Ratio */}
              <div className="w-20 p-2 bg-[#fde68a] shadow-md rounded-sm rotate-[-2deg] border border-amber-300 relative text-neutral-900">
                <Pin />
                <p className="font-hand text-[9px] text-neutral-800">
                  CET1 Ratio
                </p>
                <p className="font-hand text-base font-bold text-neutral-950">
                  {bank.cet1}%
                </p>
                <div className="flex items-center justify-between mt-1 text-[7px] font-hand text-neutral-700">
                  <span>TARGET 12.5%</span>
                  <CheckCircle2 size={10} className="text-emerald-700" />
                </div>
              </div>

              {/* LCR */}
              <div className="w-20 p-2 bg-[#bbf7d0] shadow-md rounded-sm rotate-[2deg] border border-emerald-300 relative text-neutral-900">
                <Pin />
                <p className="font-hand text-[9px] text-neutral-800">LCR</p>
                <p className="font-hand text-base font-bold text-neutral-950">
                  {bank.lcr}%
                </p>
                <div className="flex items-center justify-between mt-1 text-[7px] font-hand text-neutral-700">
                  <span>TARGET 110%</span>
                  <CheckCircle2 size={10} className="text-emerald-700" />
                </div>
              </div>

              {/* MREL */}
              <div className="w-20 p-2 bg-[#fde68a] shadow-md rounded-sm rotate-[-1deg] border border-amber-300 relative text-neutral-900">
                <Pin />
                <p className="font-hand text-[9px] text-neutral-800">MREL</p>
                <p className="font-hand text-sm font-bold text-neutral-950 uppercase">
                  {bank.mrel}
                </p>
                <div className="flex items-center justify-end mt-1">
                  <CheckCircle2 size={10} className="text-emerald-700" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. NET PROFIT & SHARE PRICE (CLEAR SPACING AT TOP-[180px]) */}
          <div className="absolute left-4 top-[180px] flex gap-3">
            <div className="w-32 p-2.5 bg-[#fbf8f0] shadow-md rounded-sm border border-neutral-300 rotate-[1deg] relative text-neutral-900">
              <Pin color="red" />
              <p className="font-hand text-[9px] font-bold text-neutral-700">
                NET PROFIT (YTD)
              </p>
              <p className="font-hand text-lg font-bold text-neutral-950">
                €4.2B
              </p>
              <p className="font-hand text-[8px] text-emerald-700 font-bold flex items-center gap-0.5 mt-0.5">
                +6.2% vs Q1 2027 <TrendingUp size={10} />
              </p>
            </div>

            <div className="w-32 p-2.5 bg-[#fbf8f0] shadow-md rounded-sm border border-neutral-300 rotate-[-1deg] relative text-neutral-900">
              <Pin color="red" />
              <p className="font-hand text-[9px] font-bold text-neutral-700">
                SHARE PRICE
              </p>
              <p className="font-hand text-lg font-bold text-neutral-950">
                €102.45
              </p>
              <p className="font-hand text-[8px] text-emerald-700 font-bold flex items-center gap-0.5 mt-0.5">
                +1.85% Today <TrendingUp size={10} />
              </p>
            </div>
          </div>

          {/* 3. LOAN BOOK COMPOSITION (LOWER MID-LEFT - DARK CARD AT TOP-[310px]) */}
          <div className="absolute left-4 top-[310px] w-[270px] p-3 bg-[#111625] text-slate-100 shadow-xl rounded-md border border-slate-700 rotate-[-1deg] relative">
            <p className="font-display text-[10px] font-bold tracking-widest text-gold-300 border-b border-slate-700 pb-1 mb-2 uppercase">
              LOAN BOOK COMPOSITION
            </p>

            <div className="flex items-center gap-3">
              {/* Donut Chart with Center Total */}
              <div className="relative grid h-20 w-20 place-items-center shrink-0">
                <svg className="h-20 w-20 -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="6"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="6"
                    strokeDasharray="42 100"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="6"
                    strokeDasharray="25 100"
                    strokeDashoffset="-42"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="6"
                    strokeDasharray="15 100"
                    strokeDashoffset="-67"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="6"
                    strokeDasharray="10 100"
                    strokeDashoffset="-82"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="6"
                    strokeDasharray="5 100"
                    strokeDashoffset="-92"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="6"
                    strokeDasharray="3 100"
                    strokeDashoffset="-97"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
                  <span className="font-display text-[10px] font-extrabold text-gold-200">
                    €780B
                  </span>
                  <span className="font-display text-[7px] tracking-widest text-slate-400 uppercase">
                    TOTAL
                  </span>
                </div>
              </div>

              {/* Legend Grid */}
              <div className="space-y-0.5 font-sans text-[9px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 bg-blue-500 rounded-xs" /> Corporate
                  42%
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 bg-red-500 rounded-xs" /> Retail 25%
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 bg-emerald-500 rounded-xs" />{" "}
                  Mortgage 15%
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 bg-amber-500 rounded-xs" /> CRE 10%
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 bg-purple-400 rounded-xs" /> Energy
                  5%
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 bg-cyan-400 rounded-xs" /> Technology
                  3%
                </div>
              </div>
            </div>
          </div>

          {/* 4. ESG & CUSTOMER CONFIDENCE STICKIES (BOTTOM LEFT) */}
          <div className="absolute left-4 bottom-3 flex items-center gap-3 text-neutral-900">
            <div className="w-24 p-2 bg-[#dcfce7] shadow-md rounded-sm rotate-[-2deg] border border-emerald-300">
              <Pin />
              <p className="font-hand text-[9px] text-neutral-800 font-bold">
                ESG RATING
              </p>
              <p className="font-hand text-xl font-bold text-emerald-800">
                {bank.esgRating}
              </p>
            </div>

            <div className="w-28 p-2 bg-[#dbeafe] shadow-md rounded-sm rotate-[2deg] border border-blue-300">
              <Pin />
              <p className="font-hand text-[9px] text-neutral-800 font-bold">
                CUSTOMER CONFIDENCE
              </p>
              <p className="font-hand text-base font-bold text-blue-900">
                {bank.customerConfidence}% 🙂
              </p>
            </div>
          </div>

          {/* =========================================================================
             PROMINENT CENTER SCENARIO CARD (PROMINENT & CENTERED)
             ========================================================================= */}

          <div className="absolute left-[50%] top-[48%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20">
            {aggregatedImpactSummary ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={runSimulation}
                className="w-80 bg-[#fdfbf7] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded border-2 border-red-800/40 rotate-[-1deg] cursor-pointer hover:rotate-0 hover:scale-105 transition-all relative text-neutral-900"
              >
                <Pin />
                <Paperclip
                  className="absolute -top-3 right-3 text-neutral-600 rotate-45"
                  size={20}
                />

                <div className="border-b border-neutral-300 pb-1 mb-2">
                  <p className="font-hand text-[10px] font-bold tracking-widest text-neutral-600">
                    FINANCIAL TIMES WIRE ({droppedEvents.length} ACTIVE)
                  </p>
                  <p className="font-serif text-base font-extrabold text-neutral-900 leading-tight">
                    {aggregatedImpactSummary.title}
                  </p>
                </div>

                {/* Newspaper Photo Banner */}
                <div className="h-24 w-full bg-gradient-to-br from-amber-800 via-red-900 to-neutral-950 rounded-sm p-3 flex flex-col justify-end text-white my-2 shadow-inner">
                  <p className="font-serif text-xs font-bold leading-tight drop-shadow">
                    {aggregatedImpactSummary.headline}
                  </p>
                </div>

                <div className="mt-2 space-y-1 font-serif text-xs text-neutral-800">
                  <div className="flex justify-between border-b border-neutral-300 pb-1">
                    <span>Aggregated Credit Impact:</span>
                    <strong className="text-red-700 font-bold">
                      {aggregatedImpactSummary.totalCreditLoss}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-300 pb-1">
                    <span>Key Sectors:</span>
                    <strong className="text-neutral-900">
                      {aggregatedImpactSummary.industries.join(", ") ||
                        "Banking"}
                    </strong>
                  </div>
                </div>

                <button className="mt-3 w-full bg-red-800 text-white font-hand text-sm py-2 rounded shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5 font-bold">
                  <Eye size={14} /> LAUNCH MEDIA REACTION ▸
                </button>
              </motion.div>
            ) : (
              <div className="w-72 p-4 bg-[#fdfbf7]/90 rounded border-2 border-dashed border-neutral-400 text-center shadow-lg text-neutral-800">
                <p className="font-hand text-xs text-neutral-700">
                  Drag scenario cards from the left sidebar onto this board to
                  aggregate risk.
                </p>
              </div>
            )}
          </div>

          {/* POLAROID PHOTO SNAPSHOT (CENTER TOP-RIGHT) */}
          <div className="absolute left-[67%] top-12 w-36 bg-white p-2 pb-5 shadow-xl rotate-[3deg] border border-neutral-300 text-neutral-900">
            <Pin />
            <div className="h-24 w-full bg-gradient-to-br from-orange-600 via-amber-700 to-neutral-900 rounded-sm flex items-center justify-center">
              <span className="text-amber-200 text-2xl font-bold">🔥</span>
            </div>
            <p className="font-hand text-[10px] text-center font-bold text-neutral-800 mt-1">
              California Wildfires
            </p>
          </div>

          {/* Sticky note overlapping Polaroid */}
          <div className="absolute left-[70%] top-[135px] w-24 p-2 bg-[#fde68a] shadow-lg rounded-sm rotate-[-4deg] border border-amber-300 text-neutral-900">
            <Pin />
            <p className="font-hand text-[10px] font-bold text-red-800 leading-tight">
              Review Energy Exposure!
            </p>
          </div>

          {/* Bottom Center Stickies */}
          <div className="absolute left-[38%] bottom-3 flex items-center gap-3 text-neutral-900">
            {/* Upcoming Board Meeting */}
            <div className="w-28 p-2 bg-[#fde68a] shadow-md rounded-sm rotate-[2deg] border border-amber-300">
              <Pin />
              <p className="font-hand text-[9px] font-bold text-neutral-800 leading-tight">
                UPCOMING BOARD MEETING
              </p>
              <p className="font-hand text-xs font-bold text-red-800 mt-0.5">
                May 15, 2027
              </p>
            </div>

            {/* MREL Review Sticky */}
            <div className="w-28 p-2 bg-[#fde68a] shadow-md rounded-sm rotate-[3deg] border border-amber-300">
              <Pin />
              <p className="font-hand text-[9px] font-bold text-neutral-800">
                MREL REVIEW 2027
              </p>
              <p className="font-hand text-[10px] text-emerald-800 font-bold mt-0.5">
                On Track ✔
              </p>
            </div>
          </div>

          {/* =========================================================================
             RIGHT COLUMN (TOP PRIORITIES, KEY RISKS, ATHENA MEMO)
             ========================================================================= */}

          {/* 8. TOP PRIORITIES (TOP RIGHT) */}
          <div className="absolute right-4 top-8 w-44 p-3 bg-[#fdfbf7] shadow-md rounded border border-neutral-300 rotate-[1deg] text-neutral-900">
            <Pin color="blue" />
            <p className="font-hand text-xs font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-1">
              TOP PRIORITIES
            </p>
            <ol className="font-hand text-[11px] text-neutral-800 space-y-0.5 list-decimal pl-4">
              <li>Capital Strength</li>
              <li>Liquidity</li>
              <li>Credit Quality</li>
              <li>ESG Leadership</li>
              <li>Client Trust</li>
            </ol>
          </div>

          {/* 9. KEY RISKS (MIDDLE RIGHT) */}
          <div className="absolute right-4 top-[170px] w-48 p-3 bg-white shadow-md rounded border border-neutral-300 rotate-[-1deg] text-neutral-900">
            <Pin color="blue" />
            <p className="font-hand text-xs font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-1.5">
              KEY RISKS
            </p>
            <div className="space-y-1 font-hand text-[11px] text-neutral-800">
              <div className="flex justify-between items-center">
                <span>1. Climate Risk</span>
                <span className="text-[10px]">🔴 🔴 🔴</span>
              </div>
              <div className="flex justify-between items-center">
                <span>2. Credit Risk</span>
                <span className="text-[10px]">🔴 🔴 🟡</span>
              </div>
              <div className="flex justify-between items-center">
                <span>3. Market Risk</span>
                <span className="text-[10px]">🔴 🟡 🟢</span>
              </div>
              <div className="flex justify-between items-center">
                <span>4. Liquidity Risk</span>
                <span className="text-[10px]">🔴 🟢 🟢</span>
              </div>
              <div className="flex justify-between items-center">
                <span>5. Cyber Risk</span>
                <span className="text-[10px]">🔴 🟢 🟢</span>
              </div>
            </div>
          </div>

          {/* 10. NOTES FROM ATHENA MEMO (BOTTOM RIGHT) */}
          <div className="absolute right-4 bottom-3 w-56 p-3 bg-[#fde68a] shadow-xl rounded-sm rotate-[1deg] border border-amber-300 text-neutral-900">
            <Pin />
            <div className="flex items-center gap-1.5 text-amber-900 mb-1 border-b border-amber-400 pb-1">
              <Sparkles size={12} />
              <span className="font-hand text-xs font-bold">
                Notes from Athena
              </span>
            </div>
            <p className="font-pen text-xs text-neutral-900 leading-snug">
              "Climate exposure increasing. Review CA CRE portfolio
              immediately."
            </p>
            <p className="font-hand text-right text-[10px] italic text-neutral-700 mt-2">
              – Athena
            </p>
          </div>
        </div>
      </div>

      {/* 5-STAGE MEDIA REACTION MODAL OVERLAY */}
      {activeModalEvents && (
        <ScenarioSequenceModal
          events={activeModalEvents}
          onClose={() => setActiveModalEvents(null)}
        />
      )}
    </div>
  );
}

function Pin({ color = "red" }: { color?: "red" | "blue" }) {
  return (
    <MapPin
      size={12}
      className={`absolute -top-2 left-1/2 -translate-x-1/2 ${
        color === "blue" ? "text-sky-600" : "text-red-600"
      } drop-shadow`}
      fill={color === "blue" ? "#0284c7" : "#dc2626"}
    />
  );
}
