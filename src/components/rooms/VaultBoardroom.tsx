import { useGame } from "@/data/store";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SectionTitle, Panel, GoldButton } from "../ui/Primitives";
import { Vault, Droplets, Landmark, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";

export function TreasuryVaultView() {
  const [open, setOpen] = useState(false);
  const bank = useGame((s) => s.bank);

  return (
    <div className="relative h-full overflow-hidden p-8 md:p-12">
      <SectionTitle
        eyebrow="Secret Room"
        title="Treasury Vault"
        subtitle="Beyond the reinforced door lie the bank's reserves and funding engines."
      />

      {!open ? (
        <div className="grid h-[70%] place-items-center">
          <motion.button
            onClick={() => setOpen(true)}
            className="group relative grid h-72 w-72 place-items-center rounded-full border-8 border-[#2a2118] bg-gradient-to-br from-[#3a2f22] to-[#1a140d] shadow-vault"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-6 rounded-full border-4 border-gold-500/30" />
            <motion.div
              className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-navy-950 shadow-gold-lg"
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Vault size={44} />
            </motion.div>
            <p className="absolute bottom-8 font-display text-[10px] tracking-[0.4em] text-gold-200">
              CLICK TO UNSEAL
            </p>
          </motion.button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            <VaultCard icon={<Droplets />} label="Liquidity Reserves" value={`$${(bank.deposits * 0.28).toFixed(0)}B`} sub={`LCR ${bank.lcr}%`} />
            <VaultCard icon={<Landmark />} label="Bond Issuances" value="$96B" sub="Senior + T2" />
            <VaultCard icon={<Banknote />} label="Deposits" value={`$${bank.deposits}B`} sub="Retail + Corp" />
            <VaultCard icon={<Vault />} label="HQLA Buffer" value="$182B" sub="Level 1 assets" />
            <div className="md:col-span-2 lg:col-span-4">
              <Panel title="Funding Sources">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[
                    ["Deposits", 62],
                    ["Wholesale", 21],
                    ["Covered Bonds", 11],
                    ["Central Bank", 6],
                  ].map(([k, v]) => (
                    <div key={k as string}>
                      <div className="mb-1 flex justify-between font-display text-[10px] tracking-widest text-slate-300">
                        <span>{(k as string).toUpperCase()}</span>
                        <span className="text-gold-200">{v}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-gold-300 to-gold-500"
                          style={{ width: `${v}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

function VaultCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="glass rounded-2xl p-5 shadow-note">
      <div className="mb-3 text-gold-300">{icon}</div>
      <p className="font-display text-[10px] tracking-[0.2em] text-slate-400">{label.toUpperCase()}</p>
      <p className="font-display text-2xl text-gradient-gold">{value}</p>
      <p className="font-serif text-xs text-slate-500">{sub}</p>
    </motion.div>
  );
}

const BASE_EXECS = [
  { role: "CEO", name: "A. Sterling", stance: "Decisive" },
  { role: "CRO", name: "M. Vance", stance: "Cautious" },
  { role: "CFO", name: "L. Okafor", stance: "Pragmatic" },
  { role: "Treasurer", name: "S. Delacroix", stance: "Defensive" },
  { role: "Head of Risk", name: "R. Nakamura", stance: "Conservative" },
];

export function BoardroomView() {
  const userRole = useGame((s) => s.userRole) || "CEO";
  const [userVote, setUserVote] = useState<"for" | "against" | null>(null);
  const [otherVotes, setOtherVotes] = useState<Record<string, "for" | "against" | "pending">>({});
  
  useEffect(() => {
    const next: Record<string, "for" | "against" | "pending"> = {};
    const others = BASE_EXECS.filter((e) => e.role !== userRole);
    const shuffled = [...others].sort(() => Math.random() - 0.5);
    const numToVote = Math.random() > 0.5 ? 2 : 3;
    
    shuffled.forEach((e, i) => {
      if (i < numToVote) {
        next[e.role] = Math.random() > 0.4 ? "for" : "against";
      } else {
        next[e.role] = "pending";
      }
    });
    setOtherVotes(next);
  }, [userRole]);

  const execs = BASE_EXECS.map((e) => ({
    ...e,
    name: e.role === userRole ? "You" : e.name,
  }));

  const allVotes = { ...otherVotes };
  if (userVote) allVotes[userRole] = userVote;
  
  const forCount = Object.values(allVotes).filter((v) => v === "for").length;

  return (
    <div className="h-full overflow-y-auto p-8 md:p-12">
      <SectionTitle
        eyebrow="Executive Committee"
        title="The Boardroom"
        subtitle="Convene your leadership. Motion: 'Approve the Climate Resilience mandate.'"
      />
      <div className="mb-8 flex flex-wrap items-center justify-center gap-6">
        {execs.map((e, i) => (
          <motion.div
            key={e.role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="w-40 rounded-2xl glass p-4 text-center shadow-note"
          >
            <div className="mx-auto mb-2 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-navy-600 to-navy-900 font-display text-xl text-gold-200">
              {e.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <p className="font-display text-xs tracking-[0.2em] text-gold-100">{e.role}</p>
            <p className="font-serif text-sm text-slate-300">{e.name}</p>
            <p className="mt-1 font-serif text-[11px] italic text-slate-500">{e.stance}</p>
            {e.role === userRole ? (
              <div className="mt-2 flex items-center justify-center gap-2 h-[22px]">
                <button
                  onClick={() => setUserVote("for")}
                  className={cn(
                    "rounded-full px-2 py-0.5 font-display text-[9px] tracking-widest transition-colors",
                    userVote === "for"
                      ? "bg-emerald-500/30 text-emerald-300"
                      : "bg-emerald-500/10 text-emerald-300/50 hover:bg-emerald-500/20"
                  )}
                >
                  FOR
                </button>
                <button
                  onClick={() => setUserVote("against")}
                  className={cn(
                    "rounded-full px-2 py-0.5 font-display text-[9px] tracking-widest transition-colors",
                    userVote === "against"
                      ? "bg-red-500/30 text-red-300"
                      : "bg-red-500/10 text-red-300/50 hover:bg-red-500/20"
                  )}
                >
                  AGAINST
                </button>
              </div>
            ) : (
              <div className="mt-2 h-[22px]">
                {otherVotes[e.role] === "pending" ? (
                  <span className="inline-block rounded-full bg-slate-500/20 px-3 py-0.5 font-display text-[9px] tracking-widest text-slate-300">
                    PENDING
                  </span>
                ) : otherVotes[e.role] === "for" ? (
                  <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-0.5 font-display text-[9px] tracking-widest text-emerald-300">
                    IN FAVOUR
                  </span>
                ) : otherVotes[e.role] === "against" ? (
                  <span className="inline-block rounded-full bg-red-500/20 px-3 py-0.5 font-display text-[9px] tracking-widest text-red-300">
                    OPPOSED
                  </span>
                ) : null}
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4">
        {userVote && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-lg text-slate-300"
          >
            Current Tally {forCount >= 3 ? (
              <span className="text-emerald-300">CARRIED</span>
            ) : (
              <span className="text-red-300">PENDING / REJECTED</span>
            )}
            {" "}
            — {forCount} in favour.
          </motion.p>
        )}
      </div>
    </div>
  );
}
