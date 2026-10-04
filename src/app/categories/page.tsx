import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import { GAME_CATEGORIES } from "@/lib/games/registry";
import CategoryCard from "@/components/ui/CategoryCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Burrow Vibes - EstroBunny's Burrow",
  description: "Choose the Burrow vibe that matches the kind of chaos you want tonight.",
  keywords: ["couple game categories", "relationship game vibes", "romantic games", "playful couple games"],
  path: "/categories",
});

export default function CategoriesPage() {
  return (
    <PageShell>
      <section className="relative py-10 sm:py-16 px-4 sm:px-8 bg-surface-container-low min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: "Burrow Vibes" }]} />
          <div className="max-w-3xl mt-8 sm:mt-12 mb-10 sm:mb-14">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="bunny-sticker">01 // BURROW MOODS</span>
              <span className="bunny-sticker bunny-sticker-cyan">PICK YOUR ENERGY</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black font-headline tracking-[-.075em] leading-[.82]">
              WHAT KIND OF
              <span className="block text-primary">TROUBLE?</span>
            </h1>
            <p className="text-on-surface-variant text-base sm:text-lg mt-6 max-w-2xl leading-relaxed">
              There is no correct mood. Pick the one that sounds like you tonight,
              then make the rules yours.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {GAME_CATEGORIES.map((category) => <CategoryCard key={category.slug} {...category} />)}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
