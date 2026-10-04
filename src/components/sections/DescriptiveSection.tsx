import {
  FEATURES,
  HIGHLIGHTS,
  SPICE_IMAGE,
  PAVLOV_IMAGE,
} from "@/lib/constants";
import MaterialIcon from "@/components/ui/MaterialIcon";
import HighlightCard from "@/components/ui/HighlightCard";

export default function DescriptiveSection() {
  return (
    <section className="py-32 px-8 bg-surface-container-low overflow-hidden" aria-label="Why Enter the Burrow">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* Spice It Up */}
        <div className="flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 space-y-6">
            <h2 className="text-6xl font-black font-headline tracking-tighter leading-none">
              MAKE SOME CHAOS <br /> TOGETHER
            </h2>
            <div className="w-20 h-2 bg-primary" aria-hidden="true" />
            <p className="text-xl text-on-surface-variant leading-relaxed">
              Our games are built for connection, curiosity, and playful exploration. Pick a vibe, make your own boundaries, and keep whatever feels fun.
            </p>
            <ul className="space-y-4 font-bold text-on-surface">
              {FEATURES.map((feature) => (
                <li key={feature.text} className="flex items-center gap-3">
                  <MaterialIcon
                    name={feature.icon}
                    className="text-primary"
                    aria-hidden="true"
                  />
                  {feature.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" aria-hidden="true" />
            <img
              className="relative z-10 rounded-3xl grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
              src={SPICE_IMAGE}
              alt="Couple holding silk ribbon - symbolizing romantic connection and intimacy games"
              loading="lazy"
              width={600}
              height={400}
            />
          </div>
        </div>

        {/* Pavlovian Conditioning */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-20">
          <div className="flex-1 space-y-6 text-right">
            <h2 className="text-6xl font-black font-headline tracking-tighter leading-none">
              BURROW <br /> PHILOSOPHY
            </h2>
            <div className="w-20 h-2 bg-secondary ml-auto" aria-hidden="true" />
            <p className="text-xl text-on-surface-variant leading-relaxed">
              The Burrow keeps things simple: play locally, communicate clearly, skip anything you do not want, and make the night your own.
            </p>
            <div className="flex flex-wrap justify-end gap-3 pt-4" aria-label="Product principles">
              <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary">
                Private-first
              </span>
              <span className="rounded-full border border-secondary/20 bg-secondary/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-secondary">
                Local play
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary">
                Queer-friendly
              </span>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -inset-4 bg-secondary/20 blur-3xl rounded-full" aria-hidden="true" />
            <img
              className="relative z-10 rounded-3xl shadow-2xl border border-secondary/10"
              src={PAVLOV_IMAGE}
              alt="Abstract brain waves visualization representing the psychology of couple gaming"
              loading="lazy"
              width={600}
              height={400}
            />
          </div>
        </div>

        {/* Platform Highlights */}
        <div className="space-y-16">
          <h2 className="text-center text-4xl font-headline font-black uppercase">
            BURROW SIGNALS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {HIGHLIGHTS.map((highlight) => (
              <HighlightCard key={highlight.title} {...highlight} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
