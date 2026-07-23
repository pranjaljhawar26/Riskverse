import { useGame } from "@/data/store";
import type { ViewId } from "@/data/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  ClipboardList,
  Crown,
  Landmark,
  Newspaper,
  Settings,
  ShieldAlert,
  Sparkles,
  Vault,
  Layers,
  LogOut,
  UserCircle
} from "lucide-react";

const ITEMS: { id: ViewId; label: string; icon: React.ReactNode }[] = [
  { id: "office", label: "Office", icon: <Building2 size={18} /> },
  { id: "board", label: "Strategic Board", icon: <Layers size={18} /> },
  { id: "scenarios", label: "Scenarios", icon: <ClipboardList size={18} /> },
  { id: "warroom", label: "Crisis Command Centre", icon: <ShieldAlert size={18} /> },
  { id: "vault", label: "Treasury Vault", icon: <Vault size={18} /> },
  { id: "boardroom", label: "Boardroom", icon: <Crown size={18} /> },
  { id: "news", label: "Market News", icon: <Newspaper size={18} /> },
  { id: "reports", label: "Reports", icon: <Landmark size={18} /> },
  { id: "athena", label: "Athena", icon: <Sparkles size={18} /> },
  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
];

export function LeftNav() {
  const view = useGame((s) => s.view);
  const setView = useGame((s) => s.setView);
  const userRole = useGame((s) => s.userRole);
  const userEmail = useGame((s) => s.userEmail);
  const logout = useGame((s) => s.logout);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="relative z-30 flex h-full w-[76px] flex-col items-center gap-1 border-r border-gold-500/15 bg-navy-950/70 py-5 backdrop-blur-xl md:w-[228px] md:items-stretch md:px-3">
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-gold-300 to-gold-600 font-display text-navy-950">
          R
        </div>
        <div className="hidden md:block">
          <p className="font-display text-sm tracking-[0.2em] text-gradient-gold">
            RISKVERSE AI
          </p>
          <p className="font-display text-[9px] tracking-[0.35em] text-gold-300/60">
            EXECUTIVE WAR ROOM
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {ITEMS.map((it) => {
          const active = view === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setView(it.id)}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                active
                  ? "bg-gold-400/10 text-gold-200"
                  : "text-slate-400 hover:bg-white/[0.03] hover:text-gold-200"
              )}
            >
              {active && (
                <motion.span
                  layoutId="navGlow"
                  className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-gold-300 shadow-gold"
                />
              )}
              <span className={cn(active && "text-gold-300")}>{it.icon}</span>
              <span className="hidden font-display text-[11px] tracking-[0.18em] md:block">
                {it.label.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-4 md:px-2 flex flex-col gap-2 relative">
        {userEmail && (
          <div className="relative">
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full left-0 mb-2 w-full overflow-hidden rounded-xl border border-gold-400/20 bg-navy-900 shadow-note backdrop-blur-xl"
                >
                  <button
                    className="flex w-full items-center gap-2 px-4 py-3 text-left font-display text-[10px] tracking-widest text-slate-300 transition-colors hover:bg-white/5 hover:text-gold-200"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <UserCircle size={14} />
                    UPDATE PROFILE
                  </button>
                  <div className="h-px bg-white/5" />
                  <button
                    className="flex w-full items-center gap-2 px-4 py-3 text-left font-display text-[10px] tracking-widest text-red-400 transition-colors hover:bg-white/5 hover:text-red-300"
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                  >
                    <LogOut size={14} />
                    LOG OUT
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="hidden w-full text-left rounded-lg bg-navy-900/50 p-2 md:block transition-colors hover:bg-navy-900/80"
            >
              <p className="font-display text-[10px] tracking-widest text-gold-300/80">
                {userRole.toUpperCase()}
              </p>
              <p className="font-mono text-[9px] text-slate-500">
                {userEmail}
              </p>
            </button>
          </div>
        )}
        <p className="hidden font-serif text-[11px] italic text-slate-500 md:block">
          “Tomorrow the world might change — and you're responsible.”
        </p>
      </div>
    </nav>
  );
}
