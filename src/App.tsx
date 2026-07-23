import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "@/data/store";
import { LeftNav } from "@/components/layout/LeftNav";
import { TopBar } from "@/components/layout/TopBar";
import { OpeningSequence } from "@/components/intro/OpeningSequence";
import { OfficeScene } from "@/components/office/OfficeScene";
import { StrategicBoard } from "@/components/board/StrategicBoard";
import { InvestigationMode } from "@/components/board/InvestigationMode";
import { AthenaView } from "@/components/athena/AthenaView";
import { ScenariosView, WarRoomView } from "@/components/rooms/WarRoomViews";
import { TreasuryVaultView, BoardroomView } from "@/components/rooms/VaultBoardroom";
import { NewsView, ReportsView, SettingsView } from "@/components/rooms/InfoViews";
import type { ViewId } from "@/data/types";

const VIEWS: Record<ViewId, () => JSX.Element> = {
  office: OfficeScene,
  board: StrategicBoard,
  scenarios: ScenariosView,
  warroom: WarRoomView,
  vault: TreasuryVaultView,
  boardroom: BoardroomView,
  news: NewsView,
  reports: ReportsView,
  athena: AthenaView,
  settings: SettingsView,
};

export default function App() {
  const view = useGame((s) => s.view);
  const theme = useGame((s) => s.theme);
  const Current = VIEWS[view];

  return (
    <div
      className={`relative h-screen w-screen overflow-hidden font-sans ${
        theme === "night" ? "bg-navy-950" : "bg-navy-900"
      }`}
    >
      <div className="noise absolute inset-0" />

      <div className="relative z-10 flex h-full">
        <LeftNav />

        <main className="relative flex-1 overflow-hidden">
          <TopBar />
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="h-full w-full"
            >
              <Current />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <InvestigationMode />
      <OpeningSequence />
    </div>
  );
}
