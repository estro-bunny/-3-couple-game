import Link from "next/link";
import MaterialIcon from "./MaterialIcon";

interface GlassGameCardProps { icon: string; title: string; description: string; href: string; categoryLabel?: string; }

export default function GlassGameCard({ icon, title, description, href, categoryLabel }: GlassGameCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[1.5rem] border border-white/[.08] bg-[#100c15] p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_18px_55px_rgba(0,229,255,.08)]">
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-colors" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/[.05]">
            <MaterialIcon name={icon} className="text-2xl text-secondary group-hover:text-primary transition-colors" filled />
          </span>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[8px] font-black tracking-[.25em] text-primary/55 uppercase">CHAOS ROOM</span>
            {categoryLabel && <span className="bunny-sticker bunny-sticker-cyan">{categoryLabel}</span>}
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl font-headline font-black uppercase tracking-[-.04em] mt-6">{title}</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed mt-3 max-w-md">{description}</p>
        <Link href={href} className="mt-6 inline-flex min-h-11 items-center gap-2 text-primary font-black text-[11px] uppercase tracking-[.14em] group-hover:text-secondary transition-colors">
          OPEN ROOM <MaterialIcon name="arrow_right_alt" />
        </Link>
      </div>
    </article>
  );
}
