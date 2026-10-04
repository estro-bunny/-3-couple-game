import Link from "next/link";
import MaterialIcon from "./MaterialIcon";

interface GlassGameCardProps { icon: string; title: string; description: string; href: string; categoryLabel?: string; }

export default function GlassGameCard({ icon, title, description, href, categoryLabel }: GlassGameCardProps) {
  return (
    <div className="glass-card p-1 relative overflow-hidden rounded-2xl group hover:-translate-y-1 transition-transform duration-300">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors" />
      <div className="p-5 sm:p-7 md:p-8 space-y-4 relative">
        <div className="flex items-center justify-between gap-3">
          <MaterialIcon name={icon} className="text-secondary text-3xl sm:text-4xl group-hover:text-primary transition-colors" filled />
          <div className="flex items-center gap-2"><span className="text-[9px] font-black tracking-[.2em] sm:tracking-[.25em] text-primary/50">CHAOS MODE</span>{categoryLabel && <span className="rounded-full border border-secondary/30 bg-secondary/5 px-2 py-1 text-[8px] font-black uppercase tracking-[.16em] text-secondary">{categoryLabel}</span>}</div>
        </div>
        <h3 className="text-xl sm:text-2xl font-headline font-extrabold uppercase tracking-[-.03em]">{title}</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">{description}</p>
        <Link
          href={href}
          className="min-h-11 text-primary font-black text-sm flex items-center gap-2 group-hover:text-secondary transition-colors"
        >
          PLAY NOW <MaterialIcon name="arrow_right_alt" />
        </Link>
      </div>
    </div>
  );
}
