import { AnimatePresence, motion } from "framer-motion";
import { FiPlay, FiSquare } from "react-icons/fi";
import Button from "../UI/Button.jsx";
import Panel from "../UI/Panel.jsx";

/**
 * SolutionViewer.jsx
 * ==================
 * Shows the move sequence returned by /api/cube/solve, animating each
 * move into view (staggered entrance), and highlights whichever move is
 * currently being played back on the cube. Playback itself is driven by
 * useCube's playSolution -- this component is purely presentational.
 */
export default function SolutionViewer({ solution, isPlaying, playbackIndex, onPlay, onStop }) {
  if (!solution) return null;

  return (
    <Panel title="Solution">
      {!solution.solved ? (
        <p className="text-sm text-cube-R">
          No solution found within the search budget for this algorithm.
        </p>
      ) : solution.moves.length === 0 ? (
        <p className="text-sm text-ink-muted">Already solved -- no moves needed.</p>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            <AnimatePresence>
              {solution.moves.map((move, i) => (
                <motion.span
                  key={`${move}-${i}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.035 }}
                  className={`rounded-md border px-2.5 py-1 font-mono text-sm ${
                    i === playbackIndex
                      ? "border-ember bg-ember/15 text-ember-soft"
                      : "border-surface-border bg-surface-card text-ink"
                  }`}
                >
                  {move}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex gap-2">
            {!isPlaying ? (
              <Button variant="primary" onClick={onPlay}>
                <FiPlay /> Animate solution
              </Button>
            ) : (
              <Button variant="danger" onClick={onStop}>
                <FiSquare /> Stop
              </Button>
            )}
          </div>
        </>
      )}
    </Panel>
  );
}
