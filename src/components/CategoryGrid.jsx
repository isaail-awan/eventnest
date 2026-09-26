import { Link } from "react-router-dom";
import categories from "../data/categories";
import Reveal from "./Reveal";
import { IconMusic, IconMic, IconRings, IconTicket, IconBriefcase, IconSparkle } from "./Icons";

const iconMap = { music: IconMusic, mic: IconMic, rings: IconRings, ticket: IconTicket, briefcase: IconBriefcase, sparkle: IconSparkle };

export default function CategoryGrid() {
  return (
    <section id="categories" className="px-6 pb-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-serif text-3xl font-semibold text-ink dark:text-paper">Browse by Category</h2>
            <Link to="/categories" className="hidden text-sm font-medium text-ink hover:text-sage dark:text-paper sm:block">View all categories</Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c, i) => {
            const Icon = iconMap[c.icon];
            return (
              <Reveal key={c.id} animation="zoom" delay={i * 60}>
                <Link to={"/events?category=" + encodeURIComponent(c.name)} className="group relative block h-44 overflow-hidden rounded-2xl shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <img src={c.image} alt={c.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{c.name}</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}