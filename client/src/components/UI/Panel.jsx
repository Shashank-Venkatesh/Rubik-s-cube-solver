/**
 * Panel.jsx
 * =========
 * A bordered card surface used throughout the app for grouping related
 * controls (move pad, scramble/solve actions, solution viewer, stats).
 */
export default function Panel({ title, children, className = "" }) {
  return (
    <section
      className={`rounded-xl border border-surface-border bg-surface-raised p-5 shadow-panel ${className}`}
    >
      {title && (
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
