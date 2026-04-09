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
    <div className="text-center space-y-4">
      <div className="w-20 h-20 bg-surface-bright rounded-full flex items-center justify-center mx-auto mb-6">
        <MaterialIcon name={icon} className="text-primary text-4xl" />
      </div>
      <h3 className="text-2xl font-bold font-headline">{title}</h3>
      <p className="text-on-surface-variant">{description}</p>
    </div>
  );
}
