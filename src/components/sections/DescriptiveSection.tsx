import {
  FEATURES,
  STATS,
  HIGHLIGHTS,
  SPICE_IMAGE,
  PAVLOV_IMAGE,
} from "@/lib/constants";
import MaterialIcon from "@/components/ui/MaterialIcon";
import StatCard from "@/components/ui/StatCard";
import HighlightCard from "@/components/ui/HighlightCard";

export default function DescriptiveSection() {
  return (
    <section className="py-32 px-8 bg-surface-container-low overflow-hidden" aria-label="Why Choose CouplePlayHub">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* Spice It Up */}
        <div className="flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 space-y-6">
            <h2 className="text-6xl font-black font-headline tracking-tighter leading-none">
              SPICE <br /> IT UP
            </h2>
            <div className="w-20 h-2 bg-primary" aria-hidden="true" />
            <p className="text-xl text-on-surface-variant leading-relaxed">
              Our couple games aren&apos;t just about winning — they&apos;re about
              exploring together. Designed by intimacy experts, we provide the spark that
              helps partners rediscover each other in exciting new ways.
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
              PAVLOVIAN <br /> CONDITIONING
            </h2>
            <div className="w-20 h-2 bg-secondary ml-auto" aria-hidden="true" />
            <p className="text-xl text-on-surface-variant leading-relaxed">
              Experience the psychology of pleasure. Our reward-based couple game mechanics
              create lasting memories and deep connections through positive
              reinforcement and playful anticipation.
            </p>
            <div className="flex justify-end gap-4 pt-4">
              {STATS.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
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
            PLATFORM HIGHLIGHTS
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
