import { useGame } from "@/data/store";
import { motion } from "framer-motion";
import { SectionTitle, Panel } from "../ui/Primitives";
import { MetricBars } from "../hud/MetricBars";
import { audio } from "@/lib/audio";
import { Moon, Sun, Volume2, VolumeX, RotateCcw } from "lucide-react";

const HEADLINES = [
  { tag: "MARKETS", title: "Global equities steady as central banks hold", tone: "neutral" },
  { tag: "CLIMATE", title: "California wildfires escalate; insurers on alert", tone: "bad" },
  { tag: "BANKING", title: "AI-native challenger bank crosses 10M users", tone: "bad" },
  { tag: "RATES", title: "Curve steepens on resilient labour data", tone: "neutral" },
  { tag: "ESG", title: "Green bond issuance hits record quarter", tone: "good" },
  { tag: "TECH", title: "Ransomware wave targets banking rails", tone: "bad" },
];

export function NewsView() {
  return (
    <div className="h-full overflow-y-auto p-8 md:p-12">
      <SectionTitle eyebrow="Bloomberg-style Wire" title="Market News" subtitle="The world never sleeps. Neither do you." />
      <div className="space-y-3">
        {HEADLINES.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 rounded-xl glass p-4"
          >
            <span
              className={`rounded px-2 py-1 font-display text-[9px] tracking-[0.2em] ${h.tone === "bad"
                  ? "bg-red-500/20 text-red-300"
                  : h.tone === "good"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-gold-400/15 text-gold-200"
                }`}
            >
              {h.tag}
            </span>
            <p className="font-serif text-lg text-slate-200">{h.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ReportsView() {
  const bank = useGame((s) => s.bank);
  const decisions = useGame((s) => s.decisions);
  const score = useGame((s) => s.score());
  const grade = useGame((s) => s.grade());

  const figs = [
    ["CET1 Ratio", `${bank.cet1}%`],
    ["LCR", `${bank.lcr}%`],
    ["Share Price", `$${bank.sharePrice}`],
    ["Loan Book", `$${bank.loanBook}B`],
    ["Deposits", `$${bank.deposits}B`],
    ["Customer Confidence", `${bank.customerConfidence}%`],
    ["ESG Rating", bank.esgRating],
    ["MREL", bank.mrel],
  ];

  return (
    <div className="h-full overflow-y-auto p-8 md:p-12">
      <SectionTitle eyebrow="Analyst Desk" title="Executive Reports" subtitle={`Composite rating ${grade} · Score ${score}`} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel title="Balance Sheet Snapshot" className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {figs.map(([k, v]) => (
              <div key={k} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <p className="font-display text-[9px] tracking-widest text-slate-400">{k.toUpperCase()}</p>
                <p className="font-display text-xl text-gradient-gold">{v}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Pillar Scores">
          <MetricBars />
        </Panel>
        <Panel title="Decision Log" className="lg:col-span-3">
          {decisions.length === 0 ? (
            <p className="font-serif italic text-slate-500">No decisions recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {decisions.map((d, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2">
                  <span className="font-serif text-slate-200">{d.eventTitle}</span>
                  <span className="font-display text-xs tracking-wide text-gold-200">{d.optionLabel}</span>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}

export function SettingsView() {
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
    <div className="h-full overflow-y-auto p-8 md:p-12">
      <SectionTitle eyebrow="Preferences" title="Settings" subtitle="Tune the atmosphere of your war room." />
      <div className="max-w-xl space-y-4">
        <Row
          label="Atmosphere"
          value={theme === "day" ? "Day — Penthouse" : "Night — Storm"}
          icon={theme === "day" ? <Sun size={18} /> : <Moon size={18} />}
          onClick={toggleTheme}
        />
        <Row
          label="Ambient Sound"
          value={soundOn ? "On — Jazz, Rain, Thunder" : "Off"}
          icon={soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          onClick={onSound}
        />
        <Row
          label="Reset Session"
          value="Reload the simulation"
          icon={<RotateCcw size={18} />}
          onClick={() => location.reload()}
          actionLabel="RELOAD ▸"
        />
      </div>
    </div>
  );
}

function Row({ label, value, icon, onClick, actionLabel = "TOGGLE ▸" }: { label: string; value: string; icon: React.ReactNode; onClick: () => void; actionLabel?: string }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl glass p-5 text-left transition-colors hover:border-gold-400/40"
    >
      <div className="flex items-center gap-4">
        <span className="text-gold-300">{icon}</span>
        <div>
          <p className="font-display text-sm tracking-[0.2em] text-gold-100">{label.toUpperCase()}</p>
          <p className="font-serif text-sm text-slate-400">{value}</p>
        </div>
      </div>
      <span className="font-display text-[10px] tracking-widest text-gold-300">{actionLabel}</span>
    </button>
  );
}
