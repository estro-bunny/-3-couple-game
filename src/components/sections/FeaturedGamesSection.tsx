import Link from "next/link";
import { FEATURED_GAMES, GLASS_GAMES } from "@/lib/constants";
import GameCard from "@/components/ui/GameCard";
import GlassGameCard from "@/components/ui/GlassGameCard";

export default function FeaturedGamesSection() {
  return (
    <section className="py-32 px-8 bg-surface" aria-label="Featured Couple Games">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl font-black font-headline tracking-tighter">
              FEATURED{" "}
              <span className="text-primary-container">GAMES</span>
            </h2>
            <p className="text-on-surface-variant mt-4 text-lg">
              Dive into our curated selection of couple games — from sexy dice to truth or dare.
            </p>
          </div>
          <Link
            className="text-primary font-bold hover:underline hidden md:block"
            href="/games"
          >
            VIEW ALL GAMES
          </Link>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {FEATURED_GAMES.map((game) => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>

        {/* Secondary row — glass cards */}
        <h3 className="text-2xl font-bold font-headline tracking-tight mt-16 mb-8 text-on-surface-variant">
          More Couple Games to Explore
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GLASS_GAMES.map((game) => (
            <GlassGameCard key={game.title} {...game} />
          ))}
        </div>
      </div>
    </section>
  );
}
