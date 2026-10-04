import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import Button from "@/components/ui/Button";
import GameCard from "@/components/ui/GameCard";
import GlassGameCard from "@/components/ui/GlassGameCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { GAME_CATEGORIES, getCategory, getGamesByCategory, toFeaturedGame, toGlassGame } from "@/lib/games/registry";
import {
  CATEGORY_SEO,
  SITE_URL,
  buildMetadata,
  breadcrumbSchema,
} from "@/lib/seo";

export function generateStaticParams() {
  return GAME_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seo = CATEGORY_SEO[slug];
  const games = category ? getGamesByCategory(category.gameCategory) : [];

  if (seo) {
    return buildMetadata({
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      path: `/categories/${slug}`,
    });
  }

  const category = getCategory(slug);

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
  const category = getCategory(slug);

  if (!category) notFound();

  const title = category.title;
  const description = category.description;
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
          <div className="pt-2">
            <Button href="/games" size="lg" className="rounded-xl">
              BROWSE ALL GAMES
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-14 sm:mt-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-black tracking-[.3em] text-secondary uppercase">CATEGORY // {title}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-secondary/30 to-transparent" />
          </div>
          {games.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              {games.filter((game) => game.kind === "featured").map((game) => (
                <GameCard key={game.slug} {...toFeaturedGame(game)} />
              ))}
              {games.filter((game) => game.kind === "glass").map((game) => (
                <div key={game.slug} className="md:col-span-4">
                  <GlassGameCard {...toGlassGame(game)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-8 text-center text-on-surface-variant">
              No games are currently assigned to this category.
            </div>
          )}
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
