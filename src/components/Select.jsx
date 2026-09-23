import { useState, useRef, useEffect } from "react";
import { IconChevronDown, IconCheck } from "./Icons";

export default function Select({ value, onChange, options, className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === value) || options[0];

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

  return (
    <div ref={ref} className={"relative " + className}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-paper px-4 py-3 text-left text-sm text-ink outline-none transition hover:border-sage/50 focus:border-sage focus:ring-2 focus:ring-sage/20"
      >
        <span className="truncate">{selected.label}</span>
        <IconChevronDown className={"h-4 w-4 shrink-0 text-ink-soft transition-transform duration-200 " + (open ? "rotate-180" : "")} />
      </button>

      {open && (
        <ul className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface py-1.5 shadow-lg shadow-black/10">
          {options.map((o) => {
            const isSelected = o.value === value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={
                    "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition " +
                    (isSelected ? "bg-sage/10 text-ink font-medium" : "text-ink-soft hover:bg-accent-soft hover:text-ink")
                  }
                >
                  <span className="truncate">{o.label}</span>
                  {isSelected && <IconCheck className="h-3.5 w-3.5 shrink-0 text-sage" strokeOverride />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}