import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiRotateCcw } from "react-icons/fi";

import Cube from "./components/Cube/Cube.jsx";
import MoveControls from "./components/Controls/MoveControls.jsx";
import ScrambleButton from "./components/Controls/ScrambleButton.jsx";
import SolveButton from "./components/Controls/SolveButton.jsx";
import SolutionViewer from "./components/Solution/SolutionViewer.jsx";
import SearchStats from "./components/Solution/SearchStats.jsx";
import Panel from "./components/UI/Panel.jsx";
import Button from "./components/UI/Button.jsx";
import { useCube } from "./hooks/useCube.js";

export default function App() {
  const cube = useCube();
  const [algorithm, setAlgorithm] = useState("bidirectional_bfs");

  const busy = cube.isSolving || cube.isPlaying;

  return (
    <div className="min-h-screen bg-grid">
      <header className="border-b border-surface-border bg-surface/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-ink">Cube Graph</h1>
            <p className="text-xs text-ink-muted">
              A 3×3 Rubik's Cube solver built on graph & state-space search
            </p>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-ink-faint transition-colors hover:text-ink"
            title="View source"
          >
            <FiGithub size={20} />
          </a>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[auto_1fr]">
        {/* Cube + primary actions */}
        <div className="flex flex-col items-center gap-6">
          <Panel className="flex flex-col items-center gap-6">
            {cube.state ? (
              <motion.div
                key="cube"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <Cube state={cube.state} activeMove={cube.activeMove} />
              </motion.div>
            ) : (
              <div className="flex h-64 w-80 items-center justify-center text-sm text-ink-muted">
                Loading cube…
              </div>
            )}

            <motion.div
              animate={{ opacity: cube.isSolved ? 1 : 0.5 }}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <span
                className={`h-2 w-2 rounded-full ${cube.isSolved ? "bg-emerald-400" : "bg-ember"}`}
              />
              {cube.isSolved ? "Solved" : "Scrambled"}
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <ScrambleButton onScramble={cube.scrambleCube} disabled={busy} />
              <Button variant="ghost" onClick={cube.resetCube} disabled={busy}>
                <FiRotateCcw /> Reset
              </Button>
            </div>
          </Panel>

          <Panel title="Manual Moves" className="w-full">
            <MoveControls onMove={cube.makeMove} disabled={busy} />
          </Panel>
        </div>

        {/* Solver + solution + stats */}
        <div className="flex flex-col gap-6">
          <Panel title="Solve">
            <p className="mb-4 text-sm leading-relaxed text-ink-muted">
              Choose a search algorithm and solve the cube's current state. Each
              algorithm explores the same underlying graph differently -- see the
              stats below to compare how many states each one actually visits.
            </p>
            <SolveButton
              algorithm={algorithm}
              onAlgorithmChange={setAlgorithm}
              onSolve={() => cube.solveCube(algorithm)}
              disabled={busy || cube.isSolved}
              isSolving={cube.isSolving}
            />
            {cube.error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-sm text-cube-R"
              >
                {cube.error}
              </motion.p>
            )}
          </Panel>

          {cube.solution && (
            <SolutionViewer
              solution={cube.solution}
              isPlaying={cube.isPlaying}
              playbackIndex={cube.playbackIndex}
              onPlay={cube.playSolution}
              onStop={cube.stopPlayback}
            />
          )}

          {cube.solution?.stats && <SearchStats stats={cube.solution.stats} />}

          {cube.lastScramble.length > 0 && (
            <Panel title="Last Scramble">
              <div className="flex flex-wrap gap-2">
                {cube.lastScramble.map((move, i) => (
                  <span
                    key={i}
                    className="rounded-md border border-surface-border bg-surface-card px-2.5 py-1 font-mono text-sm text-ink-muted"
                  >
                    {move}
                  </span>
                ))}
              </div>
            </Panel>
          )}
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-xs text-ink-faint">
        Built to learn graphs & state-space search. See the README for the full
        write-up of every algorithm used here.
      </footer>
    </div>
  );
}
