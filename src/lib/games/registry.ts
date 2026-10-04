import { FEATURED_GAMES, GLASS_GAMES } from "@/lib/constants";

export type GameVibe = "connection" | "chaos" | "flirty" | "romantic" | "playful";
export type GameKind = "featured" | "glass";

export interface GameDefinition {
  slug: string;
  title: string;
  description: string;
  href: string;
  kind: GameKind;
  vibe: GameVibe;
  category: "vanilla" | "pg" | "xxx" | "kinky-levels";
  playable: boolean;
  sessionEnabled: boolean;
}

const slugFromTitle = (title: string) =>
  title.toLowerCase().replace(/\\s+/g, "-");

const FEATURED_VIBES: Record<string, GameVibe> = {
  "sexy-dice": "chaos",
  "sex-roulette-wheel": "flirty",
  "truth-or-dare": "connection",
  "kama-sutra-cards": "romantic",
  "party-games": "playful",
};

const GLASS_VIBES: Record<string, GameVibe> = {
  "super-sex-dice": "chaos",
  "sexy-timer": "flirty",
  "spin-the-bottle": "chaos",
};

const GAME_CATEGORIES: Record<string, GameDefinition["category"]> = {
  "truth-or-dare": "vanilla",
  "spin-the-bottle": "pg",
  "sex-roulette-wheel": "xxx",
  "kama-sutra-cards": "romantic",
  "party-games": "pg",
  "super-sex-dice": "xxx",
  "sexy-timer": "xxx",
  "sexy-dice": "xxx",
};

const featuredDefinitions: GameDefinition[] = FEATURED_GAMES.map((game) => {
  const slug = slugFromTitle(game.title);

  return {
    slug,
    title: game.title,
    description: game.description ?? "",
    href: game.href,
    kind: "featured",
    vibe: FEATURED_VIBES[slug] ?? "playful",
    category: GAME_CATEGORIES[slug] ?? "pg",
    playable: true,
    sessionEnabled: true,
  };
});

const glassDefinitions: GameDefinition[] = GLASS_GAMES.map((game) => {
  const slug = slugFromTitle(game.title);

  return {
    slug,
    title: game.title,
    description: game.description,
    href: game.href,
    kind: "glass",
    vibe: GLASS_VIBES[slug] ?? "playful",
    category: GAME_CATEGORIES[slug] ?? "pg",
    playable: true,
    sessionEnabled: true,
  };
});

export const GAME_REGISTRY: readonly GameDefinition[] = [
  ...featuredDefinitions,
  ...glassDefinitions,
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

export function getGamesByCategory(category: GameDefinition["category"]) {
  return GAME_REGISTRY.filter((game) => game.category === category);
}
