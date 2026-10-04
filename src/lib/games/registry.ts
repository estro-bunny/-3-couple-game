import type { FeaturedGame, GlassGame } from "@/types";

export type GameVibe = "connection" | "chaos" | "flirty" | "romantic" | "playful";
export type GameKind = "featured" | "glass";
export type GameCategory = "vanilla" | "pg" | "mature" | "kinky-levels";

export interface GameDefinition {
  slug: string;
  title: string;
  description: string;
  href: string;
  kind: GameKind;
  vibe: GameVibe;
  category: GameCategory;
  playable: boolean;
  sessionEnabled: boolean;
  image?: string;
  alt?: string;
  buttonLabel?: string;
  variant?: FeaturedGame["variant"];
  icon?: string;
  badge?: string;
  badgeColor?: FeaturedGame["badgeColor"];
}

export const GAME_REGISTRY: readonly GameDefinition[] = [
  {
    slug: "sexy-dice",
    title: "SEXY DICE",
    description: "",
    href: "/games/sexy-dice",
    kind: "featured",
    vibe: "chaos",
    category: "mature",
    playable: true,
    sessionEnabled: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRTjr5qikYrrCqI7bVhaWpLB_OxhmG4wO3cCY0UXISSkJooJe9pr_TEAAFVq3o95tH3qZ6GvvdgyI0g1yy-nJkcl6kAzDs86FhmXRHrviNSegBgNfOw6oQDjHgBvYpc1aZmSMEwQpwKcu8uaTYZQc_wkeR-BST_XK-ydeY1lbs9xO_nNxA2i8yceMRo1dS9N-8hypefOs1AWh-o2nRDlI4GYfTTRELKfRbUTNtJJrVOZxmizmG638PF6qqJK7GD_1HsEKxW90uKHQ",
    alt: "cinematic close up of glowing neon pink dice on a dark reflective satin surface",
    buttonLabel: "ROLL NOW",
    variant: "large",
  },
  {
    slug: "sex-roulette-wheel",
    title: "SEX ROULETTE WHEEL",
    description: "",
    href: "/games/sex-roulette-wheel",
    kind: "featured",
    vibe: "flirty",
    category: "mature",
    playable: true,
    sessionEnabled: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZLFZJ_8J8RuBmpGxKPDws6hwSH81CojwrF9qAuXp6LHMleL3oQoFfgyOcDQUi2jDeBd3brCgaBFCRlqMEGEbqu0wWUS863Jbux1zM7mib7Rdnw8hEWBNl3TRtSWOKdJfijCOjOe1mAym_wd_XnjW_d_A8D1dUDLIlijgUhrLoZnJAp4oedglzyHavcvi1E0YhNqV2HQ35UpWGAwPEJ-8s0Y1PTkyWWV2dnJ0uzm1cCdXPIQh-le--5zLEdF557FfGPZgBhr-8P6Y",
    alt: "luxurious velvet roulette wheel with gold accents and neon violet lighting",
    buttonLabel: "SPIN TO WIN",
    variant: "medium",
  },
  {
    slug: "truth-or-dare",
    title: "TRUTH OR DARE",
    description: "",
    href: "/games/truth-or-dare",
    kind: "featured",
    vibe: "connection",
    category: "vanilla",
    playable: true,
    sessionEnabled: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYX14OnA3en3I2rGN_5m1-bm2tKQjy0x0RuFO2ll8sp05TRG3_WDSr2v6-_sHUyqA3wcADlndq19HGmYpr2cRZQNoJJhNm0PaEYw-gdsCpt0RxgHJlpmyt8rF5Rh0MBtPW9tHUKTf1BAiV8wUQzXE_8Z28BIkTEA7sc_zD0wHZ0YHU86B-vzPHO_CaOaqjhfofRjyItW2QNEtI6eOpDTUgr6oyrcemHg3NgM4ne0DDMcB38VTpfT71FRf9q4euR3HWscoJhxnLL4M",
    alt: "two silhouetted figures whispering in a dark room illuminated by magenta backlight",
    buttonLabel: "PLAY GAME",
    variant: "small",
  },
  {
    slug: "kama-sutra-cards",
    title: "KAMA SUTRA CARDS",
    description: "",
    href: "/games/kama-sutra-cards",
    kind: "featured",
    vibe: "romantic",
    category: "pg",
    playable: true,
    sessionEnabled: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5V8KlXHpBcR9U__5t2B-5ZZ3VSo-btfN3izBw_t6A8mlgJQWd5er08hG_n8vr_0Bo-PP3W-GiXM0e5y7vXwRp1vUCAQJtv1iVKbqtw57e1HK_Rmqnelo2_Ll1Fn_QKO6Ku2ktNJzjoae-VK1LYBuA1oe_yxuPD9d8mevT4jq66rairIh92vj1XPvsY0TwO7C7WDEARRuuIMXH6J74-cixo7Vg78A4NrBW1h5e6iMPWo7HP7qOeTRQ3_fP7XqpL5NVN9G4jF_-3sQ",
    alt: "elegant abstract golden line art representing intimacy on a deep charcoal background",
    buttonLabel: "DRAW A CARD",
    variant: "small",
  },
  {
    slug: "party-games",
    title: "PARTY GAMES",
    description: "Bring the heat to your social gatherings with moderated fun.",
    href: "/games/party-games",
    kind: "featured",
    vibe: "playful",
    category: "pg",
    playable: true,
    sessionEnabled: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl1Vq1MsYljDgTzukJFJee2xb3ARdViRwqbA8QhBKUbEqxdqeG9sOOm2NElP1KIcQVEci068OicKevTJ35Li4pTMutPM-fFkkFi1ctQ8VkWvPEZZfkr4x4Jm4VlzaW6hTH5UgXPTEYf_xKOwZjN5Ds4cM8IgRRE3jaVCFhOncnCvA4352y3P_-QyWFzpKBgjb4NkruYcyOIclO5dyOyGT7RIL4rRKaBU5wkpYP6qsr7JUAVlC9B-h27eK7GErNtcMODYfH7IbRCVM",
    alt: "blurry silhouettes at a stylish lounge party with electric violet neon lighting",
    buttonLabel: "START PARTY",
    variant: "wide",
  },
  {
    slug: "super-sex-dice",
    title: "SUPER SEX DICE",
    description: "Roll for a playful action and setting combination.",
    href: "/games/super-sex-dice",
    kind: "glass",
    vibe: "chaos",
    category: "mature",
    playable: true,
    sessionEnabled: true,
    icon: "casino",
  },
  {
    slug: "sexy-timer",
    title: "SEXY TIMER",
    description: "Choose a short countdown and play through a timed prompt.",
    href: "/games/sexy-timer",
    kind: "glass",
    vibe: "flirty",
    category: "mature",
    playable: true,
    sessionEnabled: true,
    icon: "timer",
  },
  {
    slug: "spin-the-bottle",
    title: "SPIN THE BOTTLE",
    description: "The classic game reimagined for a new era of digital intimacy.",
    href: "/games/spin-the-bottle",
    kind: "glass",
    vibe: "chaos",
    category: "pg",
    playable: true,
    sessionEnabled: true,
    icon: "liquor",
  },
];

export function getGame(slug: string) {
  return GAME_REGISTRY.find((game) => game.slug === slug);
}

export function getPlayableGames() {
  return GAME_REGISTRY.filter((game) => game.playable);
}

export function getGamesByVibe(vibe: GameVibe) {
  return GAME_REGISTRY.filter((game) => game.vibe === vibe);
}

export function getGamesByCategory(category: GameCategory) {
  return GAME_REGISTRY.filter((game) => game.category === category);
}

export function getFeaturedGames(): readonly GameDefinition[] {
  return GAME_REGISTRY.filter((game) => game.kind === "featured");
}

export function getGlassGames(): readonly GameDefinition[] {
  return GAME_REGISTRY.filter((game) => game.kind === "glass");
}

export function toFeaturedGame(game: GameDefinition): FeaturedGame {
  if (game.kind !== "featured" || !game.image || !game.alt || !game.buttonLabel || !game.variant) {
    throw new Error(`Game ${game.slug} is missing featured presentation metadata`);
  }

  return {
    title: game.title,
    image: game.image,
    alt: game.alt,
    buttonLabel: game.buttonLabel,
    href: game.href,
    variant: game.variant,
    description: game.description || undefined,
    badge: game.badge,
    badgeColor: game.badgeColor,
  };
}

export function toGlassGame(game: GameDefinition): GlassGame {
  if (game.kind !== "glass" || !game.icon) {
    throw new Error(`Game ${game.slug} is missing glass presentation metadata`);
  }

  return {
    icon: game.icon,
    title: game.title,
    description: game.description,
    href: game.href,
  };
}