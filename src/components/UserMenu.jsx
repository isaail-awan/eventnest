import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IconLogOut } from "./Icons";

export default function UserMenu() {
  const { user, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  if (!user) return null;
  const initial = user.name.trim().charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} aria-label="Account menu" className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-sm font-semibold text-white transition hover:bg-sage-dark active:scale-90">{initial}</button>

      {open && (
        <div className="absolute right-0 top-12 w-60 overflow-hidden rounded-xl border border-border bg-surface shadow-lg shadow-black/10 dark:border-white/10 dark:bg-[#242019]">
          <div className="border-b border-border px-4 py-3 dark:border-white/10">
            <div className="flex items-center gap-2">
              <p className="truncate font-serif font-semibold text-ink dark:text-paper">{user.name}</p>
              {isAdmin && <span className="rounded-full bg-terracotta px-2 py-0.5 text-[10px] font-bold text-white">ADMIN</span>}
            </div>
            <p className="truncate text-xs text-ink-soft dark:text-paper/60">{user.email}</p>
          </div>
          {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-terracotta transition hover:bg-accent-soft dark:hover:bg-white/10">Admin dashboard</Link>}
          <Link to="/tickets" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-ink transition hover:bg-accent-soft dark:text-paper dark:hover:bg-white/10">My tickets</Link>
          <button onClick={() => { setOpen(false); logout(); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10">
            <IconLogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      )}
    </div>
  );
}