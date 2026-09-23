import categories from "../data/categories";
import { IconMusic, IconMic, IconRings, IconTicket, IconBriefcase, IconSparkle } from "./Icons";

const iconMap = { music: IconMusic, mic: IconMic, rings: IconRings, ticket: IconTicket, briefcase: IconBriefcase, sparkle: IconSparkle };

export default function CategoryGrid() {
  return (
    <section id="categories" className="px-6 pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-3xl font-semibold text-ink">Browse by Category</h2>
          <a href="#events" className="hidden text-sm font-medium text-ink hover:text-terracotta sm:block">View all categories</a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => {
            const Icon = iconMap[c.icon];
            return (
              <a key={c.id} href={"#events?category=" + c.id} className="group relative h-44 overflow-hidden rounded-2xl shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                <img src={c.image} alt={c.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{c.name}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}