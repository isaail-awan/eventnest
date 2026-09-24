import { useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import events from "../data/events";
import { getEventDetails } from "../data/eventDetails";
import { shortDate } from "../utils/bookings";
import useAuth from "../hooks/useAuth";
import Select from "../components/Select";
import AuthGate from "../components/AuthGate";
import { IconCalendar, IconMapPin, IconMinus, IconPlus } from "../components/Icons";
import BookingConfirmation from "./BookingConfirmation";

function validate(form) {
  const errors = {};
  const phone = form.phone.replace(/[\s-]/g, "");

  if (form.name.trim().length < 3) errors.name = "Please enter your full name (at least 3 characters).";
  else if (!/^[A-Za-z\s.'-]+$/.test(form.name.trim())) errors.name = "Name can only contain letters and spaces.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (!/^(03\d{9}|\+923\d{9})$/.test(phone)) errors.phone = "Enter a valid mobile number, e.g. 0300 1234567.";

  return errors;
}

const inputClass = (hasError) =>
  "w-full rounded-xl border bg-paper px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink-soft focus:ring-2 dark:bg-white/5 dark:text-paper dark:placeholder:text-paper/40 " +
  (hasError ? "border-red-400 focus:ring-red-200" : "border-border focus:border-terracotta focus:ring-terracotta/20 dark:border-white/10");

function Field({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-28 text-center">
      <p className="font-serif text-3xl font-semibold text-ink dark:text-paper">Event not found</p>
      <Link to="/events" className="mt-6 inline-block rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white transition hover:bg-sage-dark active:scale-95">Browse all events</Link>
    </section>
  );
}

export default function BookEvent({ onConfirm }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const event = events.find((e) => String(e.id) === id);
  const info = event ? getEventDetails(event) : null;

  const initialTierId = (location.state && location.state.tierId) || (info ? info.tiers[0].id : "");

  const [form, setForm] = useState(() => ({
    name: user ? user.name : "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    tierId: initialTierId,
    quantity: 1,
    notes: "",
  }));
  const [errors, setErrors] = useState({});
  const [booking, setBooking] = useState(null);

  if (!event) return <NotFound />;

  const tierOptions = info.tiers.map((t) => ({ value: t.id, label: t.name + " — PKR " + t.price.toLocaleString() }));
  const selectedTier = info.tiers.find((t) => t.id === form.tierId) || info.tiers[0];
  const total = selectedTier.price * form.quantity;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const changeQuantity = (delta) => {
    setForm((prev) => ({ ...prev, quantity: Math.min(10, Math.max(1, prev.quantity + delta)) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const newBooking = {
      id: "EN-" + Math.floor(100000 + Math.random() * 900000),
      userId: user.id,
      eventId: event.id,
      tierId: selectedTier.id,
      tierName: selectedTier.name,
      quantity: form.quantity,
      total,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone,
      notes: form.notes.trim(),
      status: "active",
      createdAt: new Date().toISOString(),
    };

    if (onConfirm) onConfirm(newBooking);
    setBooking(newBooking);
  };

  if (booking) {
    return <BookingConfirmation booking={booking} event={event} onReset={() => navigate("/events")} />;
  }

  const gateState = { from: "/book/" + event.id, tierId: form.tierId };

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <Link to={"/events/" + event.id} className="text-sm font-medium text-ink-soft transition hover:text-ink dark:text-paper/60 dark:hover:text-paper">← Back to event</Link>

      <h1 className="mt-4 font-serif text-3xl font-semibold text-ink dark:text-paper md:text-4xl">Register for this event</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        {user ? (
          <form onSubmit={handleSubmit} noValidate className="space-y-6 rounded-2xl border border-border bg-surface p-6 dark:border-white/10 dark:bg-white/5 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" id="name" error={errors.name}>
                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass(errors.name)} />
              </Field>
              <Field label="Phone number" id="phone" error={errors.phone}>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="0300 1234567" className={inputClass(errors.phone)} />
              </Field>
            </div>

            <Field label="Email" id="email" error={errors.email}>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass(errors.email)} />
            </Field>

            <Field label="Ticket type" id="tierId">
              <Select value={form.tierId} onChange={(val) => setForm({ ...form, tierId: val })} options={tierOptions} />
            </Field>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">Number of tickets</label>
              <div className="inline-flex items-center gap-4 rounded-xl border border-border px-4 py-2.5 dark:border-white/10">
                <button type="button" onClick={() => changeQuantity(-1)} disabled={form.quantity <= 1} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-ink transition hover:bg-accent-soft disabled:opacity-40 dark:border-white/10 dark:text-paper dark:hover:bg-white/10">
                  <IconMinus className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-semibold text-ink dark:text-paper">{form.quantity}</span>
                <button type="button" onClick={() => changeQuantity(1)} disabled={form.quantity >= 10} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-ink transition hover:bg-accent-soft disabled:opacity-40 dark:border-white/10 dark:text-paper dark:hover:bg-white/10">
                  <IconPlus className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-1.5 text-xs text-ink-soft dark:text-paper/50">Maximum 10 tickets per booking</p>
            </div>

            <Field label="Special requests (optional)" id="notes">
              <textarea id="notes" name="notes" rows="3" value={form.notes} onChange={handleChange} placeholder="Wheelchair access, dietary needs, etc." className={inputClass(false)} />
            </Field>

            <button type="submit" className="w-full rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-terracotta-dark active:scale-[0.98]">
              Confirm Registration
            </button>
          </form>
        ) : (
          <AuthGate title="Log in to register" text="Create a free account or log in to book tickets. Your details will be filled in automatically next time." state={gateState} />
        )}

        <div>
          <div className="sticky top-28 rounded-2xl border border-border bg-surface p-6 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-medium tracking-[0.15em] text-ink-soft dark:text-paper/50">YOUR EVENT</p>

            <div className="mt-4 flex gap-4">
              <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-accent-soft dark:bg-white/10">
                <img src={event.image} alt={event.name} onError={(e) => (e.target.style.display = "none")} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-serif text-base font-semibold text-ink dark:text-paper">{event.name}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft dark:text-paper/60"><IconCalendar className="h-3.5 w-3.5" />{shortDate(event.date)}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-soft dark:text-paper/60"><IconMapPin className="h-3.5 w-3.5" />{event.venue}</p>
              </div>
            </div>

            <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm dark:border-white/10">
              <div className="flex justify-between text-ink-soft dark:text-paper/70">
                <span>{selectedTier.name} × {form.quantity}</span>
                <span>PKR {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4 dark:border-white/10">
              <span className="text-sm text-ink-soft dark:text-paper/60">Total</span>
              <span className="font-serif text-2xl font-semibold text-ink dark:text-paper">PKR {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}