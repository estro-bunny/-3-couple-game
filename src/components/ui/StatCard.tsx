interface StatCardProps {
  value: string;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-surface-container-high px-6 py-4 rounded-xl border border-secondary/20">
      <span className="block text-3xl font-black text-secondary">{value}</span>
      <span className="text-xs uppercase tracking-widest">{label}</span>
    </div>
  );
}
