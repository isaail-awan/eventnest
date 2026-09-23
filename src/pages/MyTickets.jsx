import { useState } from "react";
import { Link } from "react-router-dom";
import events from "../data/events";
import { shortDate } from "../utils/bookings";
import { IconCalendar, IconTicket } from "../components/Icons";

function getStatus(booking) {
  if (booking.status === "cancelled") return "cancelled";
  const event = events.find((e) => e.id === booking.eventId);
  if (event && event.date < new Date().toISOString().slice(0, 10)) return "past";
  return "upcoming";
}

const statusStyles = {
  upcoming: "bg-sage/10 text-sage",
  past: "bg-accent-soft text-ink-soft",
  cancelled: "bg-red-50 text-red-600",
};
const statusLabels = { upcoming: "Upcoming", past: "Past", cancelled: "Cancelled" };

function TicketCard({ booking, onCancel }) {
  const event = events.find((e) => e.id === booking.eventId);
  const [confirming, setConfirming] = useState(false);
  const status = getStatus(booking);

  if (!event) return null;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center">
      <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-accent-soft">
        <img src={event.image} alt={event.name} onError={(e) => (e.target.style.display = "none")} className="h-full w-full object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <Link to={"/events/" + event.id} className="font-serif text-lg font-semibold text-ink transition hover:text-terracotta">{event.name}</Link>
          <span className={"rounded-full px-2.5 py-0.5 text-xs font-medium " + statusStyles[status]}>{statusLabels[status]}</span>
        </div>
        <p className="mt-1 font-mono text-xs text-ink-soft">{booking.id}</p>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft"><IconCalendar className="h-3.5 w-3.5" />{shortDate(event.date)} · {booking.tierName} × {booking.quantity}</p>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
        <p className="font-serif text-lg font-semibold text-ink">PKR {booking.total.toLocaleString()}</p>
        {status === "upcoming" && (confirming ? (
          <div className="flex gap-2">
            <button onClick={() => onCancel(booking.id)} className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600">Yes, cancel</button>
            <button onClick={() => setConfirming(false)} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:bg-accent-soft">Keep</button>
          </div>
        ) : (
          <button onClick={() => setConfirming(true)} className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50">Cancel</button>
        ))}
      </div>
    </div>
  );
}

export default function MyTickets({ bookings = [], onCancel }) {
  const rows = [...bookings].reverse();
  const upcomingCount = rows.filter((b) => getStatus(b) === "upcoming").length;
  const totalSpent = rows.filter((b) => b.status !== "cancelled").reduce((sum, b) => sum + b.total, 0);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-xs font-medium tracking-[0.25em] text-ink-soft">YOUR ACTIVITY</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">My Tickets</h1>

      {rows.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-border bg-surface py-16 text-center">
          <IconTicket className="mx-auto h-10 w-10 text-ink-soft" />
          <p className="mt-4 font-serif text-xl font-semibold text-ink">No tickets yet</p>
          <p className="mt-2 text-ink-soft">Your booked events will appear here.</p>
          <Link to="/events" className="mt-5 inline-block rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white transition hover:bg-sage-dark active:scale-95">Browse Events</Link>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-border bg-surface p-4 text-center">
              <p className="font-serif text-2xl font-semibold text-ink">{rows.length}</p>
              <p className="mt-1 text-xs text-ink-soft">Total bookings</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 text-center">
              <p className="font-serif text-2xl font-semibold text-ink">{upcomingCount}</p>
              <p className="mt-1 text-xs text-ink-soft">Upcoming</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 text-center">
              <p className="font-serif text-lg font-semibold text-ink sm:text-2xl">PKR {totalSpent.toLocaleString()}</p>
              <p className="mt-1 text-xs text-ink-soft">Total spent</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {rows.map((b) => (
              <TicketCard key={b.id} booking={b} onCancel={onCancel} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}