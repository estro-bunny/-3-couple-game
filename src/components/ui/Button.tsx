import type { ReactNode } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "outline" | "ghost" | "secondary" | "glass";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary border border-primary/70 shadow-[4px_4px_0_rgba(157,247,255,.35)] hover:shadow-[6px_6px_0_rgba(157,247,255,.42)] hover:-translate-x-0.5 hover:-translate-y-0.5",
  outline: "border border-secondary/40 bg-secondary/[.035] text-secondary hover:bg-secondary/10 hover:border-secondary shadow-[3px_3px_0_rgba(255,125,233,.20)]",
  ghost: "text-on-surface-variant hover:text-primary hover:bg-primary/5",
  secondary: "bg-secondary text-on-secondary border border-secondary/70 shadow-[4px_4px_0_rgba(255,125,233,.28)] hover:shadow-[6px_6px_0_rgba(255,125,233,.34)]",
  glass: "bg-white/[.06] border border-white/10 text-on-surface hover:bg-white/10",
};

const sizeStyles: Record<string, string> = {
  sm: "px-5 sm:px-6 py-2.5 text-[11px]",
  md: "px-6 sm:px-8 py-3.5 text-sm",
  lg: "px-7 sm:px-10 py-4 sm:py-5 text-base sm:text-lg",
};

export default function Button({ children, variant = "primary", className = "", size = "md", href, onClick, disabled = false }: ButtonProps) {
  const classes = "inline-flex min-h-11 items-center justify-center text-center whitespace-nowrap rounded-xl font-black uppercase tracking-[.08em] transition-all duration-200 active:translate-x-0.5 active:translate-y-0.5 disabled:pointer-events-none disabled:opacity-50 " + variantStyles[variant] + " " + sizeStyles[size] + " " + className;
  if (href && !disabled) return <Link href={href} className={classes}>{children}</Link>;
  if (href && disabled) return <span className={classes + " cursor-not-allowed opacity-50"} aria-disabled="true">{children}</span>;
  return <button className={classes} onClick={onClick} disabled={disabled}>{children}</button>;
}
