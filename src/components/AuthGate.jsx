import { Link } from "react-router-dom";
import { IconLock } from "./Icons";

export default function AuthGate({ title, text, state }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8 text-center dark:border-white/10 dark:bg-white/5">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft dark:bg-white/10">
        <IconLock className="h-5 w-5 text-ink-soft dark:text-paper/60" />
      </span>
      <h3 className="mt-5 font-serif text-xl font-semibold text-ink dark:text-paper">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-ink-soft dark:text-paper/60">{text}</p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/login" state={state} className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-terracotta-dark active:scale-95">Log in</Link>
        <Link to="/signup" state={state} className="rounded-full border border-border px-6 py-3 text-sm font-medium text-ink transition hover:bg-accent-soft active:scale-95 dark:border-white/20 dark:text-paper dark:hover:bg-white/10">Create account</Link>
      </div>
    </div>
  );
}