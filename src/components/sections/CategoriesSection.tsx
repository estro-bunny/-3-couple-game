import Link from "next/link";
import { GAME_CATEGORIES } from "@/lib/games/registry";
import CategoryCard from "@/components/ui/CategoryCard";

export default function CategoriesSection() {
  return (
    <section className="relative py-24 px-5 md:px-8 bg-surface-container-low overflow-hidden" aria-label="Game Categories">
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-[10px] font-black tracking-[.35em] text-secondary uppercase mb-3">01 // PICK YOUR ENERGY</p>
            <h2 className="text-4xl md:text-6xl font-black font-headline tracking-[-.05em]">
              YOUR VIBE.<span className="text-primary"> YOUR RULES.</span>
            </h2>
          </div>
          <Link href="/categories" className="text-primary font-black text-sm hover:text-secondary transition-colors">
            VIEW ALL CATEGORIES →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {GAME_CATEGORIES.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
