import MaterialIcon from "./MaterialIcon";

interface HighlightCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function HighlightCard({
  icon,
  title,
  description,
}: HighlightCardProps) {
  return (
    <div className="space-y-3 text-center sm:space-y-4">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-bright sm:mb-6 sm:h-20 sm:w-20">
        <MaterialIcon name={icon} className="text-3xl text-primary sm:text-4xl" />
      </div>
      <h3 className="font-headline text-xl font-bold sm:text-2xl">{title}</h3>
      <p className="leading-relaxed text-on-surface-variant">{description}</p>
    </div>
  );
}
