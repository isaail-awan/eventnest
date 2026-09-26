import { useState } from "react";
import { STATUS_ORDER, statusLabels, statusStyles, formatDate, formatDateTime } from "../../utils/status";

function exportCsv(rows) {
  const header = ["Booking ID", "Customer", "Email", "Event", "Date", "Quantity", "Total (PKR)", "Status"];
  const quote = (value) => '"' + String(value ?? "").replace(/"/g, '""') + '"';
  const lines = rows.map((r) =>
    [r.id, r.name, r.email, r.event ? r.event.name : "", r.event ? r.event.date : "", r.quantity, r.total, statusLabels[r.status]].map(quote).join(",")
  );
  const csv = [header.map(quote).join(","), ...lines].join("\n");

  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "eventnest-bookings.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function BookingsTable({ rows, onConfirm, onCancel }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [cancelId, setCancelId] = useState(null);

  const query = search.trim().toLowerCase();
  const filtered = rows.filter((r) => {
    const matchesFilter = filter === "all" || r.status === filter;
    const text = [r.id, r.name, r.email, r.event ? r.event.name : ""].join(" ").toLowerCase();
    return matchesFilter && (!query || text.includes(query));
  });

  const filters = ["all", ...STATUS_ORDER];
  const countFor = (key) => (key === "all" ? rows.length : rows.filter((r) => r.status === key).length);

  const handleCancel = (id) => {
    onCancel(id);
    setCancelId(null);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by ID, customer, email or event..." className="min-w-[220px] flex-1 rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-soft focus:border-sage focus:ring-2 focus:ring-sage/20 dark:border-white/10 dark:bg-white/5 dark:text-paper dark:placeholder:text-paper/40" />
        <button onClick={() => exportCsv(filtered)} disabled={filtered.length === 0} className="rounded-full border border-border px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-accent-soft active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-paper dark:hover:bg-white/10">Export CSV</button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={
              "rounded-full px-4 py-1.5 text-sm font-medium transition active:scale-95 " +
              (filter === key ? "bg-sage text-white" : "border border-border text-ink-soft hover:bg-sage/10 hover:text-sage dark:border-white/10 dark:text-paper/60 dark:hover:bg-sage/20 dark:hover:text-sage")
            }
          >
            {key === "all" ? "All" : statusLabels[key]} <span className="opacity-60">{countFor(key)}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface dark:border-white/10 dark:bg-white/5">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wider text-ink-soft dark:border-white/10 dark:text-paper/50">
            <tr>
              <th className="px-4 py-3 font-semibold">Booking</th>
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Event</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Total</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-14 text-center text-ink-soft dark:text-paper/50">
                  <p className="font-serif text-lg font-semibold text-ink dark:text-paper">No bookings found</p>
                  <p className="mt-1">Try a different search or status filter.</p>
                </td>
              </tr>
            ) : (
              filtered.map((r) => {
                const canConfirm = r.status === "pending";
                const canCancel = r.status !== "cancelled";
                const isCancelled = r.status === "cancelled";

                return (
                  <tr key={r.id} className="border-t border-border align-top transition hover:bg-accent-soft/50 dark:border-white/10 dark:hover:bg-white/5">
                    <td className="px-4 py-4 font-mono text-xs text-ink-soft dark:text-paper/50">{r.id}</td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-ink dark:text-paper">{r.name}</p>
                      <p className="mt-0.5 text-xs text-ink-soft dark:text-paper/50">{r.email}</p>
                    </td>
                    <td className="px-4 py-4 text-ink dark:text-paper">{r.event ? r.event.name : "Event"}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-ink dark:text-paper">
                      {r.event ? formatDate(r.event.date) : "-"}
                      <p className="mt-0.5 text-xs text-ink-soft dark:text-paper/50">{r.quantity} ticket(s)</p>
                    </td>
                    <td className={"whitespace-nowrap px-4 py-4 font-semibold " + (isCancelled ? "text-ink-soft line-through dark:text-paper/40" : "text-ink dark:text-paper")}>PKR {r.total.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <span className={"inline-block rounded-full px-3 py-0.5 text-xs font-semibold " + statusStyles[r.status]}>{statusLabels[r.status]}</span>
                      {isCancelled && r.cancelledAt && <p className="mt-2 text-xs text-ink-soft dark:text-paper/50">{formatDateTime(r.cancelledAt)}</p>}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        {cancelId === r.id ? (
                          <>
                            <button onClick={() => handleCancel(r.id)} className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600 active:scale-95">Yes, cancel</button>
                            <button onClick={() => setCancelId(null)} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink transition hover:bg-accent-soft active:scale-95 dark:border-white/10 dark:text-paper dark:hover:bg-white/10">Keep</button>
                          </>
                        ) : (
                          <>
                            {canConfirm && <button onClick={() => onConfirm(r.id)} className="rounded-full bg-sage px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sage-dark active:scale-95">Confirm</button>}
                            {canCancel && <button onClick={() => setCancelId(r.id)} className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 active:scale-95 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10">Cancel</button>}
                            {!canConfirm && !canCancel && <span className="text-ink-soft dark:text-paper/30">-</span>}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-ink-soft dark:text-paper/60">Showing {filtered.length} of {rows.length} bookings</p>
    </div>
  );
}