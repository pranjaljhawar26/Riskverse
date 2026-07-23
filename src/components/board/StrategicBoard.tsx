import { useGame } from "@/data/store";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

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
  { id: "cet1", label: "CET1 Ratio", value: "14.3%", color: "#fde68a", x: 6, y: 10, rot: -4 },
  { id: "lcr", label: "LCR", value: "152%", color: "#bbf7d0", x: 22, y: 6, rot: 3 },
  { id: "mrel", label: "MREL", value: "Above Target", color: "#fde68a", x: 38, y: 12, rot: -2 },
  { id: "esg", label: "ESG Rating", value: "AA", color: "#bfdbfe", x: 55, y: 7, rot: 4 },
  { id: "conf", label: "Customer Confidence", value: "82%", color: "#fecaca", x: 71, y: 11, rot: -3 },
  { id: "share", label: "Share Price", value: "$102.45", color: "#fde68a", x: 8, y: 46, rot: 2 },
  { id: "loans", label: "Loan Book", value: "$780B", color: "#c7d2fe", x: 24, y: 52, rot: -3 },
  { id: "dep", label: "Deposits", value: "$650B", color: "#bbf7d0", x: 40, y: 48, rot: 3 },
];

/** The gigantic detective-style investigation board on the wall. */
export function StrategicBoard() {
  const openInvestigation = useGame((s) => s.openInvestigation);
  const events = useGame((s) => s.events);
  const mood = useGame((s) => s.mood());
  const wildfire = events.find((e) => e.id === "california-wildfires")!;

  return (
    <div className="relative h-full w-full overflow-hidden p-6 md:p-10">
      <div
        className={`cork relative mx-auto h-full max-w-6xl overflow-hidden rounded-lg border-[10px] border-[#3a2413] shadow-[0_30px_80px_rgba(0,0,0,0.6)] ${
          mood === "crisis" ? "animate-crisisPulse" : ""
        }`}
      >
        {/* red connecting strings (SVG) */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          <line x1="12%" y1="20%" x2="75%" y2="60%" stroke="#dc2626" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="42%" y1="22%" x2="75%" y2="60%" stroke="#dc2626" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="75%" y1="60%" x2="60%" y2="82%" stroke="#dc2626" strokeWidth="1.5" strokeOpacity="0.6" />
        </svg>

        {/* Sticky notes */}
        {STICKIES.map((s, i) => (
          <motion.button
            key={s.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.08, rotate: 0, zIndex: 20 }}
            onClick={() => openInvestigation(wildfire.id)}
            className="absolute w-28 p-3 text-left shadow-note animate-sway"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              background: s.color,
              transform: `rotate(${s.rot}deg)`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <Pin />
            <p className="font-hand text-[13px] font-bold leading-tight text-neutral-700">
              {s.label}
            </p>
            <p className="font-hand text-xl font-bold text-neutral-900">
              {s.value}
            </p>
          </motion.button>
        ))}

        {/* Newspaper clipping */}
        <motion.button
          whileHover={{ scale: 1.05, rotate: 0 }}
          onClick={() => openInvestigation(wildfire.id)}
          className="absolute left-[70%] top-[46%] w-52 rotate-2 bg-[#efe7d2] p-3 text-left shadow-note"
        >
          <Pin />
          <p className="border-b border-neutral-400 pb-1 font-display text-[9px] tracking-widest text-neutral-600">
            THE FINANCIAL LEDGER
          </p>
          <p className="mt-1 font-serif text-base font-bold leading-tight text-neutral-900">
            California Wildfires Escalate
          </p>
          <p className="mt-1 font-serif text-[10px] italic text-neutral-600">
            Insurers brace for record claims as fires spread…
          </p>
        </motion.button>

        {/* Polaroid */}
        <motion.button
          whileHover={{ scale: 1.06, rotate: 0 }}
          onClick={() => openInvestigation(wildfire.id)}
          className="absolute left-[54%] top-[76%] w-36 -rotate-3 bg-white p-2 pb-6 shadow-note"
        >
          <Pin />
          <div className="h-24 w-full bg-gradient-to-b from-orange-500 via-red-600 to-neutral-900" />
          <p className="mt-1 text-center font-hand text-sm text-neutral-700">
            wildfire · CA
          </p>
        </motion.button>

        {/* Handwritten note */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="absolute left-[6%] top-[74%] w-44 rotate-2 bg-[#fff8e1] p-3 shadow-note"
        >
          <Pin />
          <p className="font-hand text-lg leading-tight text-red-700">
            Review Energy Exposure ⟶
          </p>
          <div className="mt-1 h-8 w-8 rounded-full border-2 border-red-600" />
        </motion.div>

        {/* Title */}
        <div className="absolute right-6 top-4 text-right">
          <p className="font-display text-[10px] tracking-[0.4em] text-black/50">
            STRATEGIC INVESTIGATION BOARD
          </p>
        </div>
      </div>

      <p className="mt-4 text-center font-serif text-sm italic text-slate-400">
        Click any item to enter Investigation Mode
      </p>
    </div>
  );
}

function Pin() {
  return (
    <MapPin
      size={16}
      className="absolute -top-2 left-1/2 -translate-x-1/2 text-red-600 drop-shadow"
      fill="#dc2626"
    />
  );
}
