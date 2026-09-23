import { useState, useEffect } from "react";
import { shortDate } from "../utils/bookings";
import { IconCalendar, IconMapPin, IconCheck } from "../components/Icons";

function QrPlaceholder({ value }) {
  // Deterministic fake-QR pattern, seeded from the booking ID (visual only)
  let seed = 0;
  for (let i = 0; i < value.length; i++) seed = (seed * 31 + value.charCodeAt(i)) % 997;
  const cells = Array.from({ length: 64 }, (_, i) => {
    seed = (seed * 1103515245 + 12345) % 233280;
    return seed / 233280 > 0.5;
  });

  return (
    <div className="grid h-28 w-28 grid-cols-8 gap-0.5 rounded-lg border border-border bg-white p-2">
      {cells.map((on, i) => (
        <span key={i} className={"aspect-square rounded-[1px] " + (on ? "bg-ink" : "bg-transparent")} />
      ))}
    </div>
  );
}

export default function BookingConfirmation({ booking, event, onReset }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(booking.id).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <style>{`@media print { body * { visibility: hidden; } #ticket, #ticket * { visibility: visible; } #ticket { position: absolute; left: 0; top: 0; width: 100%; } }`}</style>

      <div id="ticket" className="overflow-hidden rounded-3xl border border-border bg-surface shadow-lg shadow-black/5">
        <div className="border-b border-dashed border-border bg-accent-soft px-8 py-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-white">
            <IconCheck className="h-6 w-6" />
          </span>
          <p className="mt-4 font-serif text-2xl font-semibold text-ink">Registration confirmed</p>
          <p className="mt-1 text-sm text-ink-soft">A confirmation has been sent to {booking.email}</p>
        </div>

        <div className="px-8 py-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-[0.15em] text-ink-soft">BOOKING ID</p>
              <button onClick={handleCopy} className="mt-1 font-mono text-lg font-semibold text-ink transition hover:text-terracotta">
                {booking.id} <span className="ml-1 text-xs font-sans font-normal text-ink-soft">{copied ? "Copied" : "(tap to copy)"}</span>
              </button>
            </div>
            <QrPlaceholder value={booking.id} />
          </div>

          <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
            <div className="flex justify-between"><span className="text-ink-soft">Event</span><span className="font-medium text-ink">{event.name}</span></div>
            <div className="flex justify-between"><span className="text-ink-soft">Date</span><span className="font-medium text-ink">{shortDate(event.date)}, {event.time}</span></div>
            <div className="flex justify-between"><span className="text-ink-soft">Venue</span><span className="font-medium text-ink">{event.venue}, {event.city}</span></div>
            <div className="flex justify-between"><span className="text-ink-soft">Attendee</span><span className="font-medium text-ink">{booking.name}</span></div>
            <div className="flex justify-between"><span className="text-ink-soft">Ticket type</span><span className="font-medium text-ink">{booking.tierName}</span></div>
            <div className="flex justify-between"><span className="text-ink-soft">Quantity</span><span className="font-medium text-ink">{booking.quantity}</span></div>
          </div>

          <div className="mt-6 flex items-baseline justify-between border-t border-border pt-6">
            <span className="text-sm text-ink-soft">Total paid</span>
            <span className="font-serif text-3xl font-semibold text-ink">PKR {booking.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button onClick={() => window.print()} className="rounded-full border border-border px-6 py-3 text-sm font-medium text-ink transition hover:bg-accent-soft">Download Ticket</button>
        <button onClick={onReset} className="rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white transition hover:bg-sage-dark active:scale-95">Browse More Events</button>
      </div>
    </section>
  );
}