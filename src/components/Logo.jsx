import { brand } from "../data/brand";

export default function Logo() {
  return (
    <span className="inline-flex items-center gap-3">
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" fill="none">
        <path d="M20 6c3 4 3 9 0 13-3-4-3-9 0-13z" fill="var(--color-ink)" />
        <path d="M9 14c5 1 8 5 8 10-5-1-8-5-8-10z" fill="var(--color-terracotta)" />
        <path d="M31 14c-5 1-8 5-8 10 5-1 8-5 8-10z" fill="var(--color-terracotta)" />
        <path d="M20 34c-6 0-10-3-10-3s2 5 10 5 10-5 10-5-4 3-10 3z" fill="var(--color-sage)" />
      </svg>
      <span className="leading-tight">
        <span className="block font-serif text-xl font-bold text-ink">{brand.name}</span>
        <span className="block text-[11px] tracking-wide text-ink-soft">{brand.tagline}</span>
      </span>
    </span>
  );
}