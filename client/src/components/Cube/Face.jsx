import Sticker from "./Sticker.jsx";

/**
 * Face.jsx
 * ========
 *
 * Renders one face of the cube as a 3x3 grid of Stickers. `stickers` is
 * always a 9-character array in row-major order (top-left to
 * bottom-right), matching exactly the slice of the backend's 54-char
 * state string for this face (see utils/cubeColors.js's
 * getFaceStickers).
 */
export default function Face({ stickers, activeIndices, label, className = "" }) {
  return (
    <div
      className={`grid grid-cols-3 gap-[3px] rounded-md bg-black/50 p-[3px] shadow-inner ${className}`}
      title={label}
    >
      {stickers.map((color, i) => (
        <Sticker key={i} color={color} isActive={activeIndices?.has(i) ?? false} />
      ))}
    </div>
  );
}
