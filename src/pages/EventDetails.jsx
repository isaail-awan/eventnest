import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import events from "../data/events";
import { getEventDetails } from "../data/eventDetails";
import EventCard from "../components/EventCard";
import CountdownTimer from "../components/CountdownTimer";
import { IconCalendar, IconMapPin, IconArrowRight, IconChevronLeft } from "../components/Icons";

function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-28 text-center">
      <p className="font-serif text-3xl font-semibold text-ink dark:text-paper">Event not found</p>
      <p className="mt-3 text-ink-soft dark:text-paper/60">The event you're looking for doesn't exist or may have been removed.</p>
      <Link to="/events" className="mt-6 inline-block rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white transition hover:bg-sage-dark active:scale-95">Browse all events</Link>
    </section>
  );
}

function MetaItem({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border dark:border-white/10">
        <Icon className="h-3.5 w-3.5 text-ink-soft dark:text-paper/50" />
      </span>
      <span className="text-sm leading-tight text-ink dark:text-paper">{children}</span>
    </div>
  );
}

function EventDetailsView({ event }) {
  const [imgError, setImgError] = useState(false);
  const [tab, setTab] = useState("about");
  const info = getEventDetails(event);
  const [tierId, setTierId] = useState(info.tiers[0].id);
  const selectedTier = info.tiers.find((t) => t.id === tierId);

  useEffect(() => {
    const previous = document.title;
    document.title = event.name + " | EventNest";
    return () => {
      document.title = previous;
    };
  }, [event.name]);

  const similar = events.filter((e) => e.id !== event.id && e.category === event.category).slice(0, 3);

  const tabs = [
    { id: "about", label: "About" },
    { id: "schedule", label: "Schedule" },
    { id: "organizer", label: "Organizer" },
    { id: "venue", label: "Venue" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link to="/events" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition hover:text-ink dark:text-paper/60 dark:hover:text-paper">
        <IconChevronLeft className="h-3.5 w-3.5" /> All events
      </Link>

      <header className="mt-6 max-w-3xl">
        <p className="text-xs font-medium tracking-[0.2em] text-terracotta">{event.category.toUpperCase()}</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.15] text-ink dark:text-paper md:text-5xl">{event.name}</h1>

        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          <MetaItem icon={IconCalendar}>{formatDate(event.date)}<span className="text-ink-soft dark:text-paper/60"> · {event.time}</span></MetaItem>
          <MetaItem icon={IconMapPin}>{event.venue}, {event.city}</MetaItem>
        </div>
      </header>

      <div className="relative mt-8 aspect-[21/9] overflow-hidden rounded-3xl border border-border bg-accent-soft dark:border-white/10 dark:bg-white/5">
        {!imgError ? (
          <img src={event.image} alt={event.name} onError={() => setImgError(true)} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-ink-soft dark:text-paper/40"><IconCalendar className="h-10 w-10" /></div>
        )}
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={
                  "rounded-full px-5 py-2 text-sm font-medium transition active:scale-95 " +
                  (tab === t.id
                    ? "bg-sage text-white"
                    : "border border-border text-ink-soft hover:bg-sage/10 hover:text-sage dark:border-white/10 dark:text-paper/60 dark:hover:bg-sage/20 dark:hover:text-sage")
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {tab === "about" && (
              <p className="max-w-2xl font-serif text-xl italic leading-relaxed text-ink dark:text-paper">{info.description}</p>
            )}

            {tab === "schedule" && (
              <ol className="max-w-xl space-y-0">
                {info.schedule.map((s, i) => (
                  <li key={i} className="flex gap-5 border-t border-border py-4 first:border-t-0 dark:border-white/10">
                    <span className="w-20 shrink-0 font-serif text-lg font-semibold text-ink dark:text-paper">{s.time}</span>
                    <span className="pt-0.5 text-ink-soft dark:text-paper/60">{s.label}</span>
                  </li>
                ))}
              </ol>
            )}

            {tab === "organizer" && (
              <div className="max-w-md rounded-2xl border border-border bg-surface p-6 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-medium tracking-[0.15em] text-ink-soft dark:text-paper/50">ORGANIZED BY</p>
                <p className="mt-2 font-serif text-xl font-semibold text-ink dark:text-paper">{info.organizer.name}</p>
                <p className="mt-1 text-sm text-ink-soft dark:text-paper/60">{info.organizer.email}</p>
              </div>
            )}

            {tab === "venue" && (
              <div className="max-w-md rounded-2xl border border-border bg-surface p-6 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border dark:border-white/10"><IconMapPin className="h-4 w-4 text-ink-soft dark:text-paper/50" /></span>
                  <div>
                    <p className="font-serif text-lg font-semibold text-ink dark:text-paper">{event.venue}</p>
                    <p className="mt-0.5 text-sm text-ink-soft dark:text-paper/60">{event.city}, Pakistan</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <CountdownTimer date={event.date} time={event.time} />

          <div className="sticky top-28 rounded-2xl border border-border bg-surface p-6 shadow-sm shadow-black/5 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-medium tracking-[0.15em] text-ink-soft dark:text-paper/50">SELECT TICKET</p>

            <div className="mt-4 space-y-2.5">
              {info.tiers.map((t) => {
                const isSelected = tierId === t.id;
                return (
                  <label
                    key={t.id}
                    className={
                      "flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3.5 transition " +
                      (isSelected ? "border-sage bg-sage/[0.06]" : "border-border hover:border-ink-soft/40 dark:border-white/10 dark:hover:border-white/30")
                    }
                  >
                    <span className="flex items-center gap-3">
                      <input type="radio" name="tier" checked={isSelected} onChange={() => setTierId(t.id)} className="sr-only" />
                      <span className={"flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] " + (isSelected ? "border-sage" : "border-border dark:border-white/20")}>
                        {isSelected && <span className="h-2 w-2 rounded-full bg-sage" />}
                      </span>
                      <span className="text-sm font-medium text-ink dark:text-paper">{t.name}</span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-ink dark:text-paper">PKR {t.price.toLocaleString()}</span>
                  </label>
                );
              })}
            </div>

            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5 dark:border-white/10">
              <span className="text-sm text-ink-soft dark:text-paper/60">Total per ticket</span>
              <span className="font-serif text-2xl font-semibold text-ink dark:text-paper">PKR {selectedTier.price.toLocaleString()}</span>
            </div>

            <Link
              to={"/book/" + event.id}
              state={{ tierId }}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-terracotta-dark active:scale-[0.98]"
            >
              Get Tickets <IconArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-3 text-center text-xs text-ink-soft dark:text-paper/50">Free cancellation up to 48 hours before the event</p>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="mt-20 border-t border-border pt-12 dark:border-white/10">
          <p className="text-xs font-medium tracking-[0.2em] text-ink-soft dark:text-paper/50">YOU MAY ALSO LIKE</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-ink dark:text-paper">Similar Events</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EventDetails() {
  const { id } = useParams();
  const event = events.find((e) => String(e.id) === id);

  if (!event) return <NotFound />;

  return <EventDetailsView key={event.id} event={event} />;
}