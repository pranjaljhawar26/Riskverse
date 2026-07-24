import { useState, useMemo } from "react";
import { useGame } from "@/data/store";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Search,
  RotateCcw,
  Play,
  AlertCircle,
  Sparkles,
  Paperclip,
  FileText,
  Eye,
  Flame,
  ShieldAlert,
} from "lucide-react";
import type { GameEvent } from "@/data/types";
import { ScenarioSequenceModal } from "./ScenarioSequenceModal";

interface StickyData {
  id: string;
  label: string;
  value: string;
  color: string;
  x: number;
  y: number;
  rot: number;
}

const STICKIES: StickyData[] = [
  {
    id: "cet1",
    label: "CET1 Ratio",
    value: "14.3%",
    color: "#fde68a",
    x: 6,
    y: 10,
    rot: -4,
  },
  {
    id: "lcr",
    label: "LCR",
    value: "152%",
    color: "#bbf7d0",
    x: 20,
    y: 6,
    rot: 3,
  },
  {
    id: "mrel",
    label: "MREL",
    value: "ABOVE",
    color: "#fde68a",
    x: 35,
    y: 11,
    rot: -2,
  },
  {
    id: "conf",
    label: "Customer Confidence",
    value: "82%",
    color: "#fecaca",
    x: 74,
    y: 9,
    rot: 3,
  },
  {
    id: "share",
    label: "Share Price",
    value: "$102.45",
    color: "#e0e7ff",
    x: 6,
    y: 68,
    rot: 2,
  },
  {
    id: "esg",
    label: "ESG Score",
    value: "72/100",
    color: "#dcfce7",
    x: 80,
    y: 66,
    rot: -3,
  },
];

const CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "climate", label: "CLIMATE" },
  { id: "financial", label: "FINANCIAL" },
  { id: "tech", label: "TECH" },
  { id: "regulatory", label: "REGULATORY" },
];

export function StrategicBoard() {
  const events = useGame((s) => s.events);
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
    <div className="relative h-full w-full overflow-hidden p-3 md:p-6 flex flex-col md:flex-row gap-4">
      {/* SIDEBAR SCENARIOS CATALOG */}
      <div className="w-full md:w-80 shrink-0 flex flex-col gap-3 glass rounded-2xl p-4 overflow-hidden max-h-[88vh]">
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
            className="w-full rounded-xl border border-slate-700 bg-navy-950/60 py-2 pl-9 pr-3 font-sans text-xs text-slate-200 outline-none focus:border-gold-400/50"
          />
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`rounded-lg px-2 py-1 font-display text-[9px] tracking-wider transition-all ${
                activeTab === cat.id
                  ? "bg-gold-400 text-navy-950 font-bold"
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
                className={`cursor-grab rounded-xl border p-3 transition-all ${
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
                <p className="mt-1 font-serif text-[11px] text-slate-400 line-clamp-2">
                  {ev.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CORKBOARD / WHITEBOARD CANVAS */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Control Header */}
        <div className="mb-2 flex items-center justify-between glass px-4 py-2 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs text-gold-300 font-bold">
              TURN 4 / 12
            </span>
            <span className="font-serif text-xs text-slate-400 italic hidden sm:inline">
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

        {/* Corkboard Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`cork relative flex-1 rounded-2xl border-[10px] border-[#3a2413] shadow-2xl overflow-hidden transition-all ${
            isDragOver ? "ring-4 ring-gold-400" : ""
          } ${mood === "crisis" ? "animate-crisisPulse" : ""}`}
        >
          {/* Dynamic Red String Network (SVG) */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            {/* Strings from stickies to central watch out oval */}
            <line
              x1="12%"
              y1="18%"
              x2="48%"
              y2="52%"
              stroke="#dc2626"
              strokeWidth="2"
              strokeOpacity="0.75"
            />
            <line
              x1="26%"
              y1="14%"
              x2="48%"
              y2="52%"
              stroke="#dc2626"
              strokeWidth="2"
              strokeOpacity="0.75"
            />
            <line
              x1="48%"
              y1="52%"
              x2="78%"
              y2="16%"
              stroke="#dc2626"
              strokeWidth="1.5"
              strokeOpacity="0.6"
              strokeDasharray="4 2"
            />
            <line
              x1="48%"
              y1="52%"
              x2="22%"
              y2="72%"
              stroke="#dc2626"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
            <line
              x1="48%"
              y1="52%"
              x2="78%"
              y2="72%"
              stroke="#dc2626"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
          </svg>

          {/* Sticky Notes Pinned Across Corkboard */}
          {STICKIES.map((s) => (
            <div
              key={s.id}
              className="absolute w-28 p-2.5 text-left shadow-note select-none transition-transform hover:scale-105"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                background: s.color,
                transform: `rotate(${s.rot}deg)`,
              }}
            >
              <Pin />
              <p className="font-hand text-[11px] font-bold text-neutral-700">
                {s.label}
              </p>
              <p className="font-hand text-lg font-bold text-neutral-900">
                {s.value}
              </p>
            </div>
          ))}

          {/* ATHENA TACTICAL BRIEFING MEMO (PINNED PAPER PAGE) */}
          <div className="absolute right-6 top-16 w-52 paper rounded p-3 shadow-2xl rotate-2 select-none border border-neutral-400">
            <Pin color="gold" />
            <div className="flex items-center gap-1.5 text-gold-700 mb-1 border-b border-neutral-300 pb-1">
              <Sparkles size={14} />
              <span className="font-display text-[9px] tracking-widest font-bold">
                ATHENA AI MEMO
              </span>
            </div>
            <p className="font-pen text-[12px] text-neutral-800 leading-snug">
              "Climate risk vectors interacting with CRE books. Review insurance
              counterparty exposure before board convene."
            </p>
          </div>

          {/* WATCH OUT Risk Stamp Circle Overlay */}
          {droppedEvents.length >= 1 && (
            <div className="absolute left-[48%] top-[52%] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
              <div className="h-32 w-60 rounded-full border-4 border-red-600/80 p-2 flex flex-col items-center justify-center rotate-[-5deg] bg-red-950/20 backdrop-blur-[1px] shadow-lg">
                <span className="font-hand text-xl font-bold text-red-500 tracking-widest uppercase">
                  WATCH OUT!
                </span>
                <span className="font-pen text-xs text-red-300 font-semibold text-center leading-tight">
                  Energy Exposure / CRE Loan Book Stress
                </span>
              </div>
            </div>
          )}

          {/* POLAROID EVIDENCE PHOTO SNAPSHOT */}
          <div className="absolute left-8 bottom-12 w-44 bg-white p-2 pb-6 shadow-2xl rotate-[-4deg] border border-neutral-300 select-none hidden sm:block">
            <Pin />
            <div className="h-28 w-full bg-gradient-to-br from-amber-600 via-orange-700 to-neutral-900 rounded-sm flex items-center justify-center">
              <Flame
                size={32}
                className="text-amber-300 opacity-80 animate-pulse"
              />
            </div>
            <p className="mt-2 text-center font-hand text-xs text-neutral-800 font-bold">
              CA Wildfire Frontline '26
            </p>
          </div>

          {/* DROPPED SCENARIO CARDS (NEWSPAPER CLIPPINGS ON CORKBOARD) */}
          <div className="absolute inset-0 p-8 flex flex-wrap gap-6 items-center justify-center pointer-events-none">
            {droppedEvents.map((ev) => (
              <motion.div
                key={ev.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={runSimulation}
                className="pointer-events-auto cursor-pointer w-64 bg-[#efe7d2] p-4 shadow-2xl rounded-sm border border-neutral-400 rotate-1 hover:rotate-0 transition-transform relative"
              >
                <Pin />
                <Paperclip
                  className="absolute -top-3 right-3 text-neutral-600 rotate-45"
                  size={18}
                />

                <p className="font-display text-[9px] tracking-widest text-neutral-600 border-b border-neutral-400 pb-1">
                  FINANCIAL TIMES WIRE
                </p>
                <p className="font-serif text-sm font-bold text-neutral-900 mt-1">
                  {ev.title}
                </p>
                <p className="font-serif text-[10px] text-neutral-700 italic line-clamp-2 mt-1">
                  {ev.summary}
                </p>

                <div className="mt-2 pt-2 border-t border-dashed border-neutral-400 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-red-700 font-bold">
                    Credit: {ev.creditImpact}
                  </span>
                  <span className="text-neutral-600">{ev.horizon}</span>
                </div>

                <button className="mt-3 w-full bg-red-800 text-white font-display text-[9px] py-1.5 rounded tracking-wider shadow-md hover:bg-red-700 transition-colors flex items-center justify-center gap-1">
                  <Eye size={12} /> LAUNCH MEDIA REACTION ▸
                </button>
              </motion.div>
            ))}
          </div>

          {droppedEvents.length === 0 && (
            <div className="grid h-full place-items-center text-center p-6">
              <div className="bg-black/50 p-4 rounded-xl border border-white/10 backdrop-blur max-w-md">
                <AlertCircle className="mx-auto text-gold-300 mb-2" size={24} />
                <p className="font-serif text-sm text-slate-200">
                  Drag scenario cards from the left sidebar onto this board to
                  evaluate compound systemic risk.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5-STAGE MEDIA REACTION MODAL */}
      {activeModalEvents && (
        <ScenarioSequenceModal
          events={activeModalEvents}
          onClose={() => setActiveModalEvents(null)}
        />
      )}
    </div>
  );
}

function Pin({ color = "red" }: { color?: "red" | "gold" }) {
  return (
    <MapPin
      size={14}
      className={`absolute -top-2 left-1/2 -translate-x-1/2 ${
        color === "gold" ? "text-amber-500" : "text-red-600"
      } drop-shadow`}
      fill={color === "gold" ? "#f59e0b" : "#dc2626"}
    />
  );
}
