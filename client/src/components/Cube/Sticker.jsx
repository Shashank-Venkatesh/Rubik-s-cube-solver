import { motion } from "framer-motion";
import { FACE_TAILWIND_BG } from "../../utils/cubeColors";

/**
 * Sticker.jsx
 * ===========
 *
 * The smallest visual unit of the cube: one colored square. Deliberately
 * has zero knowledge of moves, faces, or solving -- it just renders a
 * color and reacts to being told "you're part of the layer that's
 * turning right now" (`isActive`). Keeping animation decoupled from the
 * solver like this is exactly what the project brief asks for: "the
 * animation system should not be tightly coupled to the solver
 * algorithm."
 */
export default function Sticker({ color, isActive }) {
  return (
    <motion.div
      className={`aspect-square rounded-[3px] border border-black/30 ${FACE_TAILWIND_BG[color]}`}
      animate={isActive ? { scale: [1, 0.82, 1], filter: ["brightness(1)", "brightness(1.35)", "brightness(1)"] } : { scale: 1 }}
      transition={{ duration: 0.34, ease: "easeInOut" }}
    />
  );
}
