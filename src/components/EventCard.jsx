import { useState } from "react";
import { Link } from "react-router-dom";
import { IconCalendar, IconMapPin, IconHeart, IconArrowRight } from "./Icons";

function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function EventCard({ event }) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group overflow-hidden rounded-2xl bg-surface shadow-md shadow-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-white/5 dark:shadow-none dark:ring-1 dark:ring-white/10">
      <div className="relative h-44 overflow-hidden bg-accent-soft dark:bg-white/10">
        <Link to={"/events/" + event.id} className="block h-full w-full">
          {!imgError ? (
            <img src={event.image} alt={event.name} onError={() => setImgError(true)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center text-ink-soft dark:text-paper/40"><IconCalendar className="h-8 w-8" /></div>
          )}
        </Link>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink dark:bg-black/50 dark:text-paper">{event.category}</span>

        <button onClick={() => setLiked(!liked)} aria-label="Save event" className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 transition active:scale-90 dark:bg-black/50">
          <IconHeart className="h-4 w-4 text-terracotta" active={liked} />
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper">
          <Link to={"/events/" + event.id} className="transition hover:text-terracotta">{event.name}</Link>
        </h3>

        <div className="mt-3 space-y-1.5 text-sm text-ink-soft dark:text-paper/60">
          <p className="flex items-center gap-2"><IconCalendar className="h-4 w-4" />{formatDate(event.date)}</p>
          <p className="flex items-center gap-2"><IconMapPin className="h-4 w-4" />{event.venue}, {event.city}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="font-medium text-ink dark:text-paper">PKR {event.price.toLocaleString()}</p>
          <Link to={"/events/" + event.id} className="flex items-center gap-1.5 rounded-full bg-sage px-4 py-2 text-sm font-semibold text-white transition hover:bg-sage-dark active:scale-95">
            View Event <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}