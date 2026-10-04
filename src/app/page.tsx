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
    answer: "CouplePlayHub is a free browser-based collection of playful couple games built around connection, conversation, and easy-to-skip challenges. The games are queer-friendly by design and avoid assuming your gender, roles, or relationship shape.",
  },
  {
    question: "Are the couple games free to play?",
    answer: "Yes. The playable games currently available on the site are free to use, with no account required for local play.",
  },
  {
    question: "Can I play these games on my phone?",
    answer: "Yes. The games are designed for browser play across phones, tablets, and desktop screens. Local progress stays in the browser on the device where you play.",
  },
  {
    question: "Is my privacy protected?",
    answer: "The current games use browser-local progress and do not require an account. That means your local session history is kept on the device rather than tied to a CouplePlayHub account.",
  },
  {
    question: "What types of couple games are available?",
    answer: "The current playable library includes Sexy Dice, Truth or Dare, Sex Roulette Wheel, Kama Sutra Cards, Spin the Bottle, Sexy Timer, Party Games, and Super Sex Dice. They are designed to work for partners regardless of gender or orientation.",
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
