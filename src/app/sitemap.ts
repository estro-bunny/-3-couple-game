import type { MetadataRoute } from "next";
import { FEATURED_GAMES, GLASS_GAMES } from "@/lib/constants";
import { SITE_URL } from "@/lib/seo";

const toSlug = (title: string) => title.toLowerCase().replace(/\s+/g, "-");

export default function sitemap(): MetadataRoute.Sitemap {
  const games = [...FEATURED_GAMES, ...GLASS_GAMES];

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/games`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...games.map((game) => ({
      url: `${SITE_URL}/games/${toSlug(game.title)}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
