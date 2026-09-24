const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" };

export function IconSearch({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>;
}
export function IconMapPin({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}
export function IconShield({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" /></svg>;
}
export function IconUsers({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><circle cx="9" cy="8" r="3" /><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" /><circle cx="17" cy="9" r="2.4" /><path d="M16 14.2c2.6.4 4.5 2.4 4.5 5.3" /></svg>;
}
export function IconHeart({ className = "h-5 w-5", active = false }) {
  return <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={active ? 2.1 : 1.75}><path d="M12 20s-7.5-4.6-9.6-9.3C1.1 7.6 2.6 4.5 6 4c2-.3 3.7.7 6 3 2.3-2.3 4-3.3 6-3 3.4.5 4.9 3.6 3.6 6.7C19.5 15.4 12 20 12 20z" /></svg>;
}
export function IconCalendar({ className = "h-4 w-4" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" /></svg>;
}
export function IconArrowRight({ className = "h-4 w-4" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}
export function IconChevronLeft({ className = "h-4 w-4" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><path d="M15 6l-6 6 6 6" /></svg>;
}
export function IconChevronRight({ className = "h-4 w-4" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><path d="M9 6l6 6-6 6" /></svg>;
}
export function IconMenu({ className = "h-6 w-6" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}
export function IconClose({ className = "h-6 w-6" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>;
}
export function IconMusic({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><circle cx="7" cy="18" r="2.3" /><circle cx="17" cy="16" r="2.3" /><path d="M9.3 18V5.5L19.3 4v11.5" /></svg>;
}
export function IconMic({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21M9 21h6" /></svg>;
}
export function IconRings({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><circle cx="9" cy="14" r="5" /><circle cx="15" cy="14" r="5" /></svg>;
}
export function IconTicket({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><path d="M3 9a2 2 0 012-2h14a2 2 0 012 2v1.2a1.8 1.8 0 000 3.6V15a2 2 0 01-2 2H5a2 2 0 01-2-2v-1.2a1.8 1.8 0 000-3.6V9z" /><path d="M9 7v10" strokeDasharray="2 2" /></svg>;
}
export function IconBriefcase({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><rect x="3" y="7.5" width="18" height="12" rx="2" /><path d="M8 7.5V6a2 2 0 012-2h4a2 2 0 012 2v1.5M3 12.5h18" /></svg>;
}
export function IconSparkle({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" /></svg>;
}
export function IconMinus({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 12h14" /></svg>;
}
export function IconPlus({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 5v14M5 12h14" /></svg>;
}
export function IconCheck({ className = "h-5 w-5", strokeOverride = false }) {
  return <svg viewBox="0 0 24 24" className={className} {...base} stroke={strokeOverride ? "currentColor" : "white"}><path d="M5 13l4 4L19 7" /></svg>;
}
export function IconArrowLeft({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>;
}
export function IconChevronDown({ className = "h-4 w-4" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><path d="M6 9l6 6 6-6" /></svg>;
}
export function IconUser({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>;
}
export function IconLock({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>;
}
export function IconLogOut({ className = "h-4 w-4" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" /></svg>;
}
export function IconSun({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><circle cx="12" cy="12" r="4.5" /><path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8L6 18M18 6l1.8-1.8" /></svg>;
}
export function IconMoon({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" className={className} {...base}><path d="M20.5 14.5A9 9 0 1110 2.8a7 7 0 0010.5 11.7z" /></svg>;
}