import Link from "next/link";
import Button from "./Button";

interface GameCardProps {
  title: string; image: string; alt: string; buttonLabel: string; href: string;
  badge?: string; badgeColor?: "primary" | "secondary"; description?: string; categoryLabel?: string;
  variant: "large" | "medium" | "small" | "wide";
}
const variantConfig = {
  large: { container: "md:col-span-8 aspect-[16/10] md:aspect-auto md:h-[520px]", imgOpacity: "opacity-45", padding: "p-5 sm:p-7 md:p-10", titleSize: "text-3xl sm:text-4xl md:text-5xl" },
  medium: { container: "md:col-span-4 h-[520px]", imgOpacity: "opacity-45", padding: "p-5 sm:p-7 md:p-8", titleSize: "text-2xl sm:text-3xl leading-tight" },
  small: { container: "md:col-span-3 h-[390px]", imgOpacity: "opacity-30", padding: "p-5 sm:p-6", titleSize: "text-lg sm:text-xl" },
  wide: { container: "md:col-span-6 h-[390px]", imgOpacity: "opacity-30", padding: "p-5 sm:p-7 md:p-10", titleSize: "text-xl sm:text-2xl" },
};
export default function GameCard({ title, image, alt, buttonLabel, href, badge, badgeColor = "primary", description, categoryLabel, variant }: GameCardProps) {
  const config = variantConfig[variant];
  const badgeBg = badgeColor === "secondary" ? "bg-secondary-container text-on-secondary" : "bg-primary-container text-on-primary";
  return (
    <article className={`relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-surface-container-high group animate-chroma-pulse ${config.container}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,125,233,.16),transparent_35%)] pointer-events-none" />
      <img className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${config.imgOpacity}`} src={image} alt={alt || `${title} - online couple game on CouplePlayHub`} loading={variant === "large" ? "eager" : "lazy"} width={variant === "large" ? 800 : 400} height={variant === "large" ? 500 : 400} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08070d] via-[#08070d]/25 to-transparent" />
      <div className={`absolute bottom-0 ${config.padding} space-y-3 sm:space-y-4 w-full`}>
        {categoryLabel && <span className="inline-block text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[.2em] bg-black/50 border border-secondary/30 text-secondary backdrop-blur-md">{categoryLabel}</span>}
        {badge && <span className={`${badgeBg} inline-block text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest`}>{badge}</span>}
        <div className="flex items-end justify-between gap-3 sm:gap-4">
          <h3 className={`${config.titleSize} font-headline font-black uppercase tracking-[-.04em]`}>{title}</h3>
          <span className="hidden sm:block shrink-0 text-secondary/70 text-[9px] font-black tracking-[.25em] uppercase">PLAY // 01</span>
        </div>
        {description && <p className="text-on-surface-variant max-w-sm text-sm leading-relaxed">{description}</p>}
        {variant === "large" ? <Button href={href} size="md">{buttonLabel} ♡</Button> :
          variant === "medium" ? <Button href={href} variant="outline" size="sm">{buttonLabel}</Button> :
          variant === "wide" ? <Button href={href} variant="secondary" size="md">{buttonLabel}</Button> :
          <Link href={href} className="inline-flex min-h-11 w-full items-center justify-center bg-white/5 hover:bg-primary/15 border border-white/10 hover:border-primary/40 backdrop-blur-md rounded-lg font-bold text-sm text-center transition-all">{buttonLabel} →</Link>}
      </div>
    </article>
  );
}
