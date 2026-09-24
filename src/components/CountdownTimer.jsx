import { useState, useEffect } from "react";
import { IconTicket } from "./Icons";

function getTimeLeft(targetIso) {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) return null;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return { days, hours, minutes, seconds };
}

function Unit({ value, label, pulse = false }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        key={value}
        className={
          "relative flex h-16 w-full items-center justify-center overflow-hidden rounded-xl border border-terracotta/25 bg-gradient-to-b from-accent-soft to-surface shadow-sm dark:border-terracotta/30 dark:from-white/10 dark:to-white/5 " +
          (pulse ? "animate-tick" : "")
        }
      >
        <span className="absolute inset-x-0 top-1/2 h-px bg-terracotta/15" />
        <span className="font-serif text-2xl font-semibold tabular-nums text-ink dark:text-paper md:text-3xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-soft dark:text-paper/50">{label}</span>
    </div>
  );
}

export default function CountdownTimer({ date, time }) {
  const targetIso = date + "T" + (time || "00:00") + ":00";
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetIso));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetIso));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetIso]);

  if (!timeLeft) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 dark:border-white/10 dark:bg-white/5">
        <IconTicket className="h-5 w-5 shrink-0 text-ink-soft dark:text-paper/50" />
        <p className="text-sm font-medium text-ink-soft dark:text-paper/60">This event has already started or ended.</p>
      </div>
    );
  }

  const isSoon = timeLeft.days === 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-terracotta/20 bg-surface p-5 dark:border-terracotta/25 dark:bg-white/5">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-terracotta/10 blur-2xl" />

      <p className="relative mb-4 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
        <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
        {isSoon ? "Happening today" : "Event starts in"}
      </p>

      <div className="relative grid grid-cols-4 gap-2.5">
        <Unit value={timeLeft.days} label="Days" />
        <Unit value={timeLeft.hours} label="Hrs" />
        <Unit value={timeLeft.minutes} label="Min" />
        <Unit value={timeLeft.seconds} label="Sec" pulse />
      </div>
    </div>
  );
}