import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import events from "../data/events";
import categories from "../data/categories";
import EventCard from "../components/EventCard";
import Select from "../components/Select";
import Reveal from "../components/Reveal";
import { IconSearch } from "../components/Icons";

const highestPrice = Math.max(...events.map((e) => e.price));

const sortOptions = [
  { value: "date", label: "Date (soonest)" },
  { value: "price", label: "Price (low to high)" },
];

export default function Events() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl || "All");
  const [maxPrice, setMaxPrice] = useState(highestPrice);
  const [sort, setSort] = useState("date");

  useEffect(() => {
    if (categoryFromUrl) setActiveCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const filtered = events
    .filter((e) => {
      const matchesSearch = e.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesCategory = activeCategory === "All" || e.category === activeCategory;
      const matchesPrice = e.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => (sort === "price" ? a.price - b.price : a.date.localeCompare(b.date)));

  const resetFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setMaxPrice(highestPrice);
    setSort("date");
  };

  return (
    <section id="events-page" className="mx-auto max-w-7xl px-6 py-16">
      <Reveal>
        <div className="mb-10">
          <p className="text-xs font-medium tracking-[0.25em] text-ink-soft dark:text-paper/60">ALL EVENTS</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-ink dark:text-paper md:text-5xl">Find your next event</h1>
          <p className="mt-3 max-w-xl text-ink-soft dark:text-paper/70">Browse concerts, Qawali nights, weddings and more — search, filter and book in a few clicks.</p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="rounded-2xl border border-border bg-surface p-5 dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 dark:border-white/10">
            <IconSearch className="h-5 w-5 shrink-0 text-ink-soft dark:text-paper/50" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search events by name..." className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft dark:text-paper dark:placeholder:text-paper/40" />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {["All", ...categories.map((c) => c.name)].map((name) => (
              <button
                key={name}
                onClick={() => setActiveCategory(name)}
                className={
                  "rounded-full px-4 py-1.5 text-sm font-medium transition active:scale-95 " +
                  (activeCategory === name
                    ? "bg-sage text-white"
                    : "border border-border text-ink-soft hover:bg-sage/10 hover:text-sage dark:border-white/10 dark:text-paper/60 dark:hover:bg-sage/20 dark:hover:text-sage")
                }
              >
                {name}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-ink dark:text-paper">
                Max price: <span className="text-ink-soft dark:text-paper/60">PKR {maxPrice.toLocaleString()}</span>
              </label>
              <input type="range" min="0" max={highestPrice} step="500" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-sage" />
            </div>

            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-ink dark:text-paper">Sort by</label>
                <Select value={sort} onChange={setSort} options={sortOptions} />
              </div>
              <button onClick={resetFilters} className="h-[46px] shrink-0 rounded-xl border border-border px-4 text-sm font-medium text-ink-soft transition hover:bg-sage/10 hover:text-sage dark:border-white/10 dark:text-paper/60 dark:hover:bg-sage/20 dark:hover:text-sage">Reset</button>
            </div>
          </div>
        </div>
      </Reveal>

      <p className="mt-6 text-sm text-ink-soft dark:text-paper/60">Showing {filtered.length} of {events.length} events</p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e, i) => (
            <Reveal key={e.id} delay={(i % 6) * 70}>
              <EventCard event={e} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="anim-fade-in mt-6 rounded-2xl border border-border bg-surface py-16 text-center dark:border-white/10 dark:bg-white/5">
          <p className="font-serif text-xl font-semibold text-ink dark:text-paper">No events found</p>
          <p className="mt-2 text-ink-soft dark:text-paper/60">Try a different search or filter.</p>
          <button onClick={resetFilters} className="mt-5 rounded-full bg-sage px-5 py-2 text-sm font-semibold text-white transition hover:bg-sage-dark active:scale-95">Clear filters</button>
        </div>
      )}
    </section>
  );
}