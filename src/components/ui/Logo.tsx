import Link from "next/link";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  return (
    <Link
      href="/"
      className="inline-flex min-h-11 items-center gap-2 no-underline group"
      aria-label="EstroBunny's Burrow home"
    >
      <span
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-secondary/30 bg-secondary/5 text-xl shadow-[0_0_24px_rgba(0,229,255,.12)] transition-all group-hover:border-primary/60 group-hover:shadow-[0_0_28px_rgba(255,0,255,.25)] ${size === "lg" ? "h-14 w-14 text-3xl" : ""}`}
        aria-hidden="true"
      >
        <span className="absolute inset-1 rounded-lg border border-primary/10" />
        <span className="relative">🐇</span>
      </span>
      <span
        className={`${sizeClasses[size]} font-[600] tracking-[-.08em] leading-none select-none font-[var(--font-logo)]`}
      >
        <span className="text-on-surface">ESTRO</span>
        <span className="bg-gradient-to-r from-primary via-[#ff3ddf] to-secondary bg-clip-text text-transparent">
          BUNNI
        </span>
        <span className="text-secondary/80">.xo</span>
      </span>
    </Link>
  );
}
