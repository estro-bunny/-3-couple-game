import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import { FEATURED_GAMES, GLASS_GAMES } from "@/lib/constants";
import GameCard from "@/components/ui/GameCard";
import GlassGameCard from "@/components/ui/GlassGameCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "All Couple Games Online - Play Free Naughty & Romantic Games",
  description:
    "Browse our full collection of couple games including sexy dice, truth or dare, roulette, kama sutra cards, and more. Free online games designed for couples to play together.",
  keywords: [
    "couple games list",
    "all couple games online",
    "free naughty games",
    "browse couple games",
  ],
  path: "/games",
});

export default function GamesPage() {
  return (
    <PageShell>
      <section className="py-16 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: "Games" }]} />
          <h1 className="text-5xl font-black font-headline tracking-tighter mb-4">
            ALL <span className="text-primary-container">GAMES</span>
          </h1>
          <p className="text-on-surface-variant text-lg mb-8">
            Browse our full collection of couple games — from romantic and playful to intense and provocative. Every game is designed to bring partners closer together.
          </p>

          <h2 className="text-2xl font-bold font-headline tracking-tight mb-8 text-on-surface-variant">
            Featured Games
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {FEATURED_GAMES.map((game) => (
              <GameCard key={game.title} {...game} />
            ))}
          </div>

          <h2 className="text-2xl font-bold font-headline tracking-tight mt-16 mb-8 text-on-surface-variant">
            More Games to Explore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GLASS_GAMES.map((game) => (
              <GlassGameCard key={game.title} {...game} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
