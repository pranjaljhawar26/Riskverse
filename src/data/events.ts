import type { GameEvent } from "./types";

/**
 * Starter event set. (Full 9-category catalog intentionally deferred.)
 * These few events are enough to drive the investigation + decision loop.
 */
export const EVENTS: GameEvent[] = [
  {
    id: "california-wildfires",
    icon: "🔥",
    title: "California Wildfires",
    category: "natural",
    severity: "high",
    probability: 1,
    headline: "CALIFORNIA WILDFIRES ESCALATE",
    summary:
      "Wildfires continue to spread across Northern California, threatening commercial districts and straining the regional insurance market.",
    impacts: [
      "Commercial Property Losses",
      "Insurance Claims Surge",
      "Supply Chain Disruption",
      "Hospitality Impact",
      "Higher Refinancing Demand",
    ],
    creditImpact: "-$750m",
    plImpact: "-2.1%",
    horizon: "3-4 Quarters",
    options: [
      {
        id: "hedge",
        label: "Reduce California CRE Exposure",
        description:
          "Trim the commercial real-estate book in affected regions and hedge insurance counterparties.",
        effects: { risk: +8, profitability: -3, reputation: +2, esg: +4 },
        bank: { loanBook: -12, cet1: +0.3 },
        athenaNote:
          "Prudent. We accept a small revenue hit today to protect capital tomorrow.",
      },
      {
        id: "hold",
        label: "Hold the Line",
        description:
          "Maintain positions and rely on existing reinsurance coverage.",
        effects: { risk: -6, profitability: +2, capital: -3 },
        bank: { sharePrice: +1.2, cet1: -0.2 },
        athenaNote:
          "Bold. If the fires abate we win — but our tail risk is now uncomfortably fat.",
      },
      {
        id: "green",
        label: "Launch Climate Resilience Fund",
        description:
          "Pivot capital toward green infrastructure and resilience lending.",
        effects: { esg: +10, reputation: +6, profitability: -2, capital: -2 },
        bank: { customerConfidence: +4 },
        athenaNote:
          "The market will reward the narrative. Ensure substance follows the headline.",
      },
    ],
  },
  {
    id: "cyber-attack",
    icon: "💻",
    title: "Global Cyber Attack",
    category: "technology",
    severity: "critical",
    probability: 0.7,
    headline: "COORDINATED CYBER ASSAULT HITS GLOBAL BANKS",
    summary:
      "A sophisticated ransomware wave is targeting core banking rails across three continents.",
    impacts: ["Operational Losses", "Reputation Damage", "Regulatory Scrutiny"],
    creditImpact: "-$220m",
    plImpact: "-0.9%",
    horizon: "1-2 Quarters",
    options: [
      {
        id: "isolate",
        label: "Isolate & Rebuild Core Systems",
        description: "Take systems offline and restore from clean backups.",
        effects: { risk: +6, reputation: -2, profitability: -4 },
        bank: { customerConfidence: -3 },
        athenaNote: "Downtime hurts, but containment is everything now.",
      },
      {
        id: "invest",
        label: "Emergency Cyber Investment",
        description: "Deploy capital into zero-trust architecture and SOC.",
        effects: { risk: +10, capital: -3, reputation: +4 },
        bank: { sharePrice: -0.8 },
        athenaNote: "We turn a crisis into a moat. Regulators will notice.",
      },
    ],
  },
  {
    id: "deposit-run",
    icon: "💸",
    title: "Deposit Run",
    category: "banking",
    severity: "critical",
    probability: 0.6,
    headline: "SOCIAL MEDIA PANIC TRIGGERS DEPOSIT OUTFLOWS",
    summary:
      "A viral rumour is driving accelerating retail and corporate deposit withdrawals.",
    impacts: ["Treasury Crisis", "Liquidity Stress", "Funding Cost Spike"],
    creditImpact: "-$1.4B",
    plImpact: "-3.4%",
    horizon: "Immediate",
    options: [
      {
        id: "liquidity",
        label: "Deploy Liquidity Buffer",
        description: "Tap HQLA reserves and central bank facilities.",
        effects: { liquidity: -8, reputation: +5, capital: -2 },
        bank: { deposits: -25, lcr: -14 },
        athenaNote: "Show the market our buffers are real. Confidence is oxygen.",
      },
      {
        id: "comms",
        label: "Executive Confidence Campaign",
        description: "CEO fronts a transparency and reassurance offensive.",
        effects: { reputation: +8, risk: +4, profitability: -1 },
        bank: { customerConfidence: +6 },
        athenaNote: "You are the brand now. Steady hands, steady voice.",
      },
    ],
  },
];
