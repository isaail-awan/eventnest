import events from "../../data/events";

export default function EventsTable({ rows = [] }) {
  const stats = events.map((event) => {
    const own = rows.filter((r) => r.eventId === event.id && r.status !== "cancelled");
    const ticketsSold = own.reduce((sum, r) => sum + r.quantity, 0);
    return { event, count: own.length, ticketsSold, revenue: own.reduce((sum, r) => sum + r.total, 0) };
  });

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface dark:border-white/10 dark:bg-white/5">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-border text-xs uppercase tracking-wider text-ink-soft dark:border-white/10 dark:text-paper/50">
          <tr>
            <th className="px-4 py-3 font-semibold">Event</th>
            <th className="px-4 py-3 font-semibold">Category</th>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 text-right font-semibold">Bookings</th>
            <th className="px-4 py-3 text-right font-semibold">Tickets sold</th>
            <th className="px-4 py-3 text-right font-semibold">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(({ event, count, ticketsSold, revenue }) => (
            <tr key={event.id} className="border-t border-border transition hover:bg-accent-soft/50 dark:border-white/10 dark:hover:bg-white/5">
              <td className="px-4 py-4">
                <p className="font-semibold text-ink dark:text-paper">{event.name}</p>
                <p className="text-xs text-ink-soft dark:text-paper/50">{event.venue}, {event.city}</p>
              </td>
              <td className="px-4 py-4 text-ink dark:text-paper">{event.category}</td>
              <td className="whitespace-nowrap px-4 py-4 text-ink dark:text-paper">{event.date}</td>
              <td className="px-4 py-4 text-right font-semibold text-ink dark:text-paper">{count}</td>
              <td className="px-4 py-4 text-right font-semibold text-ink dark:text-paper">{ticketsSold}</td>
              <td className="whitespace-nowrap px-4 py-4 text-right font-semibold text-ink dark:text-paper">PKR {revenue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}