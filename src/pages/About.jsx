import { Link } from "react-router-dom";
import { brand } from "../data/brand";
import Reveal from "../components/Reveal";
import { IconShield, IconUsers, IconHeart, IconTicket } from "../components/Icons";

const values = [
  { icon: IconShield, title: "Verified organizers", text: "Every event on EventNest is listed by a vetted organizer, so you know what you're booking." },
  { icon: IconUsers, title: "Built for everyone", text: "From intimate Qawali nights to large festivals, we support events of every size and kind." },
  { icon: IconHeart, title: "Memories first", text: "We care about the experience, not just the ticket. Every detail is designed to help you enjoy the moment." },
];

const stats = [
  { value: "500+", label: "Events hosted" },
  { value: "50K+", label: "Tickets booked" },
  { value: "12", label: "Cities covered" },
];

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Reveal>
        <p className="text-xs font-medium tracking-[0.25em] text-ink-soft dark:text-paper/60">ABOUT US</p>
        <h1 className="mt-2 max-w-2xl font-serif text-4xl font-semibold leading-tight text-ink dark:text-paper md:text-5xl">
          Every event, one <span className="italic text-terracotta">beautiful</span> place.
        </h1>
        <p className="mt-5 max-w-2xl text-ink-soft dark:text-paper/70">
          {brand.name} started with a simple idea: finding and booking a great event in Pakistan shouldn't be complicated. Whether it's a concert, a Qawali night, a wedding expo or a corporate summit, we bring organizers and attendees together in one clean, trustworthy place.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-14 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-surface p-6 dark:border-white/10 dark:bg-white/5 sm:p-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl font-semibold text-ink dark:text-paper md:text-4xl">{s.value}</p>
              <p className="mt-1 text-xs text-ink-soft dark:text-paper/60 md:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={i * 100}>
            <div className="h-full rounded-2xl border border-border bg-surface p-6 dark:border-white/10 dark:bg-white/5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft dark:bg-white/10">
                <v.icon className="h-5 w-5 text-terracotta" />
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-ink dark:text-paper">{v.title}</h3>
              <p className="mt-2 text-sm text-ink-soft dark:text-paper/60">{v.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={150}>
        <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl border border-terracotta/20 bg-accent-soft p-10 text-center dark:border-terracotta/25 dark:bg-white/5">
          <IconTicket className="h-8 w-8 text-terracotta" />
          <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper">Ready to find your next event?</h2>
          <p className="max-w-md text-ink-soft dark:text-paper/70">Browse concerts, Qawali nights, weddings and more happening near you.</p>
          <Link to="/events" className="mt-2 rounded-full bg-terracotta px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-terracotta-dark active:scale-95">Browse Events</Link>
        </div>
      </Reveal>
    </div>
  );
}