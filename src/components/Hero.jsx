import { useState } from "react";
import { IconSearch, IconMapPin, IconShield, IconUsers, IconHeart } from "./Icons";

const highlights = [
  { label: "Verified Organizers", sub: "Safe & trusted", icon: IconShield },
  { label: "Easy Booking", sub: "In just a few clicks", icon: IconUsers },
  { label: "Unforgettable Moments", sub: "For every occasion", icon: IconHeart },
];

const sideCards = [
  { label: "Concerts", image: "/images/categories/concerts.jpg" },
  { label: "Qawali Nights", image: "/images/categories/qawali.jpg" },
  { label: "Weddings", image: "/images/categories/weddings.jpg" },
];

function SafeImage({ src, alt, className }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={className + " flex items-center justify-center bg-accent-soft text-ink-soft dark:bg-white/5 dark:text-paper/50"}>
        <IconMapPin className="h-8 w-8" />
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setError(true)} className={className} />;
}

function delay(ms) {
  return { animationDelay: ms + "ms" };
}

export default function Hero() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Islamabad");

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <p className="anim-fade-up text-xs font-medium tracking-[0.25em] text-ink-soft dark:text-paper/60">DISCOVER &nbsp;·&nbsp; BOOK &nbsp;·&nbsp; CELEBRATE</p>

          <h1 className="anim-fade-up mt-5 font-serif text-5xl font-semibold leading-[1.15] text-ink dark:text-paper md:text-6xl" style={delay(100)}>
            Every Event.<br />
            One <span className="italic text-terracotta">Beautiful</span> Place.
          </h1>

          <p className="anim-fade-up mt-6 max-w-md text-ink-soft dark:text-paper/70" style={delay(200)}>
            From concerts to weddings, Qawali nights to corporate gatherings — find and manage the perfect event, all in one place.
          </p>

          <div className="anim-fade-up mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-2.5 shadow-lg shadow-black/5 dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center" style={delay(300)}>
            <div className="flex flex-1 items-center gap-2 px-3 py-2">
              <IconSearch className="h-5 w-5 shrink-0 text-ink-soft dark:text-paper/50" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search events, artists, venues..." className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft dark:text-paper dark:placeholder:text-paper/40" />
            </div>

            <div className="hidden h-6 w-px bg-border dark:bg-white/10 sm:block" />

            <div className="flex items-center gap-2 px-3 py-2">
              <IconMapPin className="h-5 w-5 shrink-0 text-ink-soft dark:text-paper/50" />
              <select value={city} onChange={(e) => setCity(e.target.value)} className="bg-transparent text-sm text-ink outline-none dark:text-paper">
                <option>Islamabad</option>
                <option>Lahore</option>
                <option>Karachi</option>
                <option>Faisalabad</option>
              </select>
            </div>

            <button className="rounded-xl bg-sage px-6 py-3 text-sm font-semibold text-white transition hover:bg-sage-dark active:scale-95">Explore Events</button>
          </div>

          <div className="anim-fade-up mt-10 flex flex-wrap gap-8" style={delay(400)}>
            {highlights.map((h) => (
              <div key={h.label} className="flex items-start gap-2.5">
                <h.icon className="mt-0.5 h-5 w-5 shrink-0 text-ink-soft dark:text-paper/50" />
                <div>
                  <p className="text-sm font-medium text-ink dark:text-paper">{h.label}</p>
                  <p className="text-xs text-ink-soft dark:text-paper/60">{h.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="anim-fade-up relative" style={delay(250)}>
          <div className="anim-float-slow relative overflow-hidden rounded-[2.5rem] shadow-2xl shadow-black/20">
            <SafeImage src="/images/hero-concert.jpg" alt="Concert crowd" className="h-[420px] w-full object-cover md:h-[480px]" />
            <p className="absolute left-6 top-6 max-w-[170px] font-serif italic text-ink drop-shadow-md dark:text-paper">Music brings people together</p>
          </div>

          <div className="absolute -right-4 top-4 hidden w-40 flex-col gap-3 sm:flex md:-right-8">
            {sideCards.map((c) => (
              <div key={c.label} className="overflow-hidden rounded-xl border-2 border-white shadow-lg transition duration-300 hover:-translate-y-1 dark:border-white/20">
                <div className="relative h-20 w-full">
                  <SafeImage src={c.image} alt={c.label} className="h-full w-full object-cover" />
                  <span className="absolute bottom-2 left-2 text-xs font-medium text-white drop-shadow">{c.label}</span>
                </div>
              </div>
            ))}
            <a href="#events" className="mt-1 text-center text-xs font-medium text-ink hover:text-terracotta dark:text-paper">Explore all events</a>
          </div>
        </div>
      </div>
    </section>
  );
}