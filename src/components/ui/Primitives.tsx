import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Panel({
  children,
  className,
  title,
  icon,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
}) {
  return (
    <div className={cn("glass rounded-2xl p-5 shadow-note", className)}>
      {title && (
        <div className="mb-4 flex items-center gap-2 border-b border-gold-500/15 pb-3">
          {icon && <span className="text-gold-300">{icon}</span>}
          <h3 className="font-display text-sm tracking-[0.25em] text-gold-200">
            {title.toUpperCase()}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
}

export function GoldButton({
  children,
  onClick,
  className,
  variant = "solid",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "solid" | "ghost";
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "rounded-xl px-5 py-2.5 font-display text-xs tracking-[0.2em] transition-colors",
        variant === "solid"
          ? "bg-gradient-to-b from-gold-300 to-gold-500 text-navy-950 shadow-gold hover:from-gold-200 hover:to-gold-400"
          : "border border-gold-400/40 text-gold-200 hover:bg-gold-400/10",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="mb-2 font-display text-[11px] tracking-[0.5em] text-gold-400/80">
          {eyebrow.toUpperCase()}
        </p>
      )}
      <h1 className="font-display text-3xl text-gradient-gold md:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 max-w-2xl font-serif text-lg text-slate-300/70">
          {subtitle}
        </p>
      )}
    </div>
  );
}
