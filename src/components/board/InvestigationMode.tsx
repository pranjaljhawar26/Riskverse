import { useGame } from "@/data/store";
import { AnimatePresence, motion } from "framer-motion";
import { X, PenLine, Clock, TrendingDown } from "lucide-react";
import type { GameEvent, DecisionOption } from "@/data/types";

/** Cinematic camera-zoom into a handwritten Moleskine investigation notebook. */
export function InvestigationMode() {
  const investigating = useGame((s) => s.investigating);
  const activeEventId = useGame((s) => s.activeEventId);
  const events = useGame((s) => s.events);
  const close = useGame((s) => s.closeInvestigation);
  const resolve = useGame((s) => s.resolveDecision);

  const event = events.find((e) => e.id === activeEventId);

  return (
    <AnimatePresence>
      {investigating && event && (
        <motion.div
          className="absolute inset-0 z-[70] grid place-items-center bg-black/70 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.6, rotateX: 30, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="relative flex max-h-[86vh] w-[92vw] max-w-4xl overflow-hidden rounded-lg shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
          >
            {/* Left page: notes */}
            <div className="paper relative w-1/2 overflow-y-auto p-8">
              <div className="absolute inset-y-0 right-0 w-px bg-neutral-400/40" />
              <p className="mb-1 font-display text-[9px] tracking-[0.4em] text-neutral-500">
                MOLESKINE · CONFIDENTIAL
              </p>
              <h2 className="font-hand text-3xl font-bold text-neutral-900">
                {event.icon} {event.title}
              </h2>
              <div className="mt-3 flex items-center gap-2 text-neutral-500">
                <PenLine size={14} />
                <span className="font-hand text-lg">Investigation Notes</span>
              </div>
              <p className="mt-3 font-pen text-[15px] leading-relaxed text-neutral-800">
                {event.summary}
              </p>

              <p className="mt-4 font-hand text-xl text-red-700">
                Potential Consequences:
              </p>
              <ul className="mt-1 space-y-1">
                {event.impacts.map((im) => (
                  <li
                    key={im}
                    className="font-pen text-[15px] text-neutral-800"
                  >
                    – {im}
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-neutral-300 pt-4">
                <Stat
                  icon={<TrendingDown size={14} />}
                  label="Credit Impact"
                  value={event.creditImpact}
                />
                <Stat
                  icon={<TrendingDown size={14} />}
                  label="P&L Impact"
                  value={event.plImpact}
                />
                <Stat
                  icon={<Clock size={14} />}
                  label="Horizon"
                  value={event.horizon}
                />
              </div>
            </div>

            {/* Right page: decisions */}
            <div className="paper relative w-1/2 overflow-y-auto bg-[#ece3cc] p-8">
              <p className="font-hand text-2xl font-bold text-neutral-900">
                Executive Decision
              </p>
              <p className="mb-4 font-pen text-sm text-neutral-600">
                Choose your course of action, CEO.
              </p>
              <div className="space-y-3">
                {event.options.map((opt) => (
                  <DecisionCard
                    key={opt.id}
                    opt={opt}
                    onChoose={() => resolve(event, opt)}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={close}
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-neutral-900/80 text-white hover:bg-red-700"
            >
              <X size={16} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-1 flex items-center justify-center gap-1 text-red-700">
        {icon}
      </div>
      <p className="font-display text-[8px] tracking-widest text-neutral-500">
        {label.toUpperCase()}
      </p>
      <p className="font-hand text-lg font-bold text-neutral-900">{value}</p>
    </div>
  );
}

function DecisionCard({
  opt,
  onChoose,
}: {
  opt: DecisionOption;
  onChoose: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onChoose}
      className="w-full rounded-md border border-neutral-400/50 bg-[#f6efdc] p-3 text-left shadow-sm transition-colors hover:border-red-600/60"
    >
      <p className="font-hand text-lg font-bold text-neutral-900">
        {opt.label}
      </p>
      <p className="font-pen text-[13px] leading-snug text-neutral-600">
        {opt.description}
      </p>
    </motion.button>
  );
}
