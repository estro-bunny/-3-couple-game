import Link from "next/link";
import { GAME_CATEGORIES } from "@/lib/games/registry";
import CategoryCard from "@/components/ui/CategoryCard";

export default function CategoriesSection() {
  return (
    <section className="relative py-24 md:py-28 px-5 md:px-8 bg-surface-container-low overflow-hidden" aria-label="Game Categories">
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <div className="text-[9px] font-black tracking-[.3em] text-primary uppercase mb-4">01 // BURROW MOODS</div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-headline tracking-[-.06em] leading-[.88]">
              WHAT KIND OF
              <span className="block text-secondary">TROUBLE TODAY?</span>
            </h2>
          </div>
          <Link href="/categories" className="text-primary font-black text-[10px] uppercase tracking-[.18em] hover:text-secondary transition-colors">
            OPEN VIBE MAP →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GAME_CATEGORIES.map((category) => <CategoryCard key={category.title} {...category} />)}
        </div>
      </div>
    </section>
  );
}
