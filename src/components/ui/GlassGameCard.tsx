import Link from "next/link";
import MaterialIcon from "./MaterialIcon";

interface GlassGameCardProps { icon: string; title: string; description: string; href: string; }

export default function GlassGameCard({ icon, title, description, href }: GlassGameCardProps) {
  return (
    <div className="glass-card p-1 relative overflow-hidden rounded-2xl group hover:-translate-y-1 transition-transform duration-300">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors" />
      <div className="p-7 md:p-8 space-y-4 relative">
        <div className="flex items-center justify-between">
          <MaterialIcon name={icon} className="text-secondary text-4xl group-hover:text-primary transition-colors" filled />
          <span className="text-[9px] font-black tracking-[.25em] text-primary/50">CHAOS MODE</span>
        </div>
        <h3 className="text-2xl font-headline font-extrabold uppercase tracking-[-.03em]">{title}</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">{description}</p>
        <Link href={href} className="text-primary font-black text-sm flex items-center gap-2 group-hover:text-secondary transition-colors">
          PLAY NOW <MaterialIcon name="arrow_right_alt" />
        </Link>
      </div>
    </div>
  );
}
