import { useMemo } from "react";
import { useGame } from "@/data/store";

/** Animated rain streaks on the window glass (night only). */
export function Rain() {
  const theme = useGame((s) => s.theme);
  const drops = useMemo(
    () =>
      Array.from({ length: 70 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        dur: 0.5 + Math.random() * 0.9,
        h: 40 + Math.random() * 90,
        o: 0.08 + Math.random() * 0.22,
      })),
    []
  );
  if (theme === "day") return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {drops.map((d) => (
        <span
          key={d.id}
          className="absolute top-[-120px] w-[1.5px] rounded-full bg-gradient-to-b from-transparent via-sky-200/40 to-sky-100/10"
          style={{
            left: `${d.left}%`,
            height: `${d.h}px`,
            opacity: d.o,
            animation: `rvfall ${d.dur}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes rvfall{0%{transform:translateY(0)}100%{transform:translateY(120vh)}}`}</style>
    </div>
  );
}

/** Night-city / day-city skyline seen through the floor-to-ceiling windows. */
export function Skyline() {
  const theme = useGame((s) => s.theme);
  const buildings = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        w: 26 + Math.random() * 60,
        h: 90 + Math.random() * 260,
        windows: Array.from({ length: 20 }).map(() => Math.random() > 0.45),
      })),
    []
  );
  const night = theme === "night";
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* sky gradient */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: night
            ? "linear-gradient(180deg,#05060f 0%,#0a1024 40%,#101a3a 100%)"
            : "linear-gradient(180deg,#8fb7e6 0%,#bcd6f0 45%,#e9d9b8 100%)",
        }}
      />
      {/* glow */}
      <div
        className="absolute left-1/2 top-1/3 h-[420px] w-[620px] -translate-x-1/2 rounded-full blur-[120px] transition-all duration-1000"
        style={{
          background: night
            ? "radial-gradient(circle,rgba(255,179,71,0.25),transparent 70%)"
            : "radial-gradient(circle,rgba(255,240,200,0.65),transparent 70%)",
        }}
      />
      {/* skyline */}
      <div className="absolute bottom-0 left-0 flex w-full items-end justify-center gap-[3px] px-2">
        {buildings.map((b) => (
          <div
            key={b.id}
            className="relative shrink-0 rounded-t-[2px]"
            style={{
              width: b.w,
              height: b.h,
              background: night
                ? "linear-gradient(180deg,#0c1224,#060812)"
                : "linear-gradient(180deg,#4a5a72,#2c3648)",
            }}
          >
            <div className="grid grid-cols-3 gap-[3px] p-[4px]">
              {b.windows.map((on, wi) => (
                <span
                  key={wi}
                  className="h-[4px] w-full rounded-[1px]"
                  style={{
                    background: on
                      ? night
                        ? "rgba(255,196,110,0.85)"
                        : "rgba(180,200,230,0.5)"
                      : "transparent",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
