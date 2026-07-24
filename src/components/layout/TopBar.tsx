import { useGame } from "@/data/store";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function TopBar() {
  const theme = useGame((s) => s.theme);
  const toggleTheme = useGame((s) => s.toggleTheme);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-end p-4 md:p-6">
      <div className="pointer-events-auto flex items-center gap-2">
        <Toggle
          onClick={toggleTheme}
          active={theme === "day"}
          label={theme === "day" ? "DAYLIGHT" : "NIGHTFALL"}
          icon={theme === "day" ? <Sun size={16} /> : <Moon size={16} />}
        />
      </div>
    </div>
  );
}

function Toggle({
  onClick,
  active,
  label,
  icon,
}: {
  onClick: () => void;
  active: boolean;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`glass-strong flex items-center gap-2 rounded-xl border px-3.5 py-2 font-display text-[10px] tracking-[0.25em] transition-all duration-500 ${
        active
          ? "border-amber-400/80 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 text-amber-950 shadow-[0_0_30px_rgba(251,191,36,0.45)] font-bold"
          : "border-white/10 text-slate-400 hover:text-slate-200"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </motion.button>
  );
}
