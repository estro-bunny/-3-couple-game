interface StatCardProps {
  value: string;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="w-full rounded-xl border border-secondary/20 bg-surface-container-high px-5 py-4 text-center sm:px-6">
      <span className="block text-2xl font-black text-secondary sm:text-3xl">{value}</span>
      <span className="text-xs uppercase tracking-widest text-on-surface-variant">{label}</span>
    </div>
  );
}
