import { useState } from "react";
import { FiShuffle } from "react-icons/fi";
import Button from "../UI/Button.jsx";

/**
 * ScrambleButton.jsx
 * ==================
 * Lets the user pick how many random moves to scramble with, and warns
 * when they pick a depth that the slower algorithms (BFS especially)
 * won't be able to handle -- see the README's complexity discussion for
 * why these numbers were chosen as the practical cutoffs.
 */
export default function ScrambleButton({ onScramble, disabled }) {
  const [numMoves, setNumMoves] = useState(8);

  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={1}
        max={20}
        value={numMoves}
        onChange={(e) => setNumMoves(Number(e.target.value))}
        className="h-1.5 w-32 cursor-pointer accent-ember"
      />
      <span className="w-14 font-mono text-sm text-ink-muted">{numMoves} moves</span>
      <Button variant="primary" onClick={() => onScramble(numMoves)} disabled={disabled}>
        <FiShuffle /> Scramble
      </Button>
    </div>
  );
}
