import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import Button from "@/components/ui/Button";
import GameBoard from "@/components/games/sexy-dice/GameBoard";
import TruthOrDareBoard from "@/components/games/truth-or-dare/TruthOrDareBoard";
import SpinTheBottleBoard from "@/components/games/spin-the-bottle/SpinTheBottleBoard";
import SexRouletteBoard from "@/components/games/sex-roulette/SexRouletteBoard";
import KamaSutraCardsBoard from "@/components/games/kama-sutra/KamaSutraCardsBoard";
import PartyGamesBoard from "@/components/games/party-games/PartyGamesBoard";
import SuperDiceBoard from "@/components/games/super-dice/SuperDiceBoard";
import SexyTimerBoard from "@/components/games/sexy-timer/SexyTimerBoard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GameRoomHeader from "@/components/games/GameRoomHeader";
import ChaosRunHud from "@/components/games/ChaosRunHud";
import ChaosRunHandoff from "@/components/games/ChaosRunHandoff";
import GameRoomFooter from "@/components/games/GameRoomFooter";
import RelatedGames from "@/components/ui/RelatedGames";
import { GAME_REGISTRY, getGame } from "@/lib/games/registry";
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
  return GAME_REGISTRY.map((game) => ({ slug: game.slug }));
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

  const game = getGame(slug);
  const title = game?.title ?? slug.replace(/-/g, " ");

  return buildMetadata({
    title: `${title} - Chaos Room | EstroBunny's Burrow`,
    description: `Play ${title} inside EstroBunny's Burrow. A local-first game room for partners who want cute chaos without the pressure.`,
    path: `/games/${slug}`,
  });
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGame(slug);

  if (!game) notFound();

  const title = game.title;
  const description = game.description || "Get ready for an unforgettable experience with your partner.";
  const image = "image" in game ? game.image : undefined;
  const isSexyDice = slug === "sexy-dice";
  const isTruthOrDare = slug === "truth-or-dare";
  const isSpinTheBottle = slug === "spin-the-bottle";
  const isSexRoulette = slug === "sex-roulette-wheel";
  const isKamaSutraCards = slug === "kama-sutra-cards";
  const isPartyGames = slug === "party-games";
  const isSuperDice = slug === "super-sex-dice";
  const isSexyTimer = slug === "sexy-timer";

  const seo = GAME_SEO[slug];

  return (
    <PageShell>
      <section className="py-10 sm:py-16 px-4 sm:px-8 bg-surface min-h-[80vh]">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <Breadcrumbs
            items={[
              { label: "Chaos Den", href: "/games" },
              { label: title },
            ]}
          />
          <ChaosRunHud currentSlug={slug} />
          <GameRoomHeader
            title={title}
            vibe={game.vibe}
            category={game.category}
            sessionActive={false}
            image={image}
          />
          {image && (
            <div className="relative h-[150px] sm:h-[220px] rounded-2xl overflow-hidden mt-5 border border-primary/10">
              <img
                src={image}
                alt={`${title} room atmosphere inside EstroBunny's Burrow`}
                className="absolute inset-0 w-full h-full object-cover opacity-45"
                loading="eager"
                width={800}
                height={300}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between gap-3">
                <span className="text-[9px] font-black uppercase tracking-[.25em] text-secondary">ROOM ATMOSPHERE // SIGNAL LOCKED</span>
                <span className="hidden sm:block text-[9px] font-black uppercase tracking-[.2em] text-on-surface-variant/60">ESTROBUNNY'S BURROW</span>
              </div>
            </div>
          )}
          <h1 className="sr-only">{title}</h1>
          <p className="text-base sm:text-xl text-on-surface-variant max-w-2xl mx-auto">
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
                      : isPartyGames
                        ? "Pick a mode and keep the party moving with quick-fire prompts, questions, and playful challenges."
                        : isSuperDice
                          ? "Roll two dice for a playful action and setting, then let chance choose the next moment."
                          : isSexyTimer
                            ? "Choose a countdown and get a playful prompt before the clock starts."
                            : seo?.description ?? description}
          </p>

          <GameRoomFooter title={title} />

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
          ) : isPartyGames ? (
            <PartyGamesBoard />
          ) : isSuperDice ? (
            <SuperDiceBoard />
          ) : isSexyTimer ? (
            <SexyTimerBoard />
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
          <ChaosRunHandoff currentSlug={slug} />
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
