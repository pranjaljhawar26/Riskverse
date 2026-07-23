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

/** The six pillars that build the Executive Score. */
export interface Metrics {
  profitability: number;
  risk: number;
  capital: number;
  liquidity: number;
  reputation: number;
  esg: number;
}

/** Board-level financial figures (sticky notes). */
export interface BankState {
  cet1: number; // %
  lcr: number; // %
  sharePrice: number; // $
  loanBook: number; // $B
  deposits: number; // $B
  customerConfidence: number; // %
  esgRating: string;
  mrel: string;
}

export type EventCategory =
  | "natural"
  | "climate"
  | "health"
  | "geopolitical"
  | "economic"
  | "banking"
  | "technology"
  | "regulatory"
  | "blackswan";

export type Severity = "low" | "medium" | "high" | "critical" | "endgame";

export interface DecisionOption {
  id: string;
  label: string;
  description: string;
  /** Deltas applied to metrics when chosen. */
  effects: Partial<Metrics>;
  /** Deltas applied to bank figures. */
  bank?: Partial<BankState>;
  /** Athena's reaction to the choice. */
  athenaNote: string;
}

export interface GameEvent {
  id: string;
  icon: string;
  title: string;
  category: EventCategory;
  severity: Severity;
  probability: number; // 0..1 weight
  lateGame?: boolean;
  headline: string;
  summary: string;
  impacts: string[];
  creditImpact: string; // e.g. "-$750m"
  plImpact: string; // e.g. "-2.1%"
  horizon: string; // e.g. "3-4 Quarters"
  options: DecisionOption[];
}
