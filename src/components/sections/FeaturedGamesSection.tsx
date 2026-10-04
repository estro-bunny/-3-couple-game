import Link from "next/link";
import { getFeaturedGames, getGlassGames, toFeaturedGame, toGlassGame } from "@/lib/games/registry";
import GameCard from "@/components/ui/GameCard";
import GlassGameCard from "@/components/ui/GlassGameCard";

export default function FeaturedGamesSection() {
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 bg-surface overflow-hidden" aria-label="Featured Couple Games">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[9px] font-black tracking-[.3em] text-secondary uppercase">02 // CHAOS DEN</span>
              <span className="h-px w-14 bg-secondary/30" />
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black font-headline tracking-[-.065em] leading-[.85]">
              PICK A ROOM.
              <span className="block text-primary">CAUSE TROUBLE.</span>
            </h2>
            <p className="text-on-surface-variant mt-5 text-sm sm:text-base max-w-xl leading-relaxed">
              Eight playable Burrow rooms. No leaderboard. No fake stats. Just little machines for making a night together more interesting.
            </p>
          </div>
          <Link className="bunny-sticker hover:bg-primary/15 transition-colors self-start md:self-auto" href="/games">
            OPEN CHAOS DEN →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {getFeaturedGames().map(toFeaturedGame).map((game) => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>

        <div className="flex items-center gap-4 mt-14 mb-6">
          <span className="text-[9px] font-black tracking-[.3em] text-secondary uppercase">03 // MORE TROUBLE</span>
          <div className="neon-rule flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {getGlassGames().map(toGlassGame).map((game) => (
            <GlassGameCard key={game.title} {...game} />
          ))}
        </div>
      </div>
    </section>
  );
}
