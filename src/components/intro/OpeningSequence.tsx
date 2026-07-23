import { useGame } from "@/data/store";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AlertTriangle, Sparkles } from "lucide-react";

/**
 * Opening cinematic:
 * fade from black → jazz/rain hint → camera pan → lamp on → poster →
 * BREAKING NEWS → red board notification → Athena note.
 */
export function OpeningSequence() {
  const introDone = useGame((s) => s.introDone);
  const finishIntro = useGame((s) => s.finishIntro);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (introDone) return;
    const timings = [600, 2200, 3800, 5200, 7000, 9200, 11200];
    const timers = timings.map((t, i) =>
      window.setTimeout(() => setStage(i + 1), t)
    );
    return () => timers.forEach(clearTimeout);
  }, [introDone]);

  if (introDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="absolute inset-0 z-[80] overflow-hidden bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        {/* Camera pan vignette */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.25, x: 80 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ duration: 11, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at 70% 60%, rgba(255,179,71,0.10), transparent 55%), linear-gradient(180deg,#05060f,#0a1024)",
          }}
        />

        {/* Fade from black */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: stage >= 1 ? 0 : 1 }}
          transition={{ duration: 2 }}
        />

        {/* Lamp turns on */}
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              className="absolute bottom-24 right-1/3 h-72 w-72 rounded-full blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 0.55, 0.4] }}
              transition={{ duration: 2 }}
              style={{
                background:
                  "radial-gradient(circle,rgba(255,179,71,0.55),transparent 70%)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Poster */}
        <AnimatePresence>
          {stage >= 4 && stage < 6 && (
            <motion.div
              className="absolute left-1/2 top-1/2 w-[560px] max-w-[86vw] -translate-x-1/2 -translate-y-1/2 text-center"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 1.6 }}
            >
              <div className="rounded-sm border-[6px] border-[#2a2016] bg-gradient-to-b from-navy-900 to-navy-950 px-10 py-14 shadow-[0_0_60px_-10px_rgba(0,0,0,0.9)]">
                <p className="mb-4 font-display text-[10px] tracking-[0.6em] text-gold-400/70">
                  RISKVERSE AI
                </p>
                <p className="font-serif text-2xl italic leading-relaxed text-gold-100 md:text-3xl">
                  “Tomorrow the world might change
                  <br /> and you're responsible.”
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Breaking news */}
        <AnimatePresence>
          {stage >= 5 && stage < 7 && (
            <motion.div
              className="absolute bottom-28 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-3 rounded-md border border-red-500/40 bg-red-950/70 px-5 py-3 backdrop-blur animate-crisisPulse">
                <span className="rounded bg-red-600 px-2 py-1 font-display text-[10px] tracking-[0.3em] text-white">
                  BREAKING
                </span>
                <span className="font-display text-sm tracking-[0.2em] text-red-100">
                  CALIFORNIA WILDFIRES ESCALATE
                </span>
                <AlertTriangle className="text-red-300" size={18} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enter button */}
        <AnimatePresence>
          {stage >= 7 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={finishIntro}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-400/50 bg-gradient-to-b from-gold-300 to-gold-500 px-10 py-4 font-display text-xs tracking-[0.35em] text-navy-950 shadow-gold-lg"
            >
              ENTER THE WAR ROOM
            </motion.button>
          )}
        </AnimatePresence>

        {/* Skip */}
        <button
          onClick={finishIntro}
          className="absolute bottom-6 right-8 z-10 font-display text-[10px] tracking-[0.3em] text-slate-500 hover:text-gold-300"
        >
          SKIP ▸
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
