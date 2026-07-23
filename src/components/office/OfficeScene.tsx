import { useGame } from "@/data/store";
import { Rain, Skyline } from "../atmosphere/Atmosphere";
import { motion } from "framer-motion";
import { Coffee, Newspaper, Award } from "lucide-react";

/** The executive office homepage — floor-to-ceiling windows, desk, lamp, poster. */
export function OfficeScene() {
  const theme = useGame((s) => s.theme);
  const setView = useGame((s) => s.setView);
  const mood = useGame((s) => s.mood());
  const decisions = useGame((s) => s.decisions);
  const score = useGame((s) => s.score());
  const night = theme === "night";

  // Dynamic evolution: awards for good scores, clutter for crisis
  const awards = score >= 78 ? 3 : score >= 68 ? 2 : 1;
  const cluttered = mood === "crisis";

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Window wall */}
      <div className="absolute inset-0">
        <Skyline />
        <Rain />
        {/* window mullions */}
        <div className="absolute inset-0 grid grid-cols-4 opacity-60">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-r border-black/40" />
          ))}
        </div>
      </div>

      {/* Warm room overlay */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: night
            ? "radial-gradient(circle at 78% 78%, rgba(255,179,71,0.16), transparent 45%), linear-gradient(180deg, transparent 40%, #05060fee 100%)"
            : "radial-gradient(circle at 50% 20%, rgba(255,244,214,0.25), transparent 50%), linear-gradient(180deg, transparent 55%, #0a1024cc 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 vignette" />

      {/* Framed poster on wall */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute left-8 top-24 hidden w-64 rotate-[-1.5deg] lg:block"
      >
        <div className="rounded-sm border-[6px] border-[#2a2016] bg-navy-900/80 px-6 py-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur">
          <p className="mb-2 font-display text-[8px] tracking-[0.5em] text-gold-400/60">
            RISKVERSE AI
          </p>
          <p className="font-serif text-lg italic leading-snug text-gold-100">
            “Tomorrow the world might change and you're responsible.”
          </p>
        </div>
      </motion.div>

      {/* Awards on wall */}
      <div className="absolute right-10 top-24 hidden flex-col gap-3 lg:flex">
        {Array.from({ length: awards }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.15 }}
            className="flex items-center gap-2 rounded-md border border-gold-400/25 bg-navy-900/60 px-3 py-2 backdrop-blur"
          >
            <Award className="text-gold-300" size={16} />
            <span className="font-display text-[9px] tracking-[0.2em] text-gold-200">
              GSIB EXCELLENCE '2{6 + i}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Desk */}
      <div className="absolute bottom-0 left-0 right-0 h-[34%]">
        <div className="leather absolute inset-x-0 bottom-0 h-full">
          <div className="absolute inset-x-0 top-0 h-[14px] bg-gradient-to-b from-[#3a2a1a] to-transparent" />
        </div>

        {/* Desk lamp glow */}
        {night && (
          <div className="absolute bottom-24 right-[26%] h-52 w-52 rounded-full bg-amber-glow/25 blur-3xl animate-flicker" />
        )}

        {/* Desk items */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-end gap-6">
          <DeskItem
            icon={<Newspaper size={22} />}
            label="THE FINANCIAL LEDGER"
            onClick={() => setView("news")}
          />
          <DeskItem
            icon={<Coffee size={22} />}
            label="ESPRESSO"
            onClick={() => {}}
          />
          {cluttered &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-16 w-16 rotate-3 rounded-sm bg-yellow-200/90 p-1 shadow-note"
                style={{ transform: `rotate(${(i - 1) * 6}deg)` }}
              >
                <p className="font-hand text-[10px] leading-tight text-red-800">
                  URGENT review!!
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Center CTA */}
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl tracking-[0.15em] text-gradient-gold md:text-6xl"
        >
          THE WAR ROOM
        </motion.h1>
        <p className="mt-3 font-serif text-lg italic text-slate-300/70">
          {decisions.length === 0
            ? "A situation is developing. Approach the board."
            : `${decisions.length} executive decisions on record.`}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setView("board")}
          className="mt-6 rounded-full border border-gold-400/50 bg-gradient-to-b from-gold-300 to-gold-500 px-8 py-3 font-display text-xs tracking-[0.3em] text-navy-950 shadow-gold-lg animate-pulseGlow"
        >
          APPROACH THE STRATEGIC BOARD
        </motion.button>
      </div>
    </div>
  );
}

function DeskItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -6, scale: 1.05 }}
      onClick={onClick}
      className="group flex flex-col items-center gap-2"
    >
      <div className="grid h-14 w-14 place-items-center rounded-xl border border-gold-400/25 bg-navy-900/70 text-gold-300 shadow-note backdrop-blur transition-colors group-hover:border-gold-300/60 group-hover:text-gold-200">
        {icon}
      </div>
      <span className="font-display text-[8px] tracking-[0.25em] text-slate-400 group-hover:text-gold-200">
        {label}
      </span>
    </motion.button>
  );
}
