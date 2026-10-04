import Link from "next/link";
import MaterialIcon from "./MaterialIcon";

interface CategoryCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export default function CategoryCard({ icon, title, description, href }: CategoryCardProps) {
  return (
    <Link href={href} className="group relative min-h-48 overflow-hidden rounded-[1.4rem] border border-white/[.08] bg-[#100c15] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_18px_50px_rgba(255,0,255,.12)]">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors" />
      <div className="relative flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-secondary/20 bg-secondary/[.045]">
          <MaterialIcon name={icon} className="text-2xl text-secondary group-hover:text-primary transition-colors" />
        </span>
        <span className="text-[9px] font-black tracking-[.2em] text-primary/45 group-hover:text-primary transition-colors">VIBE →</span>
      </div>
      <div className="relative mt-8">
        <h3 className="font-headline font-black text-lg sm:text-xl tracking-tight uppercase">{title}</h3>
        <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed mt-2">{description}</p>
      </div>
    </Link>
  );
}
