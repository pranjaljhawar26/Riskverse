export type ViewId =
  | "office"
  | "board"
  | "scenarios"
  | "warroom"
  | "vault"
  | "boardroom"
  | "news"
  | "reports"
  | "athena"
  | "settings";

export type ThemeMode = "day" | "night";

export interface Metrics {
  profitability: number;
  risk: number;
  capital: number;
  liquidity: number;
  reputation: number;
  esg: number;
}

export interface BankState {
  cet1: number;
  lcr: number;
  sharePrice: number;
  loanBook: number;
  deposits: number;
  customerConfidence: number;
  esgRating: string;
  mrel: string;
  netProfit?: number;
  creditRiskIndex?: number;
  marketRiskIndex?: number;
  reputationScore?: number;
  esgScore?: number;
}

export type EventCategory =
  | "climate"
  | "financial"
  | "regulatory"
  | "tech"
  | "additional";

export type Severity = "low" | "medium" | "high" | "critical" | "endgame";

export interface KpiImpacts {
  cet1?: number;
  lcr?: number;
  loanBook?: number;
  deposits?: number;
  sharePrice?: number;
  esg?: number;
  esgScore?: number; // <--- Added missing property
  customerConfidence?: number;
  netProfit?: number;
  creditRiskIndex?: number;
  marketRiskIndex?: number;
  reputationScore?: number;
}

export interface DecisionOption {
  id: string;
  label: string;
  description: string;
  effects: Partial<Metrics>;
  bank?: Partial<BankState>;
  athenaNote: string;
}

export interface GameEvent {
  id: string;
  icon: string;
  title: string;
  category: EventCategory;
  severity: Severity;
  probability: number;
  headline: string;
  summary: string;
  narrative: string;
  impacts: string[];
  industries: string[];
  kpiImpacts: KpiImpacts;
  creditImpact: string;
  plImpact: string;
  horizon: string;
  options: DecisionOption[];
}
