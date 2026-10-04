import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ChaosSessionBoard from "@/components/games/ChaosSessionBoard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Chaos Run - EstroBunny's Burrow",
  description: "Chain the Burrow's game rooms into one local-first Chaos Run.",
  keywords: ["Chaos Run", "couple game session", "EstroBunny", "Burrow games"],
  path: "/games/chaos-run",
});

export default function ChaosRunPage() {
  return (
    <PageShell>
      <section className="relative min-h-[80vh] overflow-hidden bg-surface px-4 py-10 cyber-grid sm:px-6 sm:py-16 md:px-8 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,255,.14),transparent_42%)]" />
        <div className="relative mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Chaos Den", href: "/games" }, { label: "Chaos Run" }]} />

          <div className="mx-auto mt-8 mb-10 max-w-4xl text-center sm:mt-12 sm:mb-14">
            <p className="mb-4 text-[10px] font-black uppercase tracking-[.35em] text-secondary">03 // CHAOS RUN // SESSION MODE</p>
            <h1 className="font-headline text-5xl font-black leading-[.88] tracking-[-.07em] sm:text-6xl md:text-8xl">
              CHAIN THE<br /><span className="text-primary">CHAOS.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:text-lg md:text-xl">
              One night. Multiple rooms. Pick a vibe and let the Burrow choose what happens next.
              Your progress stays in this browser, and you can bail out whenever you want.
            </p>
          </div>

          <ChaosSessionBoard />

          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-3 text-center sm:grid-cols-3">
            {[
              ["01", "PICK A VIBE", "Set the energy before the chaos starts."],
              ["02", "CLEAR A ROOM", "Finish a round and the run remembers it."],
              ["03", "KEEP GOING", "Jump into the next room or stop. Your call."],
            ].map(([number, title, copy]) => (
              <div key={number} className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-5">
                <p className="text-[9px] font-black tracking-[.28em] text-primary/70">{number} //</p>
                <p className="mt-2 text-sm font-black uppercase tracking-wider">{title}</p>
                <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
