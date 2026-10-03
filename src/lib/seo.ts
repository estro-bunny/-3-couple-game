import type { Metadata } from "next";

export const SITE_NAME = "CouplePlayHub by EstroBunny";
export const SITE_URL = "https://coupleplayhub.netlify.app";
export const SITE_DESCRIPTION =
  "Discover the best online couple games to spice up your relationship. Play naughty games, romantic truth or dare, sexy dice, and fun challenges designed for couples.";
export const SITE_TAGLINE = "Couple games, private by default, made for connection";

export const DEFAULT_KEYWORDS = [
  "couple games online",
  "naughty games for couples",
  "romantic games for couples",
  "fun games for partners",
  "online sex games for couples",
  "couples truth or dare",
  "sexy dice game",
  "relationship games",
  "intimacy games for couples",
  "adult couple games",
  "spicy games for couples",
  "date night games",
  "couples card games online",
  "love games for two",
  "bedroom games for couples",
];

export function buildMetadata(overrides: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const url = overrides.path ? `${SITE_URL}${overrides.path}` : SITE_URL;
  const keywords = [
    ...(overrides.keywords ?? []),
    ...DEFAULT_KEYWORDS.slice(0, 8),
  ];

  return {
    title: overrides.title,
    description: overrides.description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: overrides.title,
      description: overrides.description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: overrides.ogImage
        ? [{ url: overrides.ogImage, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: overrides.title,
      description: overrides.description,
      images: overrides.ogImage ? [overrides.ogImage] : undefined,
    },
    robots: overrides.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/** Game-specific metadata descriptions for SEO */
export const GAME_SEO: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  "sexy-dice": {
    title: "Sexy Dice Game Online - Roll & Play | CouplePlayHub",
    description:
      "Roll the sexy dice and let fate decide your next intimate move. The most popular online dice game for couples looking to add spontaneity to their love life.",
    keywords: [
      "sexy dice game",
      "couples dice game online",
      "naughty dice for couples",
      "romantic dice game",
      "love dice online",
    ],
  },
  "sex-roulette-wheel": {
    title: "Sex Roulette Wheel - Spin to Win | CouplePlayHub",
    description:
      "Spin the roulette wheel and discover exciting new challenges. A thrilling adult roulette game designed to ignite passion between partners.",
    keywords: [
      "sex roulette wheel",
      "couples roulette game",
      "adult spin wheel online",
      "naughty roulette for couples",
    ],
  },
  "truth-or-dare": {
    title: "Truth or Dare for Couples - Spicy Edition | CouplePlayHub",
    description:
      "Play the ultimate couples truth or dare game online. Spicy questions and daring challenges to deepen your connection and keep the spark alive.",
    keywords: [
      "truth or dare for couples",
      "couples truth or dare online",
      "spicy truth or dare",
      "naughty truth or dare game",
      "romantic truth or dare",
    ],
  },
  "kama-sutra-cards": {
    title: "Kama Sutra Cards - Draw & Explore | CouplePlayHub",
    description:
      "Draw a Kama Sutra card and explore new positions together. A beautifully designed card game that helps couples discover intimate adventures.",
    keywords: [
      "kama sutra card game",
      "kama sutra positions game",
      "couples card game online",
      "intimate card game",
    ],
  },
  "party-games": {
    title: "Party Games for Couples & Friends | CouplePlayHub",
    description:
      "Bring the heat to your social gatherings with fun party games. Perfect for couples game nights, double dates, and friend groups.",
    keywords: [
      "couples party games",
      "adult party games online",
      "group games for couples",
      "date night party games",
    ],
  },
  "super-sex-dice": {
    title: "Super Sex Dice - Customizable Actions | CouplePlayHub",
    description:
      "Customize actions and locations for the ultimate random thrill. An upgraded dice game with more options for adventurous couples.",
    keywords: [
      "super sex dice",
      "customizable dice game couples",
      "advanced dice game online",
    ],
  },
  "sexy-timer": {
    title: "Sexy Timer Challenge - Race Against Time | CouplePlayHub",
    description:
      "Race against the clock to complete daring intimate tasks. A fast-paced timer game that adds excitement and urgency to your love life.",
    keywords: [
      "sexy timer game",
      "couples timer challenge",
      "timed intimacy game",
    ],
  },
  "spin-the-bottle": {
    title: "Spin the Bottle Online - Classic Reimagined | CouplePlayHub",
    description:
      "The classic spin the bottle game reimagined for modern couples. A digital twist on the timeless party favorite, perfect for two players.",
    keywords: [
      "spin the bottle online",
      "digital spin the bottle",
      "couples spin the bottle game",
    ],
  },
};

/** Category-specific SEO metadata */
export const CATEGORY_SEO: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  vanilla: {
    title: "Vanilla Couple Games - Soft & Romantic | CouplePlayHub",
    description:
      "Explore soft, romantic, and playful couple games perfect for date nights. Gentle intimacy games designed to strengthen your emotional connection.",
    keywords: [
      "romantic games for couples",
      "soft couple games",
      "gentle intimacy games",
      "date night games",
    ],
  },
  pg: {
    title: "PG Couple Games - Light & Playful Challenges | CouplePlayHub",
    description:
      "Enjoy light teasing and fun challenges with PG-rated couple games. Perfect for new couples or casual game nights with mild excitement.",
    keywords: [
      "pg couple games",
      "light couple challenges",
      "fun teasing games",
      "mild couple games",
    ],
  },
  xxx: {
    title: "XXX Couple Games - Intense & Adventurous | CouplePlayHub",
    description:
      "Dive into intense, explicit, and adventurous games for daring couples. Push your boundaries with our most provocative gaming experiences.",
    keywords: [
      "adult games for couples",
      "explicit couple games",
      "adventurous intimacy games",
      "naughty couple games online",
    ],
  },
  "kinky-levels": {
    title: "Kinky Level Games - Push Your Boundaries | CouplePlayHub",
    description:
      "For couples who want to push every boundary. Explore our most daring games with customizable intensity levels for ultimate excitement.",
    keywords: [
      "kinky games for couples",
      "boundary pushing couple games",
      "intense adult games",
      "adventurous couple challenges",
    ],
  },
};

/** JSON-LD Website Schema */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/games?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** JSON-LD Organization Schema */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    sameAs: [],
  };
}

/** JSON-LD BreadcrumbList Schema */
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** JSON-LD FAQPage Schema */
export function faqSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** JSON-LD SoftwareApplication Schema for games */
export function gameSchema(game: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: game.name,
    url: game.url,
    description: game.description,
    applicationCategory: "GameApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    ...(game.image ? { image: game.image } : {}),
  };
}
