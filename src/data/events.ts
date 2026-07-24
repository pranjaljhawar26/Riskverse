import type { GameEvent } from "./types";

export const EVENTS: GameEvent[] = [
  // 🌲 CLIMATE & ENVIRONMENTAL
  {
    id: "forest-fire-ca",
    icon: "🔥",
    title: "Forest Fire California",
    category: "climate",
    severity: "high",
    probability: 1.0,
    headline: "WILDFIRES CAUSE BILLIONS IN DAMAGE",
    summary:
      "Wildfires spread across Northern California, threatening commercial property and insurers.",
    narrative:
      "Wildfires cause billions in damage; European banks exposed through commercial real estate portfolios.",
    impacts: [
      "Commercial Real Estate Loss",
      "Insurance Claims Surge",
      "CRE Stress Rising",
    ],
    industries: ["Insurance", "Real Estate", "Energy"],
    kpiImpacts: {
      cet1: -0.4,
      lcr: -12,
      loanBook: -3,
      deposits: -1,
      sharePrice: -6.2,
      esg: +3,
      customerConfidence: -2,
      netProfit: -2.1,
      creditRiskIndex: 15,
      marketRiskIndex: 9,
      reputationScore: -8,
    },
    creditImpact: "-€750M",
    plImpact: "-2.1%",
    horizon: "3-4 Quarters",
    options: [
      {
        id: "review-cre",
        label: "Review CRE Portfolio",
        description:
          "Trim commercial real estate book in affected regions and re-hedge counterparty lines.",
        effects: { risk: +8, profitability: -3, reputation: +2, esg: +4 },
        bank: { loanBook: -12, cet1: +0.3 },
        athenaNote:
          "Prudent. We accept a small revenue hit today to protect capital tomorrow.",
      },
      {
        id: "launch-comms",
        label: "Launch Communication",
        description:
          "Front an executive transparency campaign reassuring depositors and key debt holders.",
        effects: { reputation: +8, risk: +4, profitability: -1 },
        bank: { customerConfidence: +6 },
        athenaNote:
          "Clear communication stabilizes public panic. Deposit behavior is normalizing.",
      },
      {
        id: "increase-provisions",
        label: "Increase Provisions",
        description:
          "Execute immediate loss provisioning for potential CRE loan defaults.",
        effects: { capital: +5, profitability: -4, risk: +6 },
        bank: { cet1: +0.2, sharePrice: -1.2 },
        athenaNote: "Regulators will applaud conservative loss provisioning.",
      },
    ],
  },
  {
    id: "earthquake-japan",
    icon: "🌋",
    title: "Earthquake Japan",
    category: "climate",
    severity: "critical",
    probability: 0.8,
    headline: "MAJOR QUAKE HALTS JAPANESE MANUFACTURING & SHIPPING",
    summary:
      "Seismic shock disrupts supply chains and triggers massive underwriting payouts.",
    narrative:
      "Major quake disrupts supply chains; insurers face heavy claims across shipping and tech manufacturing.",
    impacts: [
      "Manufacturing Freeze",
      "Reinsurance Deficits",
      "Shipping Bottlenecks",
    ],
    industries: ["Manufacturing", "Insurance", "Shipping"],
    kpiImpacts: {
      cet1: -0.5,
      lcr: -10,
      loanBook: -2,
      deposits: -1,
      sharePrice: -3.5,
      esg: -1,
      customerConfidence: -3,
      netProfit: -1.8,
    },
    creditImpact: "-€1.2B",
    plImpact: "-2.8%",
    horizon: "2-3 Quarters",
    options: [
      {
        id: "reinsurance-hedge",
        label: "Re-align Reinsurance Syndicates",
        description:
          "Hedge Japanese reinsurance exposure and absorb counterparty claims.",
        effects: { risk: +6, profitability: -2, capital: +3 },
        bank: { cet1: +0.2, sharePrice: -0.8 },
        athenaNote: "Securing claims coverage stabilizes long-term tail risk.",
      },
      {
        id: "supply-credit",
        label: "Extend Trade Credit Lines",
        description:
          "Offer emergency trade credit extensions to impacted manufacturing clients.",
        effects: { profitability: +3, liquidity: -4, reputation: +5 },
        bank: { customerConfidence: +4, loanBook: +8 },
        athenaNote:
          "Supporting corporate clients preserves key international trade relationships.",
      },
    ],
  },
  {
    id: "hurricane-ny",
    icon: "🌀",
    title: "Hurricane New York",
    category: "climate",
    severity: "high",
    probability: 0.75,
    headline: "CATEGORY 4 HURRICANE SLAMS EAST COAST FINANCIAL HUBS",
    summary:
      "Storm surges flood Lower Manhattan infrastructure and commercial real estate.",
    narrative:
      "Storm damages infrastructure; insurance payouts surge and commercial transit halts.",
    impacts: [
      "Transit Paralysis",
      "Property Inundation",
      "Retail Claims Surge",
    ],
    industries: ["Insurance", "Retail", "Transport"],
    kpiImpacts: {
      cet1: -0.3,
      lcr: -8,
      loanBook: -2,
      deposits: -1,
      sharePrice: -2.8,
      esg: -1,
      customerConfidence: -3,
    },
    creditImpact: "-€920M",
    plImpact: "-1.9%",
    horizon: "2 Quarters",
    options: [
      {
        id: "municipal-liquidity",
        label: "Deploy Municipal Rescue Liquidity",
        description:
          "Participate in East Coast municipal infrastructure recovery financing.",
        effects: { liquidity: -6, reputation: +8, esg: +5 },
        bank: { customerConfidence: +5, cet1: -0.1 },
        athenaNote:
          "A high-visibility civic rescue elevates corporate reputation.",
      },
      {
        id: "trim-cre-ny",
        label: "Hedge East Coast CRE Exposure",
        description:
          "Trim commercial real estate debt lines in flood-prone coastal zones.",
        effects: { risk: +8, profitability: -2, capital: +2 },
        bank: { loanBook: -10, cet1: +0.2 },
        athenaNote:
          "Trimming regional property debt insulates against secondary defaults.",
      },
    ],
  },

  // 💰 FINANCIAL & MARKET SHOCKS
  {
    id: "sovereign-default-italy",
    icon: "🏛️",
    title: "Sovereign Debt Default Italy",
    category: "financial",
    severity: "endgame",
    probability: 0.5,
    headline: "ITALIAN DEFAULT SPREADS CONTAGION ACROSS EUROZONE BANKS",
    summary:
      "Italian sovereign debt restructuring forces severe bank bond write-downs.",
    narrative:
      "Italian default triggers Eurozone crisis; banks face massive write-downs on sovereign bond holdings.",
    impacts: [
      "BTP Bond Haircuts",
      "Eurozone Spread Volatility",
      "Interbank Liquidity Lock",
    ],
    industries: ["Government Bonds", "Banking", "Trading"],
    kpiImpacts: {
      cet1: -1.2,
      lcr: -25,
      loanBook: -4,
      deposits: -3,
      sharePrice: -8.5,
      esg: -2,
      customerConfidence: -8,
    },
    creditImpact: "-€4.5B",
    plImpact: "-6.2%",
    horizon: "4-6 Quarters",
    options: [
      {
        id: "restructure-btp",
        label: "Restructure Sovereign Portfolio",
        description:
          "Accept immediate haircuts on Italian sovereign bonds and write off impaired debt.",
        effects: { capital: -8, risk: +10, profitability: -5 },
        bank: { cet1: -0.5, sharePrice: -3.2 },
        athenaNote:
          "Accepting immediate haircuts resets sovereign exposure risk.",
      },
      {
        id: "tap-ecb-ela",
        label: "Tap ECB Emergency Facility",
        description:
          "Access Eurosystem emergency liquidity assistance (ELA) against collateral.",
        effects: { liquidity: +12, reputation: -6, risk: +4 },
        bank: { lcr: +28, customerConfidence: -4 },
        athenaNote:
          "Secures intra-day liquidity, though market stigma lingers.",
      },
    ],
  },
  {
    id: "housing-crash-germany",
    icon: "📉",
    title: "Housing Market Crash Germany",
    category: "financial",
    severity: "critical",
    probability: 0.65,
    headline: "GERMAN PROPERTY BUBBLE BURSTS AS NPLs DOUBLE",
    summary:
      "Plunging residential real estate values drive mortgage default surge in Frankfurt.",
    narrative:
      "Housing bubble bursts; mortgage defaults rise sharply across major European metropolitan portfolios.",
    impacts: [
      "Mortgage Defaults",
      "Developer Insolvencies",
      "Valuation Markdowns",
    ],
    industries: ["Real Estate", "Construction", "Mortgage Banking"],
    kpiImpacts: {
      cet1: -0.6,
      lcr: -14,
      loanBook: -4,
      deposits: -2,
      sharePrice: -4.2,
      customerConfidence: -4,
    },
    creditImpact: "-€2.1B",
    plImpact: "-3.5%",
    horizon: "4 Quarters",
    options: [
      {
        id: "restructure-mortgages",
        label: "Restructure German Mortgage Book",
        description:
          "Offer temporary interest payment deferrals to distressed residential borrowers.",
        effects: { profitability: -4, risk: +8, reputation: +6 },
        bank: { customerConfidence: +5, loanBook: -5 },
        athenaNote:
          "Forgiving payment gaps prevents systemic foreclosure spikes.",
      },
      {
        id: "accelerate-writedowns",
        label: "Accelerate Property Write-downs",
        description:
          "Take conservative upfront NPL write-downs on commercial real estate portfolios.",
        effects: { capital: -6, risk: +10, profitability: -6 },
        bank: { cet1: -0.3, sharePrice: -1.8 },
        athenaNote:
          "Cleaning the balance sheet early instills long-term institutional trust.",
      },
    ],
  },

  // 📡 TECH & SOCIAL DISRUPTIONS
  {
    id: "cyber-attack-global",
    icon: "💻",
    title: "Cyber Attack on Global Payments",
    category: "tech",
    severity: "critical",
    probability: 0.7,
    headline: "RANSOMWARE WAVE DISABLES INTERBANK CLEARING RAILS",
    summary:
      "Coordinated cyber assault halts SWIFT and TARGET2 clearing channels.",
    narrative:
      "State-sponsored cyber attack paralyzes payment clearing houses, causing interbank transaction stalls.",
    impacts: [
      "SWIFT Clearing Stalls",
      "Operational Liquidity Lock",
      "Regulatory Audits",
    ],
    industries: ["Tech", "Payments", "Retail", "Banking"],
    kpiImpacts: {
      cet1: -0.4,
      lcr: -18,
      deposits: -2,
      sharePrice: -3.8,
      customerConfidence: -6,
    },
    creditImpact: "-€850M",
    plImpact: "-1.8%",
    horizon: "1-2 Quarters",
    options: [
      {
        id: "isolate-clearing",
        label: "Isolate Core Clearing Systems",
        description:
          "Take compromised transaction nodes offline and initiate clean restore protocols.",
        effects: { risk: +8, profitability: -4, reputation: -2 },
        bank: { customerConfidence: -3 },
        athenaNote:
          "System isolation halts clearing losses but causes temporary operational friction.",
      },
      {
        id: "zero-trust-upgrade",
        label: "Emergency Zero-Trust SOC Upgrade",
        description:
          "Deploy capital into zero-trust payment security architecture.",
        effects: { risk: +10, capital: -4, reputation: +6 },
        bank: { sharePrice: -0.8, cet1: -0.1 },
        athenaNote:
          "Modernizing payment security establishes an industry operational moat.",
      },
    ],
  },
  {
    id: "social-media-panic",
    icon: "💸",
    title: "Social Media Panic (Bank Run)",
    category: "tech",
    severity: "critical",
    probability: 0.6,
    headline: "VIRAL SOCIAL RUMORS TRIGGER DIGITAL DEPOSIT FLIGHT",
    summary: "Unverified online claims drive rapid mobile deposit outflows.",
    narrative:
      "Social media panic spreads viral rumors regarding treasury losses, sparking digital deposit attrition.",
    impacts: [
      "Digital Deposit Outflow",
      "Wholesale Cost Spike",
      "Reputational Damage",
    ],
    industries: ["Fintech", "Retail", "Banking"],
    kpiImpacts: {
      cet1: -0.3,
      lcr: -20,
      deposits: -5,
      sharePrice: -4.5,
      customerConfidence: -7,
    },
    creditImpact: "-€1.4B",
    plImpact: "-3.4%",
    horizon: "Immediate",
    options: [
      {
        id: "deploy-hqla",
        label: "Deploy HQLA Liquidity Reserves",
        description:
          "Tap Level 1 sovereign bond buffers to satisfy all instant mobile withdrawals.",
        effects: { liquidity: -8, reputation: +6, capital: -2 },
        bank: { deposits: -15, lcr: -12 },
        athenaNote:
          "Demonstrating instant withdrawal fulfillment quells digital panic.",
      },
      {
        id: "reassurance-campaign",
        label: "Executive Reassurance Campaign",
        description:
          "CEO fronts live transparency broadcasts reassuring retail and corporate depositors.",
        effects: { reputation: +10, risk: +4, profitability: -1 },
        bank: { customerConfidence: +8 },
        athenaNote:
          "Direct executive transparency reassures retail and institutional depositors.",
      },
    ],
  },

  // 🏛️ REGULATORY & GOVERNANCE
  {
    id: "basel-iv-impl",
    icon: "📜",
    title: "Basel IV Implementation",
    category: "regulatory",
    severity: "medium",
    probability: 0.9,
    headline: "REGULATORS ENFORCE STRICT CET1 OUTPUT FLOORS",
    summary:
      "Tightened risk-weighted asset floors squeeze commercial bank capital ratios.",
    narrative:
      "Basel IV output floors mandate higher CET1 capital reserves against corporate loan books.",
    impacts: ["RWA Inflation", "Capital Squeeze", "Loan Repricing"],
    industries: ["Banking", "Regulatory", "ESG"],
    kpiImpacts: {
      cet1: -0.3,
      lcr: -5,
      loanBook: -2,
      sharePrice: -1.5,
      customerConfidence: -1,
    },
    creditImpact: "-€400M",
    plImpact: "-0.8%",
    horizon: "4 Quarters",
    options: [
      {
        id: "rebalance-rwa",
        label: "Rebalance RWA Internal Models",
        description:
          "Re-align risk-weighted asset models to satisfy European Banking Authority output floors.",
        effects: { capital: +8, risk: +6, profitability: -3 },
        bank: { cet1: +0.4, loanBook: -8 },
        athenaNote:
          "Aligning corporate portfolios satisfies regulatory capital floors.",
      },
      {
        id: "reprice-lending",
        label: "Reprice Corporate Lending Spreads",
        description:
          "Increase lending rates on capital-intensive corporate loans to absorb regulatory costs.",
        effects: { profitability: +5, reputation: -4, risk: +2 },
        bank: { sharePrice: +1.1 },
        athenaNote:
          "Passes capital costs to corporate borrowers, protecting profit margins.",
      },
      {
        id: "issue-at1",
        label: "Issue Additional Tier 1 Capital",
        description:
          "Issue hybrid AT1 contingent debt instruments to bolster CET1 buffers.",
        effects: { capital: +10, profitability: -4, esg: +2 },
        bank: { cet1: +0.6, sharePrice: -0.5 },
        athenaNote:
          "Substantially boosts CET1 ratios to satisfy supervisory mandates.",
      },
    ],
  },
];
