import events from "../../data/events";
import Reveal from "../Reveal";
import { formatDate, STATUS_ORDER, statusLabels, statusDots } from "../../utils/status";

function StatCard({ label, value, hint, valueClass = "text-ink dark:text-paper" }) {
  return (
    <div className="h-full rounded-2xl border border-border bg-surface p-5 dark:border-white/10 dark:bg-white/5">
      <p className="text-sm font-medium text-ink-soft dark:text-paper/60">{label}</p>
      <p className={"mt-2 font-serif text-2xl font-semibold md:text-3xl " + valueClass}>{value}</p>
      <p className="mt-1 text-xs text-ink-soft dark:text-paper/50">{hint}</p>
    </div>
  );
}

export default function Overview({ rows, customerCount, onConfirm, onOpenBookings }) {
  const live = rows.filter((r) => r.status !== "cancelled");
  const revenue = live.reduce((sum, r) => sum + r.total, 0);
  const pending = rows.filter((r) => r.status === "pending");
  const cancelledCount = rows.length - live.length;

  const revenueByEvent = events
    .map((event) => {
      const own = live.filter((r) => r.eventId === event.id);
      return { event, count: own.length, revenue: own.reduce((sum, r) => sum + r.total, 0) };
    })
    .filter((x) => x.revenue > 0)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
  const maxRevenue = revenueByEvent.length > 0 ? revenueByEvent[0].revenue : 0;

  const statusCounts = STATUS_ORDER.map((key) => ({ key, count: rows.filter((r) => r.status === key).length }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Reveal animation="zoom" className="h-full"><StatCard label="Expected revenue" value={"PKR " + revenue.toLocaleString()} hint="Excludes cancelled bookings" /></Reveal>
        <Reveal animation="zoom" delay={80} className="h-full"><StatCard label="Total bookings" value={rows.length} hint={cancelledCount + " cancelled"} /></Reveal>
        <Reveal animation="zoom" delay={160} className="h-full"><StatCard label="Pending confirmation" value={pending.length} hint="Waiting for your approval" valueClass="text-terracotta" /></Reveal>
        <Reveal animation="zoom" delay={240} className="h-full"><StatCard label="Customers" value={customerCount} hint="Registered accounts" /></Reveal>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal className="h-full">
          <div className="h-full rounded-2xl border border-border bg-surface p-6 dark:border-white/10 dark:bg-white/5">
            <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper">Revenue by event</h2>
            <p className="mt-1 text-sm text-ink-soft dark:text-paper/60">Top events by booked value</p>

            {revenueByEvent.length === 0 ? (
              <p className="mt-8 rounded-xl bg-accent-soft py-8 text-center text-sm text-ink-soft dark:bg-white/5 dark:text-paper/50">No revenue yet.</p>
            ) : (
              <ul className="mt-6 space-y-5">
                {revenueByEvent.map((x) => (
                  <li key={x.event.id}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="truncate font-medium text-ink dark:text-paper">{x.event.name}</span>
                      <span className="shrink-0 font-semibold text-ink dark:text-paper">PKR {x.revenue.toLocaleString()}</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-accent-soft dark:bg-white/10">
                      <div className="h-full rounded-full bg-terracotta transition-all duration-700" style={{ width: (x.revenue / maxRevenue) * 100 + "%" }} />
                    </div>
                    <p className="mt-1 text-xs text-ink-soft dark:text-paper/50">{x.count} {x.count === 1 ? "booking" : "bookings"}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>

        <Reveal delay={100} className="h-full">
          <div className="h-full rounded-2xl border border-border bg-surface p-6 dark:border-white/10 dark:bg-white/5">
            <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper">Bookings by status</h2>
            <p className="mt-1 text-sm text-ink-soft dark:text-paper/60">How all bookings are distributed</p>

            {rows.length === 0 ? (
              <p className="mt-8 rounded-xl bg-accent-soft py-8 text-center text-sm text-ink-soft dark:bg-white/5 dark:text-paper/50">No bookings yet.</p>
            ) : (
              <>
                <div className="mt-6 flex h-4 overflow-hidden rounded-full bg-accent-soft dark:bg-white/10">
                  {statusCounts.filter((s) => s.count > 0).map((s) => (
                    <div key={s.key} className={"h-full transition-all duration-700 " + statusDots[s.key]} style={{ width: (s.count / rows.length) * 100 + "%" }} title={statusLabels[s.key] + ": " + s.count} />
                  ))}
                </div>

                <ul className="mt-6 grid grid-cols-1 gap-3">
                  {statusCounts.map((s) => (
                    <li key={s.key} className="flex items-center justify-between gap-3 text-sm">
                      <span className="flex items-center gap-2 text-ink-soft dark:text-paper/60"><span className={"h-2.5 w-2.5 rounded-full " + statusDots[s.key]} />{statusLabels[s.key]}</span>
                      <span className="font-semibold text-ink dark:text-paper">{s.count}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="rounded-2xl border border-border bg-surface p-6 dark:border-white/10 dark:bg-white/5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper">Awaiting confirmation</h2>
              <p className="mt-1 text-sm text-ink-soft dark:text-paper/60">New booking requests that need your approval</p>
            </div>
            <button onClick={onOpenBookings} className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink transition hover:bg-accent-soft active:scale-95 dark:border-white/10 dark:text-paper dark:hover:bg-white/10">View all bookings</button>
          </div>

          {pending.length === 0 ? (
            <p className="mt-6 rounded-xl bg-accent-soft py-8 text-center text-sm text-ink-soft dark:bg-white/5 dark:text-paper/50">All caught up. No pending requests.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border dark:divide-white/10">
              {pending.slice(0, 5).map((r) => (
                <li key={r.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink dark:text-paper">{r.event ? r.event.name : "Event"} <span className="ml-2 font-mono text-xs font-normal text-ink-soft dark:text-paper/40">{r.id}</span></p>
                    <p className="mt-1 text-sm text-ink-soft dark:text-paper/60">{r.name}, {formatDate(r.event ? r.event.date : "")}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-ink dark:text-paper">PKR {r.total.toLocaleString()}</span>
                    <button onClick={() => onConfirm(r.id)} className="rounded-full bg-sage px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-sage-dark active:scale-95">Confirm</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>
    </div>
  );
}