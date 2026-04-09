import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FeaturedGamesSection from "@/components/sections/FeaturedGamesSection";
import DescriptiveSection from "@/components/sections/DescriptiveSection";
import CTASection from "@/components/sections/CTASection";
import { faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

const HOME_FAQS = [
  {
    question: "What is CouplePlayHub?",
    answer:
      "CouplePlayHub is a free online platform offering fun, romantic, and naughty games designed specifically for couples. From sexy dice to truth or dare, our games help partners strengthen their connection and add excitement to their relationship.",
  },
  {
    question: "Are the couple games free to play?",
    answer:
      "Yes! Most of our couple games are completely free to play. We also offer a VIP membership for access to premium card decks, exclusive game modes, and new content every week.",
  },
  {
    question: "Can I play these games on my phone?",
    answer:
      "Absolutely. CouplePlayHub is fully responsive and works on all devices including smartphones, tablets, laptops, and smart TVs. Start on one device and continue on another with our multi-device sync feature.",
  },
  {
    question: "Is my privacy protected?",
    answer:
      "Yes. CouplePlayHub operates on a strict zero-log privacy policy. We never store your session data or play history. Your intimate moments remain completely private.",
  },
  {
    question: "What types of couple games are available?",
    answer:
      "We offer a wide variety including Sexy Dice, Truth or Dare, Sex Roulette Wheel, Kama Sutra Cards, Spin the Bottle, Sexy Timer, and Party Games. Games range from soft and romantic (Vanilla) to intense and adventurous (XXX and Kinky Levels).",
  },
];

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <CategoriesSection />
      <FeaturedGamesSection />
      <DescriptiveSection />

      {/* FAQ Section for SEO */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black font-headline tracking-tighter text-center mb-12">
            FREQUENTLY ASKED{" "}
            <span className="text-primary">QUESTIONS</span>
          </h2>
          <div className="space-y-6">
            {HOME_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group glass-card rounded-xl border border-outline-variant/20 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer font-headline font-bold text-lg text-on-surface hover:text-primary transition-colors">
                  {faq.question}
                  <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(HOME_FAQS)),
        }}
      />
    </PageShell>
  );
}
