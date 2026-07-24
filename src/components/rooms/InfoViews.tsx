import { useGame } from "@/data/store";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle, Panel } from "../ui/Primitives";
import { MetricBars } from "../hud/MetricBars";
import { Moon, Sun, RotateCcw, X, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const HEADLINES = [
  {
    tag: "MARKETS",
    title: "Global equities steady as central banks hold",
    tone: "neutral",
    subHeadline:
      "MONETARY PLATEAUS AND MACRO PRUDENT VOLATILITY STABILIZE WORLD INDICES",
    content: `Global equity markets found solid footing this morning as key central banks signaled a prolonged holding pattern on benchmark interest rates. With inflation cooling toward target levels but structural labor bottlenecks remaining, monetary policymakers have opted for a cautious "wait-and-see" posture. While equity indices reacted with moderate gains, European banking executives are voicing growing concern over compressed net interest margins (NIMs).

    The prolonged plateau in rates means banks can no longer expand the spread between what they charge on loans and what they pay to deposit holders. In Germany and France, fierce competition for retail funding is forcing lenders to offer higher yields on savings accounts to prevent deposit flight to money market funds, directly biting into profitability. Furthermore, the stagnation in investment banking pipelines persists; equity capital markets (ECM) activity remains well below historical averages, drying up lucrative advisory fees.

    On the regulatory front, supervisory bodies are reminding institutions to maintain high Liquidity Coverage Ratios (LCR) despite market stability. "The current calm is deceptive," noted one ECB observer. "Banks must utilize this holding period to strengthen capital buffers and clean up legacy non-performing loans rather than assuming a soft landing is guaranteed."`,
  },
  {
    tag: "CLIMATE",
    title: "California wildfires escalate; insurers on alert",
    tone: "bad",
    subHeadline:
      "REINSURANCE CONTAGION LOOMS LARGE AS RECURRING ENVIRONMENTAL HAZARDS STRIKE CRE PORTFOLIOS",
    content: `Severe wildfires raging across Northern California have escalated to unprecedented levels, burning through hundreds of commercial properties and residential developments. As firefighting teams struggle with extreme wind conditions, global reinsurance giants are bracing for a catastrophic surge in insurance claims. Financial analysts estimate total insured losses could exceed $12 billion, placing extreme liquidity pressure on regional underwriting syndicates.

    For European banks, this environmental disaster is not merely a distant physical hazard; it represents a major counterparty credit risk. European lenders hold significant investment exposure to international insurers and corporate syndicates active in US property markets. A sudden rating downgrade of a major reinsurance counterparty could trigger margin calls and write-downs across global credit portfolios.

    Furthermore, this crisis accelerates the enforcement of ECB Pillar 2 capital requirements for climate risk. Lenders are under strict mandates to run rigorous climate stress tests. If a bank’s portfolio shows unhedged exposure to high-risk real estate regions—either directly or through syndicated debt—regulators will demand immediate capital add-ons. Risk officers are scrambling to reassess Commercial Real Estate (CRE) books and explore derivative hedges, highlighting the inescapable link between climate devastation and balance sheet integrity.`,
  },
  {
    tag: "BANKING",
    title: "AI-native challenger bank crosses 10M users",
    tone: "bad",
    subHeadline:
      "FINTECH DISRUPTION SCALES AS DIGITAL INCUMBENT RE-ENGINEERS RETAIL FUNDING FORECASTS",
    content: `A prominent AI-native challenger bank has announced crossing the milestone of 10 million active customer accounts, signaling a profound shift in consumer retail banking. Operating with a fully automated, cloud-based framework that utilizes generative AI agents for underwriting, customer support, and treasury management, the digital disruptor claims an operating cost-per-account that is up to 80% lower than traditional brick-and-mortar competitors.

    This rapid scaling presents a critical structural challenge to incumbent European banks. Traditional lenders are burdened by expensive legacy IT systems and physical branch networks that severely limit operational agility. As the AI challenger aggressively bids up deposit rates—funded by its lean operating expenses—older institutions are experiencing accelerating deposit attrition, particularly among tech-literate, high-net-worth younger demographics.

    To defend their franchise value, legacy banks must decide whether to embark on costly, multi-year core banking system overhauls or quickly acquire smaller fintech players to bridge the technological gap. However, digitizing in a rush introduces elevated cyber vulnerabilities and operational risk. Executive committees must carefully weigh the risk-reward ratio: failure to modernize risks terminal margin compression, while rapid migration to unproven cloud setups could compromise system reliability and invite immediate regulatory penalties.`,
  },
  {
    tag: "RATES",
    title: "Curve steepens on resilient labour data",
    tone: "neutral",
    subHeadline:
      "STUBBORN WAGE INFLATION SQUEEZES SOVEREIGN YIELDS; CREDIT RISKS GROW AMONG EU LENDERS",
    content: `Bond markets experienced significant volatility as fresh, highly resilient employment figures triggered a sharp steepening of major sovereign yield curves. Stronger-than-expected payroll expansion and rising wage pressure suggest that structural inflation remains firmly embedded in the global economy, reducing any near-term likelihood of aggressive interest rate cuts. Consequently, long-term bond yields spiked while short-term rates remained relatively stable.

    A steepening yield curve is traditionally viewed as a positive development for commercial banks. It enhances the classical "maturity transformation" model, allowing banks to borrow short-term funds at lower rates while lending at higher, long-term yields, thereby boosting Net Interest Income (NII). However, this optimistic outlook carries severe hidden dangers for European lenders.

    Persistent wage inflation and elevated borrowing costs are squeezing the cash reserves of Small and Medium Enterprises (SMEs) across Europe. As refinancing dates approach, a growing wave of business defaults is expected. Banks must carefully balance the short-term benefits of wider interest margins against the rising credit provisions required for deteriorating loan books. Additionally, the sudden drop in long-term bond prices creates unrealized losses on banks' held-to-collect securities portfolios, challenging regulatory capital ratios.`,
  },
  {
    tag: "ESG",
    title: "Green bond issuance hits record quarter",
    tone: "good",
    subHeadline:
      "EBA TARGETS GREENWASHING RISKS AS SYSTEMIC INVESTMENT POOLS FLOOD SUSTAINABLE PAPER",
    content: `Global issuance of green and sustainable debt has shattered previous quarterly records, reaching a staggering volume led by European corporate and sovereign issuers. Driven by strict regional mandates, corporate treasurers and public entities are pivoting capital toward climate resilience, renewable energy grids, and green construction projects. Investors have flooded these offerings, showing a strong willingness to accept slightly lower yields—a phenomenon known as the "greenium."

    European investment banks have been major beneficiaries of this trend, dominating underwriting syndicates and collecting substantial fee income. For sustainable institutions, expanding their green debt portfolio enhances reputational capital and aligns with shifting public sentiment. Yet, this rapid market expansion is attracting intense regulatory scrutiny.

    The European Banking Authority (EBA) is actively auditing green portfolios to prevent "greenwashing." Lenders who market bonds as sustainable but fail to demonstrate concrete environmental impact face severe reputational backlash, legal liabilities, and regulatory sanctions. Banks are being forced to build expensive compliance structures to track the exact lifecycle of green capital, transforming ESG reporting from a marketing exercise into a core risk management function.`,
  },
  {
    tag: "TECH",
    title: "Ransomware wave targets banking rails",
    tone: "bad",
    subHeadline:
      "CYBER ATTACK THREATENS SWIFT AND TARGET2 INTERMEDIARIES; SECURITY PARADIGMS PUT ON NOTICE",
    content: `A highly coordinated and sophisticated ransomware campaign has breached core payment intermediaries on three continents, disrupting global clearing houses and interbank transaction systems. The attackers, believed to be a state-sponsored cyber-criminal syndicate, successfully deployed advanced encryption payloads that took several critical clearing nodes offline, halting clearing flows and leaving billions in transactions in limbo.

    The banking sector is highly interconnected, meaning local disruptions can quickly escalate into systemic liquidity blockages. European banks relying on SWIFT and TARGET2 clearing structures are on high alert. Even if an individual bank's systems are secure, a breach in a key counterparty can lock up funding lines, rapidly inflating intra-day liquidity requirements and triggering severe operational chaos.

    This crisis highlights the immediate relevance of Europe's Digital Operational Resilience Act (DORA). Regulators are warning institutions that cybersecurity is no longer just an IT concern, but a major pillar of capital adequacy. Lenders must rapidly deploy capital into zero-trust architectures, multi-region secure backups, and continuous intrusion testing. Proactive threat mitigation is essential to avoid catastrophic reputation damage and prevent business-disrupting service suspensions.`,
  },
];

export function NewsView() {
  const [activeArticle, setActiveArticle] = useState<
    (typeof HEADLINES)[number] | null
  >(null);

  return (
    <div className="h-full overflow-y-auto p-8 md:p-12">
      <SectionTitle
        eyebrow="Bloomberg-style Wire"
        title="Market News"
        subtitle="The world never sleeps. Neither do you."
      />

      <div className="space-y-3">
        {HEADLINES.map((h, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.008, x: 4 }}
            onClick={() => setActiveArticle(h)}
            className="flex w-full items-center gap-4 rounded-xl glass p-4 text-left transition-colors hover:border-gold-400/40 hover:bg-white/[0.03]"
          >
            <span
              className={`rounded px-2 py-1 font-display text-[9px] tracking-[0.2em] ${
                h.tone === "bad"
                  ? "bg-red-500/20 text-red-300"
                  : h.tone === "good"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-gold-400/15 text-gold-200"
              }`}
            >
              {h.tag}
            </span>
            <p className="font-serif text-lg text-slate-200 flex-1">
              {h.title}
            </p>
            <span className="text-xs font-display tracking-widest text-gold-400/40 group-hover:text-gold-300">
              READ ARTICLE ▸
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="paper relative flex h-[78vh] w-full max-w-4xl flex-col rounded border-[8px] border-[#25201a] p-6 shadow-[0_35px_80px_rgba(0,0,0,0.9)] md:p-8 z-10"
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-[#22201a]/60 transition-colors hover:bg-black/5 hover:text-[#22201a]"
                title="Close newspaper"
              >
                <X size={20} />
              </button>

              <div className="border-b-2 border-double border-[#2b251d] pb-3 text-center select-none">
                <p className="font-serif text-[10px] tracking-[0.5em] text-[#4e4537] font-semibold">
                  THE FINANCIAL TIMELINE OF RISKVERSE
                </p>
                <h2 className="my-1 font-serif text-3xl font-extrabold tracking-widest text-[#1a1611]">
                  DAILY SENTINEL
                </h2>
                <div className="flex items-center justify-between border-t border-[#2b251d]/40 pt-1.5 font-serif text-[9px] italic text-[#5c5344] font-semibold">
                  <span>VOL. LXVII... No. 41,208</span>
                  <span className="uppercase tracking-[0.1em]">
                    LONDON • FRANKFURT • NEW YORK
                  </span>
                  <span>THURSDAY, JULY 23, 2026</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pt-6 pr-2 scrollbar-thin">
                <h1 className="font-serif text-xl font-bold tracking-tight text-[#111] md:text-2xl leading-tight text-center mb-1 select-text">
                  {activeArticle.title.toUpperCase()}
                </h1>

                <p className="mb-4 text-center font-serif text-xs italic text-[#4e4537] tracking-wide select-text">
                  {activeArticle.subHeadline}
                </p>

                <div className="h-px bg-[#2b251d]/20 w-full my-4" />

                <div className="md:columns-2 gap-8 font-serif text-[#25221c] leading-relaxed text-justify select-text">
                  <p className="whitespace-pre-line text-[14px]">
                    <span className="float-left text-5xl font-extrabold pr-2 pt-1.5 leading-[0.75] text-[#1a1611] font-serif select-none">
                      {activeArticle.content.trim().charAt(0)}
                    </span>
                    {activeArticle.content.trim().slice(1)}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-dashed border-[#2b251d]/40 pt-3 text-center select-none">
                <p className="font-serif text-[9px] italic text-[#5c5344]">
                  © 2026 RiskVerse Intelligence Syndicate. This document is
                  strictly classified for Executive C-Suite circulation only.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Dynamic mapper that translates raw decisions into news-based professional brief one-liners.
 */
function getNewsBasedOneLiner(eventTitle: string, optionLabel: string) {
  const map: Record<
    string,
    { category: string; headline: string; brief: string }
  > = {
    "California Wildfires": {
      category: "CLIMATE NEWS",
      headline: "California wildfires escalate; insurers on alert",
      brief:
        "In response to severe property hazards and reinsurer distress, our executive committee decided to [Action].",
    },
    "Global Cyber Attack": {
      category: "TECH WIRE",
      headline: "Ransomware wave targets banking rails",
      brief:
        "Following the systemic cyber-assault targeting SWIFT and TARGET2 clearing channels, we resolved to [Action].",
    },
    "Deposit Run": {
      category: "BANKING ALERT",
      headline: "Social media panic triggers deposit outflows",
      brief:
        "Faced with viral deposit attrition and retail funding pressures, treasury intervened to [Action].",
    },
  };

  const matched = map[eventTitle];
  if (matched) {
    return {
      category: matched.category,
      headline: matched.headline,
      oneLiner: matched.brief.replace("[Action]", optionLabel.toLowerCase()),
    };
  }

  return {
    category: "MARKET NEWS",
    headline: `Volatility surge detected under ${eventTitle}`,
    oneLiner: `To stabilize the balance sheet against ongoing macro shifts, we opted to: ${optionLabel}.`,
  };
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
      <SectionTitle
        eyebrow="Analyst Desk"
        title="Executive Reports"
        subtitle={`Composite rating ${grade} · Score ${score}`}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel title="Balance Sheet Snapshot" className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {figs.map(([k, v]) => (
              <div
                key={k}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
              >
                <p className="font-display text-[9px] tracking-widest text-slate-400">
                  {k.toUpperCase()}
                </p>
                <p className="font-display text-xl text-gradient-gold">{v}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Pillar Scores">
          <MetricBars />
        </Panel>

        <Panel
          title="Executive Decision Log"
          icon={<FileText size={16} />}
          className="lg:col-span-3"
        >
          {decisions.length === 0 ? (
            <p className="font-serif italic text-slate-500 py-4">
              No decisions recorded yet. Approach the board to begin addressing
              system threats.
            </p>
          ) : (
            <div className="space-y-3">
              {decisions.map((d, i) => {
                const data = getNewsBasedOneLiner(d.eventTitle, d.optionLabel);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-gold-500/10 bg-navy-950/45 p-4 hover:bg-navy-900/60 transition-all shadow-sm"
                  >
                    <div className="space-y-1.5 flex-1 pr-4">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] tracking-wider">
                        <span className="rounded bg-gold-400/10 px-2 py-0.5 font-display text-[9px] font-bold text-gold-300">
                          {data.category}
                        </span>
                        <span className="font-serif text-slate-400 font-medium">
                          Headline: "{data.headline}"
                        </span>
                      </div>
                      <p className="font-serif text-sm text-slate-200 leading-relaxed">
                        {data.oneLiner}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                      <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        <span className="font-display text-[9px] font-bold tracking-widest text-emerald-400">
                          RESOLVED
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-500">
                        {new Date(d.ts).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
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

  return (
    <div className="h-full overflow-y-auto p-8 md:p-12">
      <SectionTitle
        eyebrow="Preferences"
        title="Settings"
        subtitle="Tune the atmosphere of your war room."
      />
      <div className="max-w-xl space-y-4">
        <Row
          label="Atmosphere"
          value={theme === "day" ? "Day — Sunlit Penthouse" : "Night — Storm"}
          icon={theme === "day" ? <Sun size={18} /> : <Moon size={18} />}
          onClick={toggleTheme}
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

function Row({
  label,
  value,
  icon,
  onClick,
  actionLabel = "TOGGLE ▸",
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  onClick: () => void;
  actionLabel?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl glass p-5 text-left transition-colors hover:border-gold-400/40"
    >
      <div className="flex items-center gap-4">
        <span className="text-gold-300">{icon}</span>
        <div>
          <p className="font-display text-sm tracking-[0.2em] text-gold-100">
            {label.toUpperCase()}
          </p>
          <p className="font-serif text-sm text-slate-400">{value}</p>
        </div>
      </div>
      <span className="font-display text-[10px] tracking-widest text-gold-300">
        {actionLabel}
      </span>
    </button>
  );
}
