import { FEATURES, HIGHLIGHTS } from "@/lib/constants";
import MaterialIcon from "@/components/ui/MaterialIcon";
import HighlightCard from "@/components/ui/HighlightCard";
import Button from "@/components/ui/Button";

export default function DescriptiveSection() {
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 bg-surface-container-low overflow-hidden" aria-label="Why Enter the Burrow">
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="bunny-sticker bunny-sticker-cyan">04 // BURROW PHILOSOPHY</div>
            <h2 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-black font-headline tracking-[-.07em] leading-[.84]">
              CUTE ON
              <span className="block text-primary">PURPOSE.</span>
              CHAOTIC BY
              <span className="block text-secondary">CHOICE.</span>
            </h2>
            <p className="mt-6 text-on-surface-variant text-base sm:text-lg leading-relaxed max-w-md">
              The Burrow is supposed to feel like a place someone actually made because they cared.
              Small rules. Big personality. No pretending the internet needs another sterile couples app.
            </p>
            <div className="pt-7">
              <Button href="/privacy" variant="outline" size="sm">READ BURROW RULES →</Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="burrow-panel rounded-[1.7rem] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-7">
                <span className="text-[9px] font-black tracking-[.3em] text-primary">BUNNI CORE // PRINCIPLES</span>
                <div className="neon-rule flex-1" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {FEATURES.map((feature, index) => (
                  <div key={feature.text} className="rounded-2xl border border-white/[.07] bg-black/15 p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                        <MaterialIcon name={feature.icon} className="text-primary text-xl" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-black">{String(index + 1).padStart(2, "0")} // RULE</span>
                    </div>
                    <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {HIGHLIGHTS.map((highlight) => <HighlightCard key={highlight.title} {...highlight} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
