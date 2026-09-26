import { useState } from "react";
import { formatDate } from "../../utils/status";

export default function CustomersTable({ customers = [], rows = [] }) {
  const [search, setSearch] = useState("");

  const list = customers.map((c) => {
    const own = rows.filter((r) => r.userId === c.id);
    const spent = own.filter((r) => r.status !== "cancelled").reduce((sum, r) => sum + r.total, 0);
    return { ...c, bookingCount: own.length, spent };
  });

  const query = search.trim().toLowerCase();
  const filtered = list.filter((c) => !query || (c.name + " " + c.email + " " + c.phone).toLowerCase().includes(query));

  return (
    <div>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email or phone..." className="w-full max-w-md rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-soft focus:border-sage focus:ring-2 focus:ring-sage/20 dark:border-white/10 dark:bg-white/5 dark:text-paper dark:placeholder:text-paper/40" />

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface dark:border-white/10 dark:bg-white/5">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wider text-ink-soft dark:border-white/10 dark:text-paper/50">
            <tr>
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Joined</th>
              <th className="px-4 py-3 text-right font-semibold">Bookings</th>
              <th className="px-4 py-3 text-right font-semibold">Total spent</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-14 text-center text-ink-soft dark:text-paper/50">
                  <p className="font-serif text-lg font-semibold text-ink dark:text-paper">{customers.length === 0 ? "No customers yet" : "No customers found"}</p>
                  <p className="mt-1">{customers.length === 0 ? "Registered accounts will appear here." : "Try a different search."}</p>
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="border-t border-border transition hover:bg-accent-soft/50 dark:border-white/10 dark:hover:bg-white/5">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage text-sm font-bold text-white">{c.name.trim().charAt(0).toUpperCase()}</span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-ink dark:text-paper">{c.name}</p>
                        <p className="truncate text-xs text-ink-soft dark:text-paper/50">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-ink dark:text-paper">{c.phone || "-"}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-ink dark:text-paper">{c.createdAt ? formatDate(c.createdAt.slice(0, 10)) : "-"}</td>
                  <td className="px-4 py-4 text-right font-semibold text-ink dark:text-paper">{c.bookingCount}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-right font-semibold text-ink dark:text-paper">PKR {c.spent.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-ink-soft dark:text-paper/60">{filtered.length} {filtered.length === 1 ? "customer" : "customers"}</p>
    </div>
  );
}