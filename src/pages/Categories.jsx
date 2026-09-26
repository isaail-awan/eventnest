import { Link } from "react-router-dom";
import categories from "../data/categories";
import events from "../data/events";
import Reveal from "../components/Reveal";
import { IconMusic, IconMic, IconRings, IconTicket, IconBriefcase, IconSparkle, IconArrowRight } from "../components/Icons";

const iconMap = { music: IconMusic, mic: IconMic, rings: IconRings, ticket: IconTicket, briefcase: IconBriefcase, sparkle: IconSparkle };

export default function Categories() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Reveal>
        <p className="text-xs font-medium tracking-[0.25em] text-ink-soft dark:text-paper/60">BROWSE</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-ink dark:text-paper md:text-5xl">All Categories</h1>
        <p className="mt-3 max-w-xl text-ink-soft dark:text-paper/70">Explore events by type — from concerts and Qawali nights to weddings and corporate gatherings.</p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {categories.map((c, i) => {
          const Icon = iconMap[c.icon];
          const count = events.filter((e) => e.category === c.name).length;

          return (
            <Reveal key={c.id} delay={i * 90}>
              <Link
                to={"/events?category=" + encodeURIComponent(c.name)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5 sm:flex-row"
              >
                <div className="relative h-44 shrink-0 overflow-hidden sm:h-auto sm:w-44">
                  <img src={c.image} alt={c.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:bg-gradient-to-r" />
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft dark:bg-white/10">
                        <Icon className="h-4 w-4 text-terracotta" />
                      </span>
                      <h2 className="font-serif text-xl font-semibold text-ink dark:text-paper">{c.name}</h2>
                    </div>
                    <p className="mt-3 text-sm text-ink-soft dark:text-paper/60">{c.description}</p>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs font-medium text-ink-soft dark:text-paper/50">{count} {count === 1 ? "event" : "events"}</span>
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-sage transition group-hover:gap-2.5">
                      Browse <IconArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}