import Link from "next/link";
import Button from "./Button";

interface GameCardProps {
  title: string;
  image: string;
  alt: string;
  buttonLabel: string;
  href: string;
  badge?: string;
  badgeColor?: "primary" | "secondary";
  description?: string;
  variant: "large" | "medium" | "small" | "wide";
}

const variantConfig = {
  large: {
    container: "md:col-span-8 aspect-[16/9] md:aspect-auto md:h-[500px]",
    imgOpacity: "opacity-60",
    padding: "p-10",
    titleSize: "text-4xl",
  },
  medium: {
    container: "md:col-span-4 h-[500px]",
    imgOpacity: "opacity-60",
    padding: "p-8",
    titleSize: "text-3xl leading-tight",
  },
  small: {
    container: "md:col-span-3 h-[400px]",
    imgOpacity: "opacity-40",
    padding: "p-6",
    titleSize: "text-xl",
  },
  wide: {
    container: "md:col-span-6 h-[400px]",
    imgOpacity: "opacity-40",
    padding: "p-10",
    titleSize: "text-2xl",
  },
};

export default function GameCard({
  title,
  image,
  alt,
  buttonLabel,
  href,
  badge,
  badgeColor = "primary",
  description,
  variant,
}: GameCardProps) {
  const config = variantConfig[variant];
  const badgeBg =
    badgeColor === "secondary"
      ? "bg-secondary-container text-on-secondary-container"
      : "bg-primary-container text-on-primary";

  return (
    <article
      className={`${config.container} group relative overflow-hidden rounded-2xl bg-surface-container-high border border-outline-variant/20`}
    >
      <img
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${config.imgOpacity}`}
        src={image}
        alt={alt || `${title} - online couple game on CouplePlayHub`}
        loading={variant === "large" ? "eager" : "lazy"}
        width={variant === "large" ? 800 : 400}
        height={variant === "large" ? 500 : 400}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className={`absolute bottom-0 ${config.padding} space-y-4`}>
        {badge && (
          <span
            className={`${badgeBg} text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest`}
          >
            {badge}
          </span>
        )}
        <h3 className={`${config.titleSize} font-headline font-black uppercase`}>
          {title}
        </h3>
        {description && (
          <p className="text-on-surface-variant max-w-sm">{description}</p>
        )}
        {variant === "large" ? (
          <Button href={href} size="md">
            {buttonLabel}
          </Button>
        ) : variant === "medium" ? (
          <Button href={href} variant="outline" size="sm">
            {buttonLabel}
          </Button>
        ) : variant === "wide" ? (
          <Button href={href} variant="secondary" size="md">
            {buttonLabel}
          </Button>
        ) : (
          <Link
            href={href}
            className="block w-full py-3 bg-surface-bright/50 backdrop-blur-md rounded-lg font-bold text-sm text-center"
          >
            {buttonLabel}
          </Link>
        )}
      </div>
    </article>
  );
}
