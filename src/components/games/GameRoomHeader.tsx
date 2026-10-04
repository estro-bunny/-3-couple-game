import Link from "next/link";

interface GameRoomHeaderProps {
  title: string;
  vibe: string;
  category: string;
  sessionActive?: boolean;
  image?: string;
}

export default function GameRoomHeader({
  title,
  vibe,
  category,
  sessionActive = false,
  image,
}: GameRoomHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-surface-container-low shadow-[0_0_90px_rgba(255,125,233,.07)]">
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      {image && (
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-[0.08] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/70" />
        </div>
      )}

      <div className="relative p-5 sm:p-7 md:p-8 text-left">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <Link
            href="/games"
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-secondary/20 bg-secondary/5 px-3 text-[10px] font-black uppercase tracking-[.2em] text-secondary hover:border-secondary/50 hover:bg-secondary/10 transition-colors"
          >
            <span aria-hidden="true">←</span>
            CHAOS DEN
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-secondary/30 bg-secondary/5 px-3 text-[10px] font-black uppercase tracking-[.16em] text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(0,229,255,.9)]" />
              ROOM // ONLINE
            </span>
            {sessionActive && (
              <span className="inline-flex min-h-10 items-center rounded-xl border border-primary/30 bg-primary/10 px-3 text-[10px] font-black uppercase tracking-[.16em] text-primary">
                CHAOS RUN // ACTIVE
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.32em] text-primary/80">
              CHAOS DEN // ROOM {category.toUpperCase()}
            </p>
            <div className="mt-3 flex items-start gap-3"><span className="hidden sm:block text-3xl leading-none text-primary/70">ᕱ⑅ᕱ</span><h2 className="mt-3 text-4xl sm:text-5xl md:text-7xl font-black font-headline tracking-[-.06em] leading-[.92]">
              {title}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-primary">
                VIBE // {vibe}
              </span>
              <span className="rounded-lg border border-outline-variant/20 bg-surface px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-on-surface-variant">
                SKIP ANYTHING
              </span>
              <span className="rounded-lg border border-outline-variant/20 bg-surface px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-on-surface-variant">
                LOCAL-FIRST
              </span>
            </div>
          </div>

          <div className="hidden md:block text-right">
            <div className="text-[9px] font-black uppercase tracking-[.28em] text-on-surface-variant/60">
              BUNNI CORE
            </div>
            <div className="mt-1 text-xl font-black text-secondary">ᕱ⑅ᕱ ONLINE</div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-secondary/10 px-5 sm:px-7 md:px-8 py-3 flex flex-wrap items-center justify-between gap-2 text-[9px] font-black uppercase tracking-[.2em] text-on-surface-variant/60">
        <span>PLAY NICE. OR DON'T. JUST CONSENT.</span>
        <span className="text-primary/60">NO ACCOUNT // NO PRESSURE // ALWAYS YOUR RULES</span>
      </div>
    </div>
  );
}
