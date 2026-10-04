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
  primary:
    "bg-gradient-to-r from-primary to-primary-container text-on-primary",
  outline:
    "border border-primary/30 bg-surface-variant/20 backdrop-blur-md text-primary hover:bg-surface-variant/40",
  ghost: "text-on-surface-variant hover:text-primary",
  secondary: "bg-secondary text-on-secondary",
  glass: "bg-surface-bright/50 backdrop-blur-md",
};

const sizeStyles: Record<string, string> = {
  sm: "px-5 sm:px-6 py-2.5 text-sm",
  md: "px-6 sm:px-8 py-3",
  lg: "px-7 sm:px-10 py-4 sm:py-5 text-base sm:text-lg",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  size = "md",
  href,
  onClick,
  disabled,
}: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center text-center whitespace-nowrap rounded-lg font-bold transition-all duration-200 active:scale-95 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
