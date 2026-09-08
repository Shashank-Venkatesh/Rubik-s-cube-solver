/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#121316",
          raised: "#1A1C21",
          card: "#1F2127",
          border: "#2B2E36",
        },
        ink: {
          DEFAULT: "#EDEDF1",
          muted: "#9BA0AC",
          faint: "#6B6F7A",
        },
        ember: {
          DEFAULT: "#F2A33A",
          soft: "#F7C377",
          dim: "#8A5A1E",
        },
        // Physical cube sticker colors -- kept separate from the UI
        // accent palette above so the cube itself always reads as a
        // real Rubik's Cube regardless of the app's own theme.
        cube: {
          U: "#F6F6F2", // white
          R: "#C1272D", // red
          F: "#2E7D32", // green
          D: "#F4C20D", // yellow
          L: "#E8720C", // orange
          B: "#1857A4", // blue
        },
      },
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        panel: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
