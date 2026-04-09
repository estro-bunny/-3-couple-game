import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import { CATEGORIES } from "@/lib/constants";
import CategoryCard from "@/components/ui/CategoryCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Game Categories - Choose Your Intensity Level",
  description:
    "Browse couple game categories from soft and romantic Vanilla to intense XXX and Kinky Levels. Pick the intensity that matches your mood for the perfect date night.",
  keywords: [
    "couple game categories",
    "types of couple games",
    "romantic game levels",
    "naughty game intensity",
  ],
  path: "/categories",
});

export default function CategoriesPage() {
  return (
    <PageShell>
      <section className="py-16 px-8 bg-surface-container-low min-h-[80vh]">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: "Categories" }]} />
          <h1 className="text-5xl font-black font-headline tracking-tighter mb-4 text-center">
            CHOOSE YOUR <span className="text-primary">INTENSITY</span>
          </h1>
          <p className="text-on-surface-variant text-lg mb-16 text-center max-w-2xl mx-auto">
            Pick a category that matches your mood tonight. From gentle romance to boundary-pushing excitement, we have the perfect couple games for every desire.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
