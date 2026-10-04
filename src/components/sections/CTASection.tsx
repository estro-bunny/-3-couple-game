import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 bg-surface overflow-hidden" aria-label="Enter EstroBunny's Burrow">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      <div className="max-w-5xl mx-auto">
        <div className="burrow-panel rounded-[2rem] p-8 sm:p-12 md:p-16 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 text-[12rem] leading-none text-primary/[.06] rotate-12" aria-hidden="true">ᕱ⑅ᕱ</div>
          <div className="relative max-w-3xl">
            <div className="bunny-sticker bunny-sticker-cyan">CONNECTION ESTABLISHED ♡</div>
            <h2 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-black font-headline tracking-[-.07em] leading-[.85]">
              YOU KNOW
              <span className="block text-primary">WHERE TO FIND US.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              The Burrow isn't going anywhere. No account to remember. No pressure to perform.
              Just come back, pick a room, and make your own kind of trouble.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button href="/games" size="lg">ENTER CHAOS DEN ♡</Button>
              <Button href="/games/chaos-run" variant="outline" size="lg">RUN IT BACK →</Button>
            </div>
            <p className="mt-6 text-[9px] font-black uppercase tracking-[.2em] text-on-surface-variant/60">
              PLAY LOCALLY // SKIP ANYTHING // STOP WHENEVER
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
