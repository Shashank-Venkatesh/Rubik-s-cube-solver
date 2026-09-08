import { useCallback, useEffect, useRef, useState } from "react";
import { cubeApi } from "../services/api";

const ANIMATION_MS = 380;

/**
 * useCube.js
 * ==========
 *
 * Centralizes all cube-related state for the app: the current sticker
 * string, the move currently being animated, the last scramble, and the
 * last solve result. Every component reads from and acts through this
 * one hook rather than calling the API directly, so App.jsx can wire
 * everything together without duplicating fetch logic.
 *
 * Deliberate design choice: the backend is the source of truth for the
 * cube's state (see backend/app/api/routes/cube.py's module docstring).
 * This hook always re-syncs `state` from the API response after any
 * mutating call, rather than trying to duplicate the move-permutation
 * logic in JavaScript. That keeps "what a move does" defined in exactly
 * one place (backend/app/cube/moves.py).
 */
export function useCube() {
  const [state, setState] = useState(null);
  const [isSolved, setIsSolved] = useState(true);
  const [activeMove, setActiveMove] = useState(null);
  const [lastScramble, setLastScramble] = useState([]);
  const [solution, setSolution] = useState(null); // { moves, stats }
  const [isSolving, setIsSolving] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackIndex, setPlaybackIndex] = useState(-1);
  const [error, setError] = useState(null);

  const cancelPlaybackRef = useRef(false);

  const applyResponse = useCallback((data) => {
    setState(data.state);
    setIsSolved(data.is_solved);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const data = await cubeApi.getState();
      applyResponse(data);
    } catch (err) {
      setError(err.message);
    }
  }, [applyResponse]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const flashMove = useCallback((move) => {
    setActiveMove(move);
    window.setTimeout(() => setActiveMove(null), ANIMATION_MS);
  }, []);

  const makeMove = useCallback(
    async (move) => {
      try {
        setError(null);
        flashMove(move);
        const data = await cubeApi.applyMove(move);
        applyResponse(data);
      } catch (err) {
        setError(err.message);
      }
    },
    [applyResponse, flashMove]
  );

  const scrambleCube = useCallback(
    async (numMoves = 8) => {
      try {
        setError(null);
        setSolution(null);
        const data = await cubeApi.scramble(numMoves);
        applyResponse(data);
        setLastScramble(data.moves_applied);
      } catch (err) {
        setError(err.message);
      }
    },
    [applyResponse]
  );

  const resetCube = useCallback(async () => {
    try {
      setError(null);
      cancelPlaybackRef.current = true;
      setIsPlaying(false);
      setSolution(null);
      setLastScramble([]);
      const data = await cubeApi.reset();
      applyResponse(data);
    } catch (err) {
      setError(err.message);
    }
  }, [applyResponse]);

  const solveCube = useCallback(async (algorithm = "bidirectional_bfs") => {
    try {
      setError(null);
      setIsSolving(true);
      setSolution(null);
      const data = await cubeApi.solve(algorithm);
      setSolution(data);
      if (!data.solved) {
        setError(
          `${algorithm} did not find a solution within its search budget. ` +
            "Try a smaller scramble, or a different algorithm -- see the README " +
            "for why each algorithm has different practical limits."
        );
      }
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsSolving(false);
    }
  }, []);

  /** Step through `solution.moves` one at a time, animating each. */
  const playSolution = useCallback(async () => {
    if (!solution?.moves?.length) return;
    cancelPlaybackRef.current = false;
    setIsPlaying(true);

    for (let i = 0; i < solution.moves.length; i++) {
      if (cancelPlaybackRef.current) break;
      setPlaybackIndex(i);
      await makeMove(solution.moves[i]);
      await new Promise((resolve) => window.setTimeout(resolve, ANIMATION_MS + 40));
    }

    setIsPlaying(false);
    setPlaybackIndex(-1);
  }, [solution, makeMove]);

  const stopPlayback = useCallback(() => {
    cancelPlaybackRef.current = true;
    setIsPlaying(false);
    setPlaybackIndex(-1);
  }, []);

  return {
    state,
    isSolved,
    activeMove,
    lastScramble,
    solution,
    isSolving,
    isPlaying,
    playbackIndex,
    error,
    makeMove,
    scrambleCube,
    resetCube,
    solveCube,
    playSolution,
    stopPlayback,
  };
}
