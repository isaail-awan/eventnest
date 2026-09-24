import { IconSun, IconMoon } from "./Icons";

export default function ThemeToggle({ dark, onToggle }) {
  const label = dark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button onClick={onToggle} aria-label={label} title={label} className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-accent-soft dark:text-paper dark:hover:bg-white/10 active:scale-90">
      {dark ? <IconSun /> : <IconMoon />}
    </button>
  );
}