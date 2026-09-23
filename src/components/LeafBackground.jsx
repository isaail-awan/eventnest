function LeafBranch({ className, flip = false }) {
  return (
    <svg viewBox="0 0 300 400" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined} fill="none">
      <path d="M40 400C60 320 70 240 55 160C45 100 30 50 10 0" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M52 340c30-5 55 10 62 38-32 8-58-8-62-38z" fill="currentColor" />
      <path d="M48 300c-32-2-55 16-58 45 33 4 57-14 58-45z" fill="currentColor" />
      <path d="M55 260c30-8 57 5 67 32-31 11-59-2-67-32z" fill="currentColor" />
      <path d="M48 220c-30-6-56 8-64 36 31 8 58-6 64-36z" fill="currentColor" />
      <path d="M52 180c28-10 56-1 68 25-30 13-59 3-68-25z" fill="currentColor" />
      <path d="M44 145c-27-9-53 3-62 30 29 10 55-1 62-30z" fill="currentColor" />
      <path d="M38 110c25-12 53-6 66 18-27 15-56 7-66-18z" fill="currentColor" />
      <path d="M28 78c-24-11-51-4-62 21 27 12 53 3 62-21z" fill="currentColor" />
      <path d="M22 48c21-13 47-9 60 13-24 17-51 10-60-13z" fill="currentColor" />
    </svg>
  );
}

export default function LeafBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden text-sage">
      <LeafBranch className="absolute -bottom-8 -left-6 h-[420px] w-[320px] opacity-[0.22] md:h-[520px] md:w-[400px]" />
      <LeafBranch className="absolute -right-10 -top-12 h-80 w-64 opacity-[0.14] md:h-96 md:w-80" flip />
    </div>
  );
}