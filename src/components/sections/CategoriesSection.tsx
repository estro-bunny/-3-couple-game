import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import CategoryCard from "@/components/ui/CategoryCard";

export default function CategoriesSection() {
  return (
    <section className="py-24 px-8 bg-surface-container-low" aria-label="Game Categories">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-black tracking-[0.3em] text-primary uppercase mb-12 text-center">
          CHOOSE YOUR INTENSITY
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/categories" className="text-primary font-bold hover:underline text-sm">
            VIEW ALL CATEGORIES &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
