import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ChaosSessionBoard from "@/components/games/ChaosSessionBoard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Chaos Session - CouplePlayHub",
  description: "Build a local-first CouplePlayHub session and let your vibe choose the next game.",
  path: "/session",
});

export default function SessionPage() {
  return (
    <PageShell>
      <section className="relative py-16 md:py-24 px-5 md:px-8 bg-surface cyber-grid min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,255,.14),transparent_42%)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <Breadcrumbs items={[{ label: "Chaos Session" }]} />
          <div className="max-w-4xl mt-10 mb-12">
            <p className="text-[10px] font-black tracking-[.35em] text-secondary uppercase mb-4">03 // SESSION MODE</p>
            <h1 className="text-5xl md:text-8xl font-black font-headline tracking-[-.07em] leading-[.88]">ONE SESSION.<br /><span className="text-primary">INFINITE CHAOS.</span></h1>
            <p className="text-on-surface-variant text-lg md:text-xl mt-6 max-w-2xl leading-relaxed">
              Pick a vibe and let CouplePlayHub choose the next game. No account, no forced identity, no pressure — just two people deciding what sounds fun next.
            </p>
          </div>
          <ChaosSessionBoard />
        </div>
      </section>
    </PageShell>
  );
}
