/**
 * api.js
 * ======
 *
 * Thin wrapper around the backend REST API (see backend/app/api/routes/cube.py).
 * Every function here maps 1:1 to an endpoint; no cube logic or state lives
 * here -- that's the backend's job. Components call these functions and get
 * back plain JSON, which useCube.js (the hook) turns into React state.
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.detail ?? `Request to ${path} failed with status ${response.status}`);
  }

  return response.json();
}

export const cubeApi = {
  getState: () => request("/api/cube/state"),

  reset: () => request("/api/cube/reset", { method: "POST" }),

  applyMove: (move) =>
    request("/api/cube/move", { method: "POST", body: JSON.stringify({ move }) }),

  applyMoves: (moves) =>
    request("/api/cube/moves", { method: "POST", body: JSON.stringify({ moves }) }),

  scramble: (numMoves = 8, seed = null) =>
    request("/api/cube/scramble", {
      method: "POST",
      body: JSON.stringify({ num_moves: numMoves, seed }),
    }),

  setState: (state) =>
    request("/api/cube/state", { method: "POST", body: JSON.stringify({ state }) }),

  solve: (algorithm = "bidirectional_bfs", timeLimitSeconds = 10) =>
    request("/api/cube/solve", {
      method: "POST",
      body: JSON.stringify({ algorithm, time_limit_seconds: timeLimitSeconds }),
    }),
};
