import { HERO_BG_IMAGE } from "@/lib/constants";
import Button from "@/components/ui/Button";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[921px] flex flex-col items-center justify-center text-center px-4 hero-gradient overflow-hidden"
      aria-label="Welcome to CouplePlayHub"
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: `url('${HERO_BG_IMAGE}')` }}
        role="img"
        aria-label="Romantic couple gaming atmosphere"
      />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-8xl font-black font-headline tracking-tighter text-on-surface leading-[0.95]">
          ONLINE SEX GAMES <br />
          <span className="bg-gradient-to-r from-primary via-primary-container to-secondary text-transparent bg-clip-text">
            FOR NAUGHTY COUPLES
          </span>
        </h1>
        <p className="text-on-surface-variant text-xl md:text-2xl max-w-2xl mx-auto font-medium">
          Discover the best couple games online — from romantic truth or dare to
          sexy dice and spicy roulette. Break the routine and reignite the spark
          tonight.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button
            href="/games"
            size="lg"
            className="rounded-xl shadow-[0_0_40px_rgba(255,0,255,0.3)] hover:shadow-[0_0_60px_rgba(255,0,255,0.5)]"
          >
            START PLAYING NOW
          </Button>
          <Button
            href="/categories"
            variant="outline"
            size="lg"
            className="rounded-xl"
          >
            BROWSE CATEGORIES
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <MaterialIcon
          name="keyboard_double_arrow_down"
          className="text-primary text-4xl"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
