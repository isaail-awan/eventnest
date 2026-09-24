import events from "../data/events";
import EventCard from "./EventCard";
import { IconChevronLeft, IconChevronRight } from "./Icons";

export default function FeaturedEvents() {
  return (
    <section id="events" className="px-6 pb-20 pt-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-ink dark:text-paper">Featured Events</h2>
            <p className="mt-1 text-sm text-ink-soft dark:text-paper/60">Handpicked events you shouldn't miss.</p>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button aria-label="Previous" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink transition hover:bg-accent-soft dark:border-white/10 dark:text-paper dark:hover:bg-white/10"><IconChevronLeft /></button>
            <button aria-label="Next" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink transition hover:bg-accent-soft dark:border-white/10 dark:text-paper dark:hover:bg-white/10"><IconChevronRight /></button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </div>
    </section>
  );
}