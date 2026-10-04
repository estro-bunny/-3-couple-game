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
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Chaos Den", href: "/games" }, { label: "Chaos Run" }]} />

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mt-8 sm:mt-12 mb-10 sm:mb-14">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="bunny-sticker">03 // CHAOS RUN</span>
                <span className="bunny-sticker bunny-sticker-cyan">SESSION MODE</span>
              </div>
              <h1 className="font-headline text-5xl sm:text-6xl md:text-8xl font-black leading-[.82] tracking-[-.075em]">
                LET THE BURROW
                <span className="block text-primary">CHOOSE.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
                One night. Multiple rooms. Pick a vibe, then let the Burrow throw the next idea at you.
                Progress stays in this browser. Bail out whenever you want.
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <div className="text-7xl">ᕱ⑅ᕱ</div>
              <div className="mt-2 text-[9px] font-black tracking-[.25em] text-secondary uppercase">BUNNI CORE // CHAOTIC</div>
            </div>
          </div>

          <ChaosSessionBoard />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              ["01", "PICK A VIBE", "Soft, romantic, mischievous, or maximum chaos."],
              ["02", "CLEAR A ROOM", "Finish a room and the run remembers it locally."],
              ["03", "KEEP GOING", "Take the next room, replay, or stop. Your call."],
            ].map(([number, title, copy]) => (
              <div key={number} className="rounded-2xl border border-white/[.07] bg-[#100c15] p-5">
                <div className="text-[9px] font-black tracking-[.25em] text-primary">{number} //</div>
                <div className="mt-2 text-sm font-black uppercase tracking-[.12em]">{title}</div>
                <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
