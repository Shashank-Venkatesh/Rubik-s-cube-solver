/**
 * moveAffectedStickers.js
 * ========================
 *
 * Purely a *visual* helper: which stickers should flash/pulse while a
 * given move is animating. This intentionally does NOT recompute the
 * real permutation (that's the backend's job, and the source of truth
 * for the actual resulting colors) -- it only needs to be "close enough"
 * to make the turning layer visually obvious on our 2D net layout.
 *
 * Each entry maps a base face letter (U/D/L/R/F/B -- the first character
 * of any move, e.g. "R2" and "R'" both affect the same layer as "R") to
 * the set of (face, sticker-index-within-face) pairs in that layer,
 * matching the same net-unfolding convention used throughout the backend
 * (see backend/app/cube/moves.py's module docstring and
 * backend/tools/derive_moves.py's grid_to_xyz for the authoritative
 * geometric derivation this mirrors).
 */

const ALL_NINE = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const TOP_ROW = [0, 1, 2];
const BOTTOM_ROW = [6, 7, 8];
const LEFT_COL = [0, 3, 6];
const RIGHT_COL = [2, 5, 8];

const AFFECTED_BY_FACE = {
  U: { U: ALL_NINE, F: TOP_ROW, R: TOP_ROW, B: TOP_ROW, L: TOP_ROW },
  D: { D: ALL_NINE, F: BOTTOM_ROW, R: BOTTOM_ROW, B: BOTTOM_ROW, L: BOTTOM_ROW },
  R: { R: ALL_NINE, U: RIGHT_COL, F: RIGHT_COL, D: RIGHT_COL, B: LEFT_COL },
  L: { L: ALL_NINE, U: LEFT_COL, F: LEFT_COL, D: LEFT_COL, B: RIGHT_COL },
  F: { F: ALL_NINE, U: BOTTOM_ROW, R: LEFT_COL, D: TOP_ROW, L: RIGHT_COL },
  B: { B: ALL_NINE, U: TOP_ROW, L: LEFT_COL, D: BOTTOM_ROW, R: RIGHT_COL },
};

/**
 * Given a move like "R", "R'", or "R2", return a map of
 * { faceLetter: Set(sticker indices) } for the stickers that should
 * highlight while it plays. Returns an empty object if `move` is null.
 */
export function getAffectedStickers(move) {
  if (!move) return {};
  const face = move[0];
  const affected = AFFECTED_BY_FACE[face] ?? {};
  return Object.fromEntries(
    Object.entries(affected).map(([f, indices]) => [f, new Set(indices)])
  );
}
