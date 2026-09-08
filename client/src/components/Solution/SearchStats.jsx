import { motion } from "framer-motion";
import Panel from "../UI/Panel.jsx";

const STAT_LABELS = {
  algorithm: "Algorithm",
  nodes_visited: "Nodes visited",
  max_queue_size: "Peak frontier size",
  time_seconds: "Time (s)",
  max_depth_reached: "Depth reached",
};

const ALGORITHM_NOTES = {
  bfs: "Explores every node level-by-level. Guaranteed shortest path, but the frontier grows so fast it's only practical for very shallow scrambles.",
  bidirectional_bfs:
    "Searches from both the scramble and the solved cube at once, meeting in the middle. Same shortest-path guarantee as BFS, at a fraction of the memory.",
  ida_star:
    "Depth-first search guided by an admissible heuristic (misplaced stickers / 20). Uses far less memory than BFS -- notice the frontier size stays at 1.",
};

/**
 * SearchStats.jsx
 * ===============
 * Surfaces the raw numbers behind a solve -- nodes visited, peak
 * frontier/queue size, wall-clock time, and search depth -- so the
 * *cost* of each algorithm is visible, not just its answer. This is the
 * project's "show useful information about the search process"
 * requirement made concrete.
 */
export default function SearchStats({ stats }) {
  if (!stats) return null;

  return (
    <Panel title="Search Statistics">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Object.entries(STAT_LABELS).map(([key, label]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-lg border border-surface-border bg-surface-card px-3 py-2"
          >
            <div className="text-[11px] uppercase tracking-wide text-ink-faint">{label}</div>
            <div className="mt-0.5 font-mono text-sm text-ink">
              {typeof stats[key] === "number" ? stats[key].toLocaleString() : stats[key]}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
        {ALGORITHM_NOTES[stats.algorithm]}
      </p>
    </Panel>
  );
}
