import { Link } from "react-router-dom";
import { brand } from "../data/brand";
import Logo from "./Logo";
import categories from "../data/categories";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "My Tickets", to: "/tickets" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/"><Logo /></Link>
            <p className="mt-4 max-w-xs text-sm text-ink-soft dark:text-paper/60">
              Discover and book concerts, Qawali nights, weddings and more — all in one beautiful place.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink dark:text-paper">Quick Links</p>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-ink-soft transition hover:text-sage dark:text-paper/60 dark:hover:text-sage">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink dark:text-paper">Categories</p>
            <ul className="mt-4 space-y-2.5">
              {categories.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <Link to={"/events?category=" + encodeURIComponent(c.name)} className="text-sm text-ink-soft transition hover:text-sage dark:text-paper/60 dark:hover:text-sage">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink dark:text-paper">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft dark:text-paper/60">
              <li>{brand.email}</li>
              <li>{brand.phone}</li>
            </ul>

            <div className="mt-5 flex gap-4">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm text-ink-soft transition hover:text-sage dark:text-paper/60 dark:hover:text-sage">{s.label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 dark:border-white/10 sm:flex-row">
          <p className="text-xs text-ink-soft dark:text-paper/50">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p className="text-xs text-ink-soft dark:text-paper/50">Made with care in Pakistan</p>
        </div>
      </div>
    </footer>
  );
}