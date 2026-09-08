import { motion } from "framer-motion";

/**
 * Button.jsx
 * ==========
 * One shared button primitive so every control in the app (move buttons,
 * scramble, solve, reset) shares the same press feedback and disabled
 * styling, instead of re-implementing hover/tap states everywhere.
 */
export default function Button({
  children,
  onClick,
  variant = "default",
  disabled = false,
  className = "",
  title,
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    default: "bg-surface-card border border-surface-border text-ink hover:border-ember/60 hover:text-ember-soft",
    primary: "bg-ember text-surface hover:bg-ember-soft",
    ghost: "text-ink-muted hover:text-ink hover:bg-surface-card",
    danger: "bg-surface-card border border-surface-border text-ink hover:border-cube-R/70 hover:text-cube-R",
  };

  return (
    <motion.button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
