export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface CategoryItem {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface FeaturedGame {
  title: string;
  image: string;
  alt: string;
  buttonLabel: string;
  href: string;
  badge?: string;
  variant: "large" | "medium" | "small" | "wide";
  badgeColor?: "primary" | "secondary";
  description?: string;
}

export interface GlassGame {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface HighlightItem {
  icon: string;
  title: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface FeaturePoint {
  icon: string;
  text: string;
}

export interface FooterLink {
  label: string;
  href: string;
}
