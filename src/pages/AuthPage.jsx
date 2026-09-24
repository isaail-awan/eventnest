import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { brand } from "../data/brand";
import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";

const perks = [
  "Book tickets in a few clicks",
  "Track your upcoming events",
  "Your details filled in automatically",
  "Booking history saved on this device",
];

function validateSignup(f) {
  const e = {};
  const phone = f.phone.replace(/[\s-]/g, "");

  if (f.name.trim().length < 3) e.name = "Please enter your full name (at least 3 characters).";
  else if (!/^[A-Za-z\s.'-]+$/.test(f.name.trim())) e.name = "Name can only contain letters and spaces.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (!/^(03\d{9}|\+923\d{9})$/.test(phone)) e.phone = "Enter a valid mobile number, e.g. 0300 1234567.";

  if (f.password.length < 8) e.password = "Password must be at least 8 characters.";
  else if (!/[A-Za-z]/.test(f.password) || !/\d/.test(f.password)) e.password = "Use at least one letter and one number.";

  if (f.confirm !== f.password) e.confirm = "Passwords do not match.";
  return e;
}

function validateLogin(f) {
  const e = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (!f.password) e.password = "Please enter your password.";
  return e;
}

function getStrength(p) {
  let score = 0;
  if (p.length >= 8) score++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) score++;
  if (/\d/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p) || p.length >= 12) score++;
  return score;
}

const strengthLabels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
const strengthColors = ["bg-border dark:bg-white/10", "bg-red-400", "bg-terracotta", "bg-yellow-500", "bg-sage"];

const inputClass = (hasError, padding = "px-4") =>
  "w-full rounded-xl border bg-paper " + padding + " py-3 text-sm text-ink outline-none transition placeholder:text-ink-soft focus:ring-2 dark:bg-white/5 dark:text-paper dark:placeholder:text-paper/40 " +
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

function PasswordInput({ id, name, value, onChange, placeholder, hasError, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input id={id} name={name} type={show ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} className={inputClass(hasError, "px-4 pr-16")} />
      <button type="button" onClick={() => setShow(!show)} className="absolute inset-y-0 right-0 px-4 text-xs font-semibold text-ink-soft transition hover:text-sage dark:text-paper/50">{show ? "Hide" : "Show"}</button>
    </div>
  );
}

export default function AuthPage({ mode }) {
  const isSignup = mode === "signup";
  const { user, signup, login } = useAuth();
  const location = useLocation();

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = (location.state && location.state.from) || "/";
  if (user) return <Navigate to={from} replace state={location.state} />;

  const strength = getStrength(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = isSignup ? validateSignup(form) : validateLogin(form);
    setErrors(found);
    setFormError("");
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    const result = isSignup
      ? await signup({ name: form.name, email: form.email, phone: form.phone, password: form.password })
      : await login({ email: form.email, password: form.password });
    setLoading(false);

    if (!result.ok) {
      if (result.field) setErrors({ [result.field]: result.error });
      else setFormError(result.error);
    }
  };

  return (
    <section className="px-6 py-12 md:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface shadow-lg shadow-black/5 dark:border-white/10 dark:bg-white/5 lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-accent-soft p-10 dark:bg-white/[0.03] lg:flex">
          <div>
            <Link to="/"><Logo /></Link>
            <h2 className="mt-10 font-serif text-3xl font-semibold leading-tight text-ink dark:text-paper">Every event,<br /><span className="italic text-terracotta">one place.</span></h2>
            <p className="mt-4 text-ink-soft dark:text-paper/70">Create an account to book faster and keep track of every event you attend.</p>

            <ul className="mt-8 space-y-3 text-ink dark:text-paper">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3"><span className="text-sage">✓</span>{p}</li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-ink-soft dark:text-paper/50">© {new Date().getFullYear()} {brand.name}</p>
        </div>

        <div className="p-6 sm:p-10">
          <h1 className="font-serif text-2xl font-semibold text-ink dark:text-paper md:text-3xl">{isSignup ? "Create your account" : "Welcome back"}</h1>
          <p className="mt-2 text-ink-soft dark:text-paper/70">{isSignup ? "Join " + brand.name + " to book tickets and manage your events." : "Log in to book tickets and see your events."}</p>

          {formError && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">{formError}</div>}

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            {isSignup && (
              <Field label="Full name" id="name" error={errors.name}>
                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" autoComplete="name" className={inputClass(errors.name)} />
              </Field>
            )}

            <Field label="Email" id="email" error={errors.email}>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" className={inputClass(errors.email)} />
            </Field>

            {isSignup && (
              <Field label="Phone number" id="phone" error={errors.phone}>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="0300 1234567" autoComplete="tel" className={inputClass(errors.phone)} />
              </Field>
            )}

            <Field label="Password" id="password" error={errors.password}>
              <PasswordInput id="password" name="password" value={form.password} onChange={handleChange} placeholder={isSignup ? "At least 8 characters" : "Your password"} hasError={errors.password} autoComplete={isSignup ? "new-password" : "current-password"} />

              {isSignup && form.password && (
                <div className="mt-2">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <span key={i} className={"h-1.5 flex-1 rounded-full transition-colors " + (i <= strength ? strengthColors[strength] : "bg-border dark:bg-white/10")} />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-ink-soft dark:text-paper/50">Strength: {strengthLabels[strength]}</p>
                </div>
              )}
            </Field>

            {isSignup && (
              <Field label="Confirm password" id="confirm" error={errors.confirm}>
                <PasswordInput id="confirm" name="confirm" value={form.confirm} onChange={handleChange} placeholder="Re-enter your password" hasError={errors.confirm} autoComplete="new-password" />
              </Field>
            )}

            <button type="submit" disabled={loading} className="w-full rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-terracotta-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Please wait..." : isSignup ? "Create account" : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-soft dark:text-paper/60">
            {isSignup ? "Already have an account? " : "New to " + brand.name + "? "}
            <Link to={isSignup ? "/login" : "/signup"} state={location.state} className="font-semibold text-sage hover:text-sage-dark">{isSignup ? "Log in" : "Create an account"}</Link>
          </p>

          <p className="mt-6 rounded-lg bg-accent-soft p-3 text-xs text-ink-soft dark:bg-white/5 dark:text-paper/50">Demo project: accounts are stored only in this browser and are not sent to any server. Please do not use a real password.</p>
        </div>
      </div>
    </section>
  );
}