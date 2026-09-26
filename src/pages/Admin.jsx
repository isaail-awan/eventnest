import { useState } from "react";
import { Link } from "react-router-dom";
import events from "../data/events";
import useAuth from "../hooks/useAuth";
import { ADMIN_EMAIL, ADMIN_DEMO_PASSWORD } from "../data/adminAccount";
import { getStatus } from "../utils/status";
import { IconLock, IconShield } from "../components/Icons";
import Overview from "../components/admin/Overview";
import BookingsTable from "../components/admin/BookingsTable";
import CustomersTable from "../components/admin/CustomersTable";
import EventsTable from "../components/admin/EventsTable";

function GateCard({ icon: Icon, title, children }) {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="anim-fade-up mx-auto max-w-lg rounded-3xl border border-border bg-surface p-8 text-center shadow-lg shadow-black/5 dark:border-white/10 dark:bg-white/5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft dark:bg-white/10">
          <Icon className="h-6 w-6 text-terracotta" />
        </div>
        <h1 className="mt-5 font-serif text-2xl font-semibold text-ink dark:text-paper">{title}</h1>
        {children}
      </div>
    </section>
  );
}

export default function Admin({ bookings = [], onConfirm, onCancel }) {
  const { user, isAdmin, customers } = useAuth();
  const [tab, setTab] = useState("overview");

  if (!user) {
    return (
      <GateCard icon={IconLock} title="Admin access only">
        <p className="mt-2 text-ink-soft dark:text-paper/60">Log in with the admin account to manage bookings, customers and events.</p>

        <div className="mt-6 rounded-xl bg-accent-soft p-4 text-left text-sm dark:bg-white/5">
          <p className="font-semibold text-ink dark:text-paper">Demo admin account</p>
          <p className="mt-2 text-ink-soft dark:text-paper/60">Email: <span className="font-mono text-ink dark:text-paper">{ADMIN_EMAIL}</span></p>
          <p className="text-ink-soft dark:text-paper/60">Password: <span className="font-mono text-ink dark:text-paper">{ADMIN_DEMO_PASSWORD}</span></p>
        </div>

        <Link to="/login" state={{ from: "/admin" }} className="mt-6 inline-block rounded-full bg-terracotta px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-terracotta-dark active:scale-95">Log in as admin</Link>
      </GateCard>
    );
  }

  if (!isAdmin) {
    return (
      <GateCard icon={IconShield} title="Access denied">
        <p className="mt-2 text-ink-soft dark:text-paper/60">This page is only for administrators. Please log out and sign in with the admin account.</p>
        <Link to="/" className="mt-6 inline-block rounded-full border border-border px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent-soft active:scale-95 dark:border-white/10 dark:text-paper dark:hover:bg-white/10">Back to home</Link>
      </GateCard>
    );
  }

  const rows = [...bookings].reverse().map((b) => {
    const event = events.find((e) => e.id === b.eventId);
    return { ...b, event, status: getStatus(b) };
  });

  const pendingCount = rows.filter((r) => r.status === "pending").length;

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "bookings", label: "Bookings", badge: pendingCount },
    { key: "customers", label: "Customers" },
    { key: "events", label: "Events" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Admin</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-ink dark:text-paper md:text-4xl">Dashboard</h1>
          <p className="mt-2 text-ink-soft dark:text-paper/60">Signed in as {user.name}</p>
        </div>
        <Link to="/" className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink transition hover:bg-accent-soft active:scale-95 dark:border-white/10 dark:text-paper dark:hover:bg-white/10">Back to website</Link>
      </div>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={
              "flex shrink-0 items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition active:scale-95 " +
              (tab === t.key ? "bg-sage text-white" : "border border-border text-ink-soft hover:bg-accent-soft dark:border-white/10 dark:text-paper/60 dark:hover:bg-white/10")
            }
          >
            {t.label}
            {t.badge > 0 && <span className="rounded-full bg-terracotta px-2 py-0.5 text-xs font-bold text-white">{t.badge}</span>}
          </button>
        ))}
      </div>

      <div key={tab} className="anim-fade-in mt-8">
        {tab === "overview" && <Overview rows={rows} customerCount={customers.length} onConfirm={onConfirm} onOpenBookings={() => setTab("bookings")} />}
        {tab === "bookings" && <BookingsTable rows={rows} onConfirm={onConfirm} onCancel={onCancel} />}
        {tab === "customers" && <CustomersTable customers={customers} rows={rows} />}
        {tab === "events" && <EventsTable rows={rows} />}
      </div>
    </div>
  );
}