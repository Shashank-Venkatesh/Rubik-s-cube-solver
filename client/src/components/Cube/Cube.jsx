import Face from "./Face.jsx";
import { FACE_LABELS, getFaceStickers } from "../../utils/cubeColors";
import { getAffectedStickers } from "../../utils/moveAffectedStickers";

/**
 * Cube.jsx
 * ========
 *
 * Renders all six faces of the cube unfolded into the standard net:
 *
 *         [ U ]
 *     [ L ][ F ][ R ][ B ]
 *         [ D ]
 *
 * A 2D net was chosen over a 3D/WebGL cube (see the project README's
 * "Frontend Architecture" section) because it keeps every sticker
 * visible at once -- useful when the point of the project is watching
 * a *search algorithm* work, not just admiring a rotating cube -- while
 * still leaving room to swap in a 3D renderer later without touching
 * any solver code, since this component only consumes a plain state
 * string and a move name.
 *
 * `activeMove`, when set, highlights the layer of stickers that move
 * currently affects (see utils/moveAffectedStickers.js) -- purely a
 * visual cue synced to the animation the parent is driving.
 */
export default function Cube({ state, activeMove = null, size = "md" }) {
  const affected = getAffectedStickers(activeMove);

  const faceSize = size === "sm" ? "w-24" : size === "lg" ? "w-40" : "w-32";

  const faceEl = (face) => (
    <Face
      stickers={getFaceStickers(state, face)}
      activeIndices={affected[face]}
      label={FACE_LABELS[face]}
      className={faceSize}
    />
  );

  return (
    <div className="inline-grid grid-cols-4 grid-rows-3 gap-2 place-items-center">
      <div className="col-start-2 row-start-1">{faceEl("U")}</div>
      <div className="col-start-1 row-start-2">{faceEl("L")}</div>
      <div className="col-start-2 row-start-2">{faceEl("F")}</div>
      <div className="col-start-3 row-start-2">{faceEl("R")}</div>
      <div className="col-start-4 row-start-2">{faceEl("B")}</div>
      <div className="col-start-2 row-start-3">{faceEl("D")}</div>
    </div>
  );
}
