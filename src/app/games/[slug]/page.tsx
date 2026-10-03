import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Button from "@/components/ui/Button";
import GameBoard from "@/components/games/sexy-dice/GameBoard";
import TruthOrDareBoard from "@/components/games/truth-or-dare/TruthOrDareBoard";
import SpinTheBottleBoard from "@/components/games/spin-the-bottle/SpinTheBottleBoard";
import SexRouletteBoard from "@/components/games/sex-roulette/SexRouletteBoard";
import KamaSutraCardsBoard from "@/components/games/kama-sutra/KamaSutraCardsBoard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RelatedGames from "@/components/ui/RelatedGames";
import { FEATURED_GAMES, GLASS_GAMES } from "@/lib/constants";
import {
  GAME_SEO,
  SITE_URL,
  buildMetadata,
  gameSchema,
  breadcrumbSchema,
} from "@/lib/seo";

function toSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

export function generateStaticParams() {
  const allGames = [
    ...FEATURED_GAMES.map((g) => ({ slug: toSlug(g.title) })),
    ...GLASS_GAMES.map((g) => ({ slug: toSlug(g.title) })),
  ];
  return allGames;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seo = GAME_SEO[slug];

  if (seo) {
    return buildMetadata({
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      path: `/games/${slug}`,
    });
  }

  const featured = FEATURED_GAMES.find((g) => toSlug(g.title) === slug);
  const glass = GLASS_GAMES.find((g) => toSlug(g.title) === slug);
  const title = featured?.title ?? glass?.title ?? slug.replace(/-/g, " ");

  return buildMetadata({
    title: `${title} - Play Online | CouplePlayHub`,
    description: `Play ${title} online with your partner. A fun and exciting couple game designed to bring you closer together.`,
    path: `/games/${slug}`,
  });
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const featured = FEATURED_GAMES.find((g) => toSlug(g.title) === slug);
  const glass = GLASS_GAMES.find((g) => toSlug(g.title) === slug);

  const title =
    featured?.title ?? glass?.title ?? slug.replace(/-/g, " ").toUpperCase();
  const description =
    featured?.description ??
    glass?.description ??
    "Get ready for an unforgettable experience with your partner.";
  const image = featured?.image;
  const isSexyDice = slug === "sexy-dice";
  const isTruthOrDare = slug === "truth-or-dare";
  const isSpinTheBottle = slug === "spin-the-bottle";
  const isSexRoulette = slug === "sex-roulette-wheel";
  const isKamaSutraCards = slug === "kama-sutra-cards";

  const seo = GAME_SEO[slug];

  return (
    <PageShell>
      <section className="py-16 px-8 bg-surface min-h-[80vh]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Breadcrumbs
            items={[
              { label: "Games", href: "/games" },
              { label: title },
            ]}
          />
          {image && (
            <div className="relative h-[300px] rounded-2xl overflow-hidden mb-8">
              <img
                src={image}
                alt={`${title} - online couple game on CouplePlayHub`}
                className="absolute inset-0 w-full h-full object-cover opacity-40"
                loading="eager"
                width={800}
                height={300}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
            </div>
          )}
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter">
            {title}
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            {isSexyDice
              ? "Roll the dice and let fate decide your next intimate move. The most popular online dice game for couples."
              : isTruthOrDare
                ? "Take turns choosing Truth or Dare with a local-first deck built for connection, laughter, and easy skips."
                : isSpinTheBottle
                  ? "Take turns spinning the bottle and let a random pick decide who gets the next turn."
                  : isSexRoulette
                    ? "Spin the wheel and let chance choose the next playful moment for you both."
                    : isKamaSutraCards
                      ? "Draw a card for a romantic prompt, connection challenge, or conversation starter."
                      : seo?.description ?? description}
          </p>

          {isSexyDice ? (
            <GameBoard />
          ) : isTruthOrDare ? (
            <TruthOrDareBoard />
          ) : isSpinTheBottle ? (
            <SpinTheBottleBoard />
          ) : isSexRoulette ? (
            <SexRouletteBoard />
          ) : isKamaSutraCards ? (
            <KamaSutraCardsBoard />
          ) : (
            <>
              <div className="pt-4">
                <Button
                  size="lg"
                  className="rounded-xl shadow-[0_0_40px_rgba(255,0,255,0.3)]"
                >
                  PLAY NOW
                </Button>
              </div>
              <p className="text-sm text-on-surface-variant opacity-60">
                Full game coming soon. Stay tuned!
              </p>
            </>
          )}
        </div>
      </section>

      <RelatedGames currentSlug={slug} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            gameSchema({
              name: title,
              description: seo?.description ?? description,
              url: `${SITE_URL}/games/${slug}`,
              image,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Games", url: `${SITE_URL}/games` },
              { name: title, url: `${SITE_URL}/games/${slug}` },
            ])
          ),
        }}
      />
    </PageShell>
  );
}
