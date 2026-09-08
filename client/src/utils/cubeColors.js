/**
 * cubeColors.js
 * =============
 *
 * Pure constants describing how a 54-character state string (see the
 * backend's app/cube/moves.py for the authoritative layout) maps onto
 * colors and screen positions. No React, no logic beyond simple lookups --
 * kept here so Cube.jsx / Face.jsx / Sticker.jsx don't repeat it.
 */

// Matches backend/app/cube/state.py FACE_ORDER and the index ranges
// documented in backend/app/cube/moves.py.
export const FACE_ORDER = ["U", "R", "F", "D", "L", "B"];

export const FACE_OFFSET = Object.fromEntries(FACE_ORDER.map((f, i) => [f, i * 9]));

// Tailwind color tokens defined in tailwind.config.js under `cube.*`.
export const FACE_TAILWIND_BG = {
  U: "bg-cube-U",
  R: "bg-cube-R",
  F: "bg-cube-F",
  D: "bg-cube-D",
  L: "bg-cube-L",
  B: "bg-cube-B",
};

export const FACE_LABELS = {
  U: "Up",
  R: "Right",
  F: "Front",
  D: "Down",
  L: "Left",
  B: "Back",
};

/** Extract one face's 9 stickers (row-major) from the 54-char state string. */
export function getFaceStickers(state, face) {
  const offset = FACE_OFFSET[face];
  return state.slice(offset, offset + 9).split("");
}
