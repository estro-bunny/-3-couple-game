import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import { GAME_CATEGORIES, getFeaturedGames, getGlassGames, toFeaturedGame, toGlassGame } from "@/lib/games/registry";
import GameCard from "@/components/ui/GameCard";
import GlassGameCard from "@/components/ui/GlassGameCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import LovenseBridge from "@/components/lovense/LovenseBridge";
import ChaosRunTeaser from "@/components/games/ChaosRunTeaser";

export const metadata: Metadata = buildMetadata({
  title: "Chaos Den - EstroBunny's Burrow",
  description: "Enter the Chaos Den: eight playable games inside EstroBunny's Burrow.",
  keywords: ["couple games list", "all couple games online", "free couple games", "browse couple games"],
  path: "/games",
});

export default function GamesPage() {
  return (
    <PageShell>
      <section className="relative py-10 sm:py-16 md:py-24 px-4 sm:px-5 md:px-8 bg-surface cyber-grid overflow-hidden">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute top-[35rem] -left-40 h-96 w-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: "Chaos Den" }]} />

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mt-8 sm:mt-12 mb-10 sm:mb-14">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="bunny-sticker">02 // CHAOS DEN</span>
                <span className="bunny-sticker bunny-sticker-cyan">8 ROOMS ONLINE</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black font-headline tracking-[-.075em] leading-[.82]">
                PICK YOUR
                <span className="block text-primary">ROOM.</span>
              </h1>
              <p className="text-on-surface-variant text-base sm:text-lg mt-6 max-w-2xl leading-relaxed">
                Welcome to the Burrow's little collection of chaos machines. Pick one, play together, skip anything, and leave with zero account nonsense.
              </p>
            </div>
            <div className="hidden lg:block text-right pb-2">
              <div className="text-6xl">ᕱ⑅ᕱ</div>
              <div className="text-[9px] font-black tracking-[.25em] text-secondary uppercase mt-2">BUNNI CORE // READY</div>
            </div>
          </div>

          <div className="mb-6 sm:mb-8"><LovenseBridge /></div>
          <ChaosRunTeaser />

          <div className="flex items-center gap-4 mt-10 mb-5">
            <span className="text-[9px] font-black tracking-[.3em] text-primary uppercase">01 // FEATURED ROOMS</span>
            <div className="neon-rule flex-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            {getFeaturedGames().map((game) => {
              const category = GAME_CATEGORIES.find((item) => item.gameCategory === game.category);
              return <GameCard key={game.slug} {...toFeaturedGame(game)} categoryLabel={category?.title} />;
            })}
          </div>

          <div className="flex items-center gap-4 mt-14 mb-5">
            <span className="text-[9px] font-black tracking-[.3em] text-secondary uppercase">02 // THE REST OF THE BURROW</span>
            <div className="neon-rule flex-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {getGlassGames().map((game) => {
              const category = GAME_CATEGORIES.find((item) => item.gameCategory === game.category);
              return <GlassGameCard key={game.slug} {...toGlassGame(game)} categoryLabel={category?.title} />;
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
