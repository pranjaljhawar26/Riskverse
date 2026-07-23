import { useGame } from "@/data/store";
import { audio } from "@/lib/audio";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function TopBar() {
  const theme = useGame((s) => s.theme);
  const toggleTheme = useGame((s) => s.toggleTheme);
  const soundOn = useGame((s) => s.soundOn);
  const toggleSound = useGame((s) => s.toggleSound);

  const onSound = () => {
    if (soundOn) audio.stop();
    else audio.start();
    toggleSound();
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-end p-4 md:p-6">
      <div className="pointer-events-auto flex items-center gap-2">
        <Toggle
          onClick={toggleTheme}
          active={theme === "day"}
          label={theme === "day" ? "DAY" : "NIGHT"}
          icon={theme === "day" ? <Sun size={16} /> : <Moon size={16} />}
        />
        <Toggle
          onClick={onSound}
          active={soundOn}
          label={soundOn ? "SOUND ON" : "SOUND OFF"}
          icon={soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
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
      className={`glass-strong flex items-center gap-2 rounded-xl border px-3 py-2 font-display text-[10px] tracking-[0.25em] transition-colors ${
        active
          ? "border-gold-400/50 text-gold-200 shadow-gold"
          : "border-white/10 text-slate-400"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </motion.button>
  );
}
