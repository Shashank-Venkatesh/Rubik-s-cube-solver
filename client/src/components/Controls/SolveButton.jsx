import { FiCpu } from "react-icons/fi";
import Button from "../UI/Button.jsx";

const ALGORITHMS = [
  { value: "bfs", label: "BFS (Phase 3)" },
  { value: "bidirectional_bfs", label: "Bidirectional BFS (Phase 4)" },
  { value: "ida_star", label: "IDA* + heuristic (Phase 5)" },
];

/**
 * SolveButton.jsx
 * ===============
 * Lets the user choose which search algorithm to solve with -- the whole
 * point of this project is comparing them, not hiding the choice behind
 * a single "Solve" button.
 */
export default function SolveButton({ algorithm, onAlgorithmChange, onSolve, disabled, isSolving }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={algorithm}
        onChange={(e) => onAlgorithmChange(e.target.value)}
        disabled={disabled}
        className="rounded-lg border border-surface-border bg-surface-card px-3 py-2 text-sm text-ink outline-none focus:border-ember/60"
      >
        {ALGORITHMS.map((a) => (
          <option key={a.value} value={a.value}>
            {a.label}
          </option>
        ))}
      </select>
      <Button variant="primary" onClick={onSolve} disabled={disabled || isSolving}>
        <FiCpu className={isSolving ? "animate-spin" : ""} />
        {isSolving ? "Searching…" : "Solve"}
      </Button>
    </div>
  );
}
