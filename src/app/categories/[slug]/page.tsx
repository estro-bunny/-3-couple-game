import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { CATEGORIES } from "@/lib/constants";
import {
  CATEGORY_SEO,
  SITE_URL,
  buildMetadata,
  breadcrumbSchema,
} from "@/lib/seo";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    slug: c.title.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seo = CATEGORY_SEO[slug];

  if (seo) {
    return buildMetadata({
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      path: `/categories/${slug}`,
    });
  }

  const category = CATEGORIES.find(
    (c) => c.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  return buildMetadata({
    title: `${category?.title ?? slug} Couple Games | CouplePlayHub`,
    description:
      category?.description ?? "Explore games in this category.",
    path: `/categories/${slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORIES.find(
    (c) => c.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  const title = category?.title ?? slug.replace(/-/g, " ").toUpperCase();
  const description = category?.description ?? "Explore games in this category.";
  const seo = CATEGORY_SEO[slug];

  return (
    <PageShell>
      <section className="py-16 px-8 bg-surface-container-low min-h-[80vh]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Breadcrumbs
            items={[
              { label: "Categories", href: "/categories" },
              { label: title },
            ]}
          />
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter">
            {title}
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            {seo?.description ?? description}
          </p>
          <div className="pt-4">
            <Button href="/games" size="lg" className="rounded-xl">
              BROWSE GAMES
            </Button>
          </div>
          <p className="text-sm text-on-surface-variant opacity-60">
            Full category page coming soon with curated games for this intensity level.
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Categories", url: `${SITE_URL}/categories` },
              { name: title, url: `${SITE_URL}/categories/${slug}` },
            ])
          ),
        }}
      />
    </PageShell>
  );
}
