import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import { FEATURED_GAMES, GLASS_GAMES } from "@/lib/constants";
import GameCard from "@/components/ui/GameCard";
import GlassGameCard from "@/components/ui/GlassGameCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import LovenseBridge from "@/components/lovense/LovenseBridge";

export const metadata: Metadata = buildMetadata({
  title: "All Couple Games Online - Play Free Naughty & Romantic Games",
  description: "Browse the playable CouplePlayHub library: dice, truth or dare, roulette, cards, timers, spins and party games.",
  keywords: ["couple games list", "all couple games online", "free couple games", "browse couple games"],
  path: "/games",
});

export default function GamesPage() {
  return (
    <PageShell>
      <section className="relative py-10 sm:py-16 md:py-24 px-4 sm:px-5 md:px-8 bg-surface cyber-grid overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,255,.12),transparent_40%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: "Games" }]} />
          <div className="max-w-4xl mt-7 sm:mt-10 mb-10 sm:mb-14">
            <p className="text-[10px] font-black tracking-[.35em] text-secondary uppercase mb-4">02 // CHAOS LIBRARY</p>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black font-headline tracking-[-.07em] leading-[.88]">
              PICK A GAME.<br /><span className="text-primary">CAUSE TROUBLE.</span>
            </h1>
            <p className="text-on-surface-variant text-base sm:text-lg md:text-xl mt-5 sm:mt-6 max-w-2xl leading-relaxed">
              Eight playable games. No account. No fake leaderboard. No pretending we're normal.
              Built queer-friendly: no assigned gender roles, no heterosexual assumptions. Pick one, play together, skip whatever you don't vibe with.
            </p>
          </div>

          <div className="mb-6 sm:mb-8"><LovenseBridge /></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {FEATURED_GAMES.map((game) => <GameCard key={game.title} {...game} />)}
          </div>

          <div className="flex items-center gap-3 sm:gap-4 mt-12 sm:mt-16 mb-6 sm:mb-7">
            <span className="text-[10px] font-black tracking-[.3em] text-secondary uppercase">MORE CHAOS</span>
            <div className="h-px flex-1 bg-gradient-to-r from-secondary/30 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {GLASS_GAMES.map((game) => <GlassGameCard key={game.title} {...game} />)}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
