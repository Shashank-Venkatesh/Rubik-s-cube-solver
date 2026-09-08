import Button from "../UI/Button.jsx";

const FACES = ["U", "D", "L", "R", "F", "B"];
const SUFFIXES = ["", "'", "2"];

/**
 * MoveControls.jsx
 * ================
 * One button per legal move (18 total: each of the 6 faces, times
 * clockwise / counter-clockwise / double turn). Grouped by face so the
 * three variants of the same face turn sit together.
 */
export default function MoveControls({ onMove, disabled }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {FACES.map((face) =>
        SUFFIXES.map((suffix) => {
          const move = face + suffix;
          return (
            <Button
              key={move}
              onClick={() => onMove(move)}
              disabled={disabled}
              className="font-mono !px-0 w-full"
              title={`Turn ${face} ${suffix === "'" ? "counter-clockwise" : suffix === "2" ? "180°" : "clockwise"}`}
            >
              {move}
            </Button>
          );
        })
      )}
    </div>
  );
}
