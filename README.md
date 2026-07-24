# 🏦 RISKVERSE AI — Executive War Room

An immersive, cinematic executive strategy **simulation** where you become the CEO
of a global systemically important bank, navigating crises in a living, breathing world.

> Not a dashboard. A AAA-style strategy game UI.

---

## ✨ Experience

- **Cinematic opening sequence** — fade from black, jazz begins, rain, camera pan,
  desk lamp turns on, the poster appears, _BREAKING NEWS_, and Athena leaves a note:
  _"CEO, we have a situation."_
- **Executive Office** — floor-to-ceiling windows, night city skyline, rain on glass,
  warm desk lamp, oak desk, framed poster, awards that appear as you succeed.
- **Strategic Board** — a gigantic detective-style investigation board with sticky
  notes, polaroids, newspaper clippings, red string, and push pins.
- **Investigation Mode** — cinematic camera-zoom into a handwritten Moleskine notebook
  with impacts, credit/P&L estimates, and executive decisions.
- **ATHENA** — an AI advisor who is _not_ a chatbot. She leaves handwritten memos.
- **Rooms** — Scenarios, War Room, Treasury Vault (with an unsealing animation),
  Boardroom (voting simulation), Market News, and Executive Reports.
- **Day / Night** toggle — penthouse growth mode vs. storm-lit war-room mode.
- **Procedural ambience** — jazz piano, rain, thunder & city hum generated with the
  Web Audio API (no external files). Toggle **Sound ON / OFF** (never auto-plays).
- **Executive Score** — a live composite of Profitability, Risk, Capital, Liquidity,
  Reputation and ESG, shown as an elegant badge with a credit-style grade.

## 🛠 Tech Stack

React · TypeScript · Vite · Tailwind CSS · Framer Motion · Zustand · Lucide Icons

Everything runs locally. Single-page application. Fully responsive.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

### ATHENA chat setup

Create a `.env.local` file in this folder and add your API key. This file stays on
your machine and must never be committed.

```env
OPENAI_API_KEY=your_api_key_here
# Optional: defaults to gpt-5.4-mini
OPENAI_MODEL=gpt-5.4-mini
```

ATHENA's local `/api/athena` endpoint runs through the Vite development server, so
use `npm run dev` while developing. In production (Vercel) the same endpoint is served
by the serverless function in [`api/athena.ts`](api/athena.ts). The browser never
receives the API key in either case.

## 🚀 Deployment (Vercel + CI/CD)

Every push to `main` and every pull request runs the
[`CI & Deploy`](.github/workflows/deploy.yml) workflow: it type-checks and builds the
app, then deploys to Vercel — **preview** deployments for PRs and a **production**
deployment for `main`.

**One-time setup:**

1. Create the project on Vercel (`vercel link`, or import the repo in the dashboard).
2. In the Vercel project add the environment variables from `.env.example`
   (`OPENAI_API_KEY`, optionally `OPENAI_MODEL`) for the Production and Preview scopes.
3. In GitHub → repo **Settings → Secrets and variables → Actions**, add three secrets:
   - `VERCEL_TOKEN` — a token from <https://vercel.com/account/tokens>
   - `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` — found in `.vercel/project.json`
     after running `vercel link` locally.

Until those secrets exist the deploy job is skipped (the build check still runs), so
CI stays green.

### Corporate network note
If `npm install` fails behind a proxy / self-signed certificate, try:

```bash
npm config set strict-ssl false
npm install
```

## 📦 Build

```bash
npm run build
npm run preview
```

## 🗂 Project Structure

```
src/
  App.tsx                     # Shell + view routing + transitions
  data/
    types.ts                  # Domain types
    events.ts                 # Scenario catalog (starter set)
    store.ts                  # Zustand game state + scoring
  lib/
    audio.ts                  # Procedural ambience engine
    utils.ts                  # Helpers
  components/
    intro/OpeningSequence.tsx # Cinematic cold-open
    office/OfficeScene.tsx    # Executive office homepage
    board/StrategicBoard.tsx  # Detective investigation board
    board/InvestigationMode.tsx # Moleskine decision notebook
    athena/AthenaView.tsx     # AI advisor memos
    rooms/…                   # Scenarios, War Room, Vault, Boardroom, News, Reports, Settings
    layout/…                  # Left nav + top HUD
    hud/…                     # Score badge + metric bars
    atmosphere/…              # Rain + skyline
```

## 🎮 Extending

The full nine-category scenario deck (Natural, Climate & ESG, Health, Geopolitical,
Economic, Banking, Technology, Regulatory, Black Swan) plugs directly into
`src/data/events.ts` — just add more `GameEvent` objects. The board, scenarios grid,
investigation notebook, scoring and Athena all read from that array automatically.
