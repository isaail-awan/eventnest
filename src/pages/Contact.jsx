import { useState } from "react";
import { brand } from "../data/brand";
import Reveal from "../components/Reveal";
import { IconMapPin, IconCheck } from "../components/Icons";

function validate(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (form.message.trim().length < 10) errors.message = "Message should be at least 10 characters.";
  return errors;
}

const inputClass = (hasError) =>
  "w-full rounded-xl border bg-paper px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink-soft focus:ring-2 dark:bg-white/5 dark:text-paper dark:placeholder:text-paper/40 " +
  (hasError ? "border-red-400 focus:ring-red-200" : "border-border focus:border-sage focus:ring-sage/20 dark:border-white/10");

function Field({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
}

const infoItems = [
  { label: "Email", value: brand.email },
  { label: "Phone", value: brand.phone },
  { label: "Office", value: "Blue Area, Islamabad, Pakistan" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Reveal>
        <p className="text-xs font-medium tracking-[0.25em] text-ink-soft dark:text-paper/60">GET IN TOUCH</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-ink dark:text-paper md:text-5xl">We'd love to hear from you</h1>
        <p className="mt-4 max-w-xl text-ink-soft dark:text-paper/70">Questions about an event, a booking, or want to list your own event on {brand.name}? Send us a message.</p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
        <Reveal animation="left">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-surface p-10 text-center dark:border-white/10 dark:bg-white/5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage text-white">
                <IconCheck className="h-5 w-5" />
              </span>
              <p className="mt-4 font-serif text-xl font-semibold text-ink dark:text-paper">Message sent</p>
              <p className="mt-2 max-w-xs text-sm text-ink-soft dark:text-paper/60">Thanks for reaching out. Our team will get back to you shortly.</p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }} className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-accent-soft dark:border-white/10 dark:text-paper dark:hover:bg-white/10">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-2xl border border-border bg-surface p-6 dark:border-white/10 dark:bg-white/5 md:p-8">
              <Field label="Full name" id="name" error={errors.name}>
                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass(errors.name)} />
              </Field>

              <Field label="Email" id="email" error={errors.email}>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass(errors.email)} />
              </Field>

              <Field label="Message" id="message" error={errors.message}>
                <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} placeholder="How can we help?" className={inputClass(errors.message)} />
              </Field>

              <button type="submit" className="w-full rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-terracotta-dark active:scale-[0.98]">Send Message</button>
            </form>
          )}
        </Reveal>

        <Reveal animation="right" delay={100}>
          <div className="rounded-2xl border border-border bg-surface p-6 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-medium tracking-[0.15em] text-ink-soft dark:text-paper/50">CONTACT INFO</p>
            <div className="mt-4 space-y-4">
              {infoItems.map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-ink-soft dark:text-paper/50">{item.label}</p>
                  <p className="mt-0.5 text-sm font-medium text-ink dark:text-paper">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 border-t border-border pt-5 dark:border-white/10">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border dark:border-white/10"><IconMapPin className="h-4 w-4 text-ink-soft dark:text-paper/50" /></span>
              <p className="text-sm text-ink-soft dark:text-paper/60">We typically respond within 1-2 business days.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}