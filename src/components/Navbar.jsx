import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";
import useAuth from "../hooks/useAuth";
import { IconSearch, IconMenu, IconClose } from "./Icons";

const links = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "My Tickets", to: "/tickets" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/#contact" },
];

export default function Navbar({ bookingCount = 0, dark, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-20 border-b border-border bg-paper/95 backdrop-blur dark:border-white/10 dark:bg-[#1A1712]/95">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/"><Logo /></Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                onClick={() => setActive(l.label)}
                className={
                  "relative flex items-center gap-1.5 pb-1 text-sm font-medium text-ink transition hover:text-sage dark:text-paper " +
                  (active === l.label ? "text-sage after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:bg-sage after:content-['']" : "")
                }
              >
                {l.label}
                {l.to === "/tickets" && bookingCount > 0 && <span className="rounded-full bg-terracotta px-1.5 py-0.5 text-[10px] font-bold text-white">{bookingCount}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button aria-label="Search" className="hidden h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-accent-soft dark:text-paper dark:hover:bg-white/10 sm:flex">
            <IconSearch />
          </button>

          <ThemeToggle dark={dark} onToggle={onToggleTheme} />

          {user ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login" className="hidden text-sm font-medium text-ink transition hover:text-sage dark:text-paper sm:block">Log in</Link>
              <Link to="/signup" className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-terracotta-dark active:scale-95">Get Started</Link>
            </>
          )}

          <button className="text-ink dark:text-paper lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <ul className="space-y-3 border-t border-border bg-paper px-6 pb-5 pt-4 dark:border-white/10 dark:bg-[#1A1712] lg:hidden">
          {links.map((l) => (
            <li key={l.label}>
              <Link to={l.to} onClick={() => setOpen(false)} className="flex items-center gap-2 py-1 text-ink hover:text-sage dark:text-paper">
                {l.label}
                {l.to === "/tickets" && bookingCount > 0 && <span className="rounded-full bg-terracotta px-1.5 py-0.5 text-[10px] font-bold text-white">{bookingCount}</span>}
              </Link>
            </li>
          ))}
          {!user && (
            <li className="flex gap-3 border-t border-border pt-4 dark:border-white/10">
              <Link to="/login" onClick={() => setOpen(false)} className="flex-1 rounded-full border border-border py-2 text-center font-medium text-ink transition hover:border-sage hover:text-sage dark:border-white/20 dark:text-paper">Log in</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 rounded-full bg-terracotta py-2 text-center font-semibold text-white transition hover:bg-terracotta-dark">Sign up</Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}