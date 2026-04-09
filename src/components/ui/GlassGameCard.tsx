import Link from "next/link";
import MaterialIcon from "./MaterialIcon";

interface GlassGameCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export default function GlassGameCard({
  icon,
  title,
  description,
  href,
}: GlassGameCardProps) {
  return (
    <div className="glass-card p-1 relative overflow-hidden rounded-2xl group border border-outline-variant/10">
      <div className="p-8 space-y-4">
        <MaterialIcon name={icon} className="text-primary text-4xl" filled />
        <h3 className="text-2xl font-headline font-extrabold uppercase">
          {title}
        </h3>
        <p className="text-on-surface-variant text-sm">{description}</p>
        <Link
          href={href}
          className="text-primary font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform"
        >
          PLAY NOW <MaterialIcon name="arrow_right_alt" />
        </Link>
      </div>
    </div>
  );
}
