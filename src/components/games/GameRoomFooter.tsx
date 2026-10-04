import Link from "next/link";

export default function GameRoomFooter({ title }: { title: string }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-low">
      <div className="grid sm:grid-cols-3">
        <Link href="/games" className="group border-b border-outline-variant/10 p-5 transition-colors hover:bg-secondary/5 sm:border-b-0 sm:border-r">
          <p className="text-[9px] font-black uppercase tracking-[.25em] text-secondary/70">EXIT ROOM</p>
          <p className="mt-2 text-sm font-black uppercase group-hover:text-secondary">← CHAOS DEN</p>
        </Link>
        <Link href="/games/chaos-run" className="group border-b border-outline-variant/10 p-5 transition-colors hover:bg-primary/5 sm:border-b-0 sm:border-r">
          <p className="text-[9px] font-black uppercase tracking-[.25em] text-primary/70">KEEP GOING</p>
          <p className="mt-2 text-sm font-black uppercase group-hover:text-primary">CHAOS RUN →</p>
        </Link>
        <div className="p-5">
          <p className="text-[9px] font-black uppercase tracking-[.25em] text-on-surface-variant/60">ROOM RULES</p>
          <p className="mt-2 text-sm font-black uppercase">SKIP ANYTHING ♡</p>
          <p className="mt-1 text-xs text-on-surface-variant">You are always allowed to stop.</p>
        </div>
      </div>
      <div className="border-t border-outline-variant/10 px-5 py-3 text-[9px] font-black uppercase tracking-[.18em] text-on-surface-variant/50">
        {title} // ESTROBUNNY'S BURROW // NO ACCOUNT // LOCAL-FIRST
      </div>
    </div>
  );
}
