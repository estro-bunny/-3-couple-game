import Link from "next/link";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = { sm: "text-lg", md: "text-2xl", lg: "text-4xl" };

  return (
    <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 no-underline group" aria-label="EstroBunny's Burrow home">
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border border-primary/35 bg-[linear-gradient(145deg,rgba(255,125,233,.16),rgba(157,247,255,.05))] shadow-[0_0_24px_rgba(255,0,255,.13)] transition-all duration-300 group-hover:-rotate-3 group-hover:scale-105 group-hover:border-secondary/60" aria-hidden="true">
        <span className="absolute -top-1 left-2 text-[8px] text-secondary">✦</span>
        <span className="text-xl leading-none">ᕱ⑅ᕱ</span>
      </span>
      <span className={sizeClasses[size] + " font-[600] tracking-[-.09em] leading-none select-none font-[var(--font-logo)]"}>
        <span className="text-on-surface">ESTRO</span>
        <span className="bg-gradient-to-r from-primary via-[#ff3ddf] to-secondary bg-clip-text text-transparent">BUNNI</span>
        <span className="text-secondary/80">.xo</span>
      </span>
    </Link>
  );
}
