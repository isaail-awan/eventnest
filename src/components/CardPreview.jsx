import { detectCardBrand } from "../utils/card";

export default function CardPreview({ number, name, expiry }) {
  const digits = number.replace(/\s/g, "");
  const brand = digits ? detectCardBrand(digits) : "Card";
  const display = number || "•••• •••• •••• ••••";

  return (
    <div className="relative aspect-[1.6/1] w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-ink via-[#3A342B] to-ink p-6 text-paper shadow-lg dark:from-[#2A251E] dark:via-[#1A1712] dark:to-[#2A251E]">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-terracotta/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-sage/20 blur-2xl" />

      <div className="relative flex items-start justify-between">
        <span className="h-8 w-11 rounded-md bg-gradient-to-br from-yellow-200/80 to-yellow-400/80" />
        <span className="font-serif text-lg italic tracking-wide">{brand}</span>
      </div>

      <p className="relative mt-8 font-mono text-xl tracking-[0.15em] md:text-2xl">{display}</p>

      <div className="relative mt-6 flex items-end justify-between text-xs">
        <div>
          <p className="uppercase tracking-wider text-paper/50">Card holder</p>
          <p className="mt-1 max-w-[180px] truncate font-medium uppercase tracking-wide">{name || "Your Name"}</p>
        </div>
        <div>
          <p className="uppercase tracking-wider text-paper/50">Expires</p>
          <p className="mt-1 font-medium">{expiry || "MM/YY"}</p>
        </div>
      </div>
    </div>
  );
}