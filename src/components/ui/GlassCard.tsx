import type { ReactNode } from "react";
interface GlassCardProps { children: ReactNode; className?: string; }
export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return <div className={`glass-card w-full rounded-xl border border-outline-variant/10 ${className}`}>{children}</div>;
}
