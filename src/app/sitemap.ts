import type { MetadataRoute } from "next";
import { getPlayableGames } from "@/lib/games/registry";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const games = getPlayableGames();

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
      url: `${SITE_URL}/games/${game.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
