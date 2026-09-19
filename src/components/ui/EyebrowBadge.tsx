type Props = { children: React.ReactNode; className?: string; tone?: "amber" | "muted-v2" };

// ponytail: `tone` defaults to the original amber look so every existing
// caller (Hero, Challenge, About, Ecosystem, Contact) is
// unaffected. Only the glass-v2 sections (Solutions, ExecutionCycle, Cases)
// pass tone="muted-v2" — labels shouldn't compete with the cyan accent.
export function EyebrowBadge({ children, className = "", tone = "amber" }: Props) {
  if (tone === "muted-v2") {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted backdrop-blur-md ${className}`}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-accent backdrop-blur-md ${className}`}
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 24px -8px rgba(212,162,47,0.25)",
      }}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(212,162,47,0.85)]" />
      {children}
    </span>
  );
}
