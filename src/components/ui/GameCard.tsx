import Link from "next/link";
import Button from "./Button";

interface GameCardProps {
  title: string; image: string; alt: string; buttonLabel: string; href: string;
  badge?: string; badgeColor?: "primary" | "secondary"; description?: string; categoryLabel?: string;
  variant: "large" | "medium" | "small" | "wide";
}

const variantConfig = {
  large: { container: "md:col-span-8 min-h-[430px] md:h-[540px]", padding: "p-6 sm:p-8 md:p-10", titleSize: "text-4xl sm:text-5xl md:text-6xl" },
  medium: { container: "md:col-span-4 min-h-[430px] md:h-[540px]", padding: "p-6 sm:p-7", titleSize: "text-3xl sm:text-4xl" },
  small: { container: "md:col-span-3 min-h-[350px]", padding: "p-5 sm:p-6", titleSize: "text-xl" },
  wide: { container: "md:col-span-6 min-h-[350px]", padding: "p-5 sm:p-7", titleSize: "text-2xl sm:text-3xl" },
};

export default function GameCard({ title, image, alt, buttonLabel, href, badge, badgeColor = "primary", description, categoryLabel, variant }: GameCardProps) {
  const config = variantConfig[variant];
  const badgeClass = badgeColor === "secondary"
    ? "border-secondary/30 bg-secondary/10 text-secondary"
    : "border-primary/30 bg-primary/10 text-primary";

  return (
    <article className={"relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0b0810] group transition-transform duration-500 hover:-translate-y-1 " + config.container}>
      <img className="absolute inset-0 w-full h-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-45" src={image} alt={alt || title} loading={variant === "large" ? "eager" : "lazy"} width={variant === "large" ? 800 : 400} height={variant === "large" ? 500 : 400} />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,36,214,.12),transparent_38%),linear-gradient(0deg,#08070d_5%,rgba(8,7,13,.55)_55%,rgba(8,7,13,.08))]" />
      <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/25 rounded-[1.7rem] transition-colors pointer-events-none" />

      <div className={"absolute bottom-0 left-0 w-full " + config.padding}>
        <div className="flex flex-wrap gap-2 mb-4">
          {categoryLabel && <span className="bunny-sticker bunny-sticker-cyan">{categoryLabel}</span>}
          {badge && <span className={"bunny-sticker " + badgeClass}>{badge}</span>}
        </div>

        <div className="flex items-end justify-between gap-4">
          <h3 className={config.titleSize + " font-headline font-black uppercase tracking-[-.055em] leading-[.9] max-w-[85%]"}>{title}</h3>
          <span className="hidden sm:block text-3xl text-secondary/60 rotate-[-12deg]" aria-hidden="true">ᕱ⑅ᕱ</span>
        </div>

        {description && <p className="text-on-surface-variant max-w-xl text-sm leading-relaxed mt-4">{description}</p>}

        <div className="mt-5">
          {variant === "large" ? <Button href={href} size="md">{buttonLabel} ♡</Button> :
           variant === "medium" ? <Button href={href} variant="outline" size="sm">{buttonLabel}</Button> :
           variant === "wide" ? <Button href={href} variant="secondary" size="md">{buttonLabel}</Button> :
           <Link href={href} className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[.045] font-black text-[11px] uppercase tracking-[.12em] text-on-surface hover:bg-primary/10 hover:border-primary/30 transition-all">{buttonLabel} →</Link>}
        </div>
      </div>
    </article>
  );
}
