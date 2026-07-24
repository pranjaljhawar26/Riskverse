import { create } from "zustand";
import type {
  BankState,
  DecisionOption,
  GameEvent,
  Metrics,
  ThemeMode,
  ViewId,
} from "./types";
import { EVENTS } from "./events";
import { clamp } from "@/lib/utils";

export interface AthenaNote {
  id: string;
  title: string;
  body: string;
  tone: "info" | "warning" | "positive";
  ts: number;
}

export interface Decision {
  eventTitle: string;
  optionLabel: string;
  ts: number;
}

interface GameState {
  // shell
  view: ViewId;
  theme: ThemeMode;
  soundOn: boolean;
  introDone: boolean;
  loginDone: boolean;
  userRole: string;
  userEmail: string;
  setView: (v: ViewId) => void;
  toggleTheme: () => void;
  toggleSound: () => void;
  finishIntro: () => void;
  finishLogin: (role: string, email: string) => void;
  logout: () => void;

  // metrics + bank
  metrics: Metrics;
  bank: BankState;

  // events
  events: GameEvent[];
  activeEventId: string | null;
  investigating: boolean;
  openInvestigation: (id: string) => void;
  closeInvestigation: () => void;
  resolveDecision: (event: GameEvent, option: DecisionOption) => void;

  // athena + history
  athenaNotes: AthenaNote[];
  decisions: Decision[];
  pushAthena: (n: Omit<AthenaNote, "id" | "ts">) => void;

  // score
  score: () => number;
  grade: () => string;
  mood: () => "calm" | "tense" | "crisis";
}

const initialMetrics: Metrics = {
  profitability: 72,
  risk: 64,
  capital: 78,
  liquidity: 81,
  reputation: 75,
  esg: 68,
};

const initialBank: BankState = {
  cet1: 14.3,
  lcr: 152,
  sharePrice: 102.45,
  loanBook: 780,
  deposits: 650,
  customerConfidence: 82,
  esgRating: "AA",
  mrel: "Above Target",
};

export const useGame = create<GameState>((set, get) => ({
  view: "office",
  theme: "night",
  soundOn: false,
  introDone: false,
  loginDone: false,
  userRole: "",
  userEmail: "",
  setView: (view) => set({ view }),
  toggleTheme: () =>
    set((s) => ({ theme: s.theme === "night" ? "day" : "night" })),
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  finishIntro: () => set({ introDone: true }),
  finishLogin: (role, email) =>
    set((s) => ({
      loginDone: true,
      userRole: role,
      userEmail: email,
      athenaNotes: [
        {
          id: "seed-1",
          title: `${role}, we have a situation.`,
          body: "Climate exposure is increasing. Review the California CRE portfolio before the board convenes.",
          tone: "warning",
          ts: Date.now(),
        },
      ],
    })),
  logout: () =>
    set({
      introDone: false,
      loginDone: false,
      userRole: "",
      userEmail: "",
      view: "office",
      athenaNotes: [],
    }),

  metrics: { ...initialMetrics },
  bank: { ...initialBank },

  events: EVENTS,
  activeEventId: null,
  investigating: false,
  openInvestigation: (id) => set({ activeEventId: id, investigating: true }),
  closeInvestigation: () => set({ investigating: false }),

  resolveDecision: (event, option) => {
    set((s) => {
      const metrics = { ...s.metrics };
      (Object.keys(option.effects) as (keyof Metrics)[]).forEach((k) => {
        metrics[k] = clamp((metrics[k] ?? 0) + (option.effects[k] ?? 0));
      });

      const bank = { ...s.bank };
      if (option.bank) {
        (Object.keys(option.bank) as (keyof BankState)[]).forEach((k) => {
          const cur = bank[k];
          const delta = option.bank![k];
          if (typeof cur === "number" && typeof delta === "number") {
            (bank[k] as number) = +(cur + delta).toFixed(2);
          }
        });
      }

      const decision: Decision = {
        eventTitle: event.title,
        optionLabel: option.label,
        ts: Date.now(),
      };

      const note: AthenaNote = {
        id: crypto.randomUUID(),
        title: `Re: ${event.title}`,
        body: option.athenaNote,
        tone:
          (option.effects.reputation ?? 0) + (option.effects.esg ?? 0) >= 6
            ? "positive"
            : "info",
        ts: Date.now(),
      };

      return {
        metrics,
        bank,
        investigating: false,
        activeEventId: null,
        decisions: [decision, ...s.decisions],
        athenaNotes: [note, ...s.athenaNotes],
      };
    });
  },

  athenaNotes: [],
  decisions: [],
  pushAthena: (n) =>
    set((s) => ({
      athenaNotes: [
        { ...n, id: crypto.randomUUID(), ts: Date.now() },
        ...s.athenaNotes,
      ],
    })),

  score: () => {
    const m = get().metrics;
    const raw =
      m.profitability * 0.2 +
      m.risk * 0.2 +
      m.capital * 0.18 +
      m.liquidity * 0.17 +
      m.reputation * 0.13 +
      m.esg * 0.12;
    return Math.round(raw);
  },

  grade: () => {
    const s = get().score();
    if (s >= 85) return "AAA";
    if (s >= 78) return "AA";
    if (s >= 70) return "A";
    if (s >= 60) return "BBB";
    if (s >= 50) return "BB";
    return "B";
  },

  mood: () => {
    const m = get().metrics;
    const events = get().events;
    const decisions = get().decisions;

    // Track unresolved events
    const resolvedTitles = new Set(decisions.map((d) => d.eventTitle));
    const unresolvedEvents = events.filter((e) => !resolvedTitles.has(e.title));

    // Check if any critical / endgame / high severity threats exist
    const hasCriticalThreat = unresolvedEvents.some(
      (e) =>
        e.severity === "critical" ||
        e.severity === "endgame" ||
        e.severity === "high",
    );

    const avg = (m.risk + m.capital + m.liquidity + m.reputation) / 4;

    // Escalate mood to 'crisis' if active critical threats exist or average metrics are low
    if (unresolvedEvents.length >= 3 || hasCriticalThreat || avg < 55) {
      return "crisis";
    }
    if (unresolvedEvents.length > 0 || avg < 68) {
      return "tense";
    }
    return "calm";
  },
}));
