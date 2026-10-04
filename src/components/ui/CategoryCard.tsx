import Link from "next/link";
import MaterialIcon from "./MaterialIcon";

interface CategoryCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export default function CategoryCard({
  icon,
  title,
  description,
  href,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="glass-card min-h-44 p-5 sm:p-8 rounded-xl flex flex-col items-center text-center gap-3 sm:gap-4 border border-outline-variant/10 hover:border-primary/40 transition-all cursor-pointer group"
    >
      <MaterialIcon
        name={icon}
        className="text-4xl sm:text-5xl text-on-surface-variant group-hover:text-primary transition-colors"
      />
      <h3 className="font-headline font-bold text-lg sm:text-xl">{title}</h3>
      <p className="text-on-surface-variant text-sm leading-relaxed">{description}</p>
    </Link>
  );
}
