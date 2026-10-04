import { HERO_BG_IMAGE } from "@/lib/constants";
import Button from "@/components/ui/Button";
import MaterialIcon from "@/components/ui/MaterialIcon";

const SIGNALS = [
  ["01", "CHAOS DEN", "Pick a room and cause problems."],
  ["02", "CHAOS RUN", "Let the Burrow choose what happens next."],
  ["03", "BURROW RULES", "Skip, stop, laugh, repeat."],
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden hero-gradient cyber-grid px-4 sm:px-6 lg:px-8 py-20 md:py-24 flex items-center" aria-label="Welcome to EstroBunny's Burrow">
      <div className="absolute inset-0 z-0 opacity-[.07] pointer-events-none bg-cover bg-center mix-blend-screen" style={{ backgroundImage: "url('" + HERO_BG_IMAGE + "')" }} aria-hidden="true" />
      <div className="absolute -top-20 -left-10 sm:left-8 text-[8rem] sm:text-[13rem] leading-none text-primary/[.07] animate-bunny-float select-none" aria-hidden="true">ᕱ⑅ᕱ</div>
      <div className="absolute top-28 right-0 sm:right-12 text-7xl sm:text-[11rem] leading-none text-secondary/[.06] rotate-12 select-none" aria-hidden="true">✦</div>

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-10 lg:gap-16 items-center">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bunny-sticker"><span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_10px_#00e5ff]" /> BURROW // ONLINE</span>
              <span className="bunny-sticker bunny-sticker-cyan">NO ACCOUNT // NO PRESSURE</span>
            </div>

            <p className="text-[10px] sm:text-xs font-black tracking-[.38em] text-primary uppercase mb-4">ESTROBUNNY PRESENTS</p>

            <h1 className="font-headline font-black tracking-[-.075em] leading-[.82] text-[4rem] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              WELCOME TO
              <span className="block text-primary">THE BURROW.</span>
            </h1>

            <div className="mt-7 max-w-2xl">
              <p className="text-xl sm:text-2xl font-black tracking-tight text-on-surface">
                A tiny digital hideout for couples who like their nights a little <span className="text-secondary">unhinged.</span>
              </p>
              <p className="mt-4 text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed max-w-xl">
                Dice. Dares. Questions. Spins. Timers. Zero weird gender assumptions.
                Pick a room, make your own rules, and leave whenever you want.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-8">
              <Button href="/games" size="lg">ENTER THE BURROW ♡</Button>
              <Button href="/games/chaos-run" variant="outline" size="lg">LET CHAOS PICK →</Button>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-7 text-[9px] font-black tracking-[.2em] uppercase text-on-surface-variant">
              <span className="text-primary">♡ FREE</span>
              <span>♡ LOCAL-FIRST</span>
              <span>♡ SKIP ANYTHING</span>
              <span>♡ QUEER-FRIENDLY</span>
            </div>
          </div>

          <div className="relative lg:pt-8">
            <div className="burrow-panel rounded-[2rem] p-5 sm:p-7 rotate-[1.5deg] shadow-[0_35px_100px_rgba(0,0,0,.45)]">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <div className="text-[9px] font-black tracking-[.3em] text-secondary">BUNNI CORE</div>
                  <div className="text-xl font-black font-headline mt-1">what's happening?</div>
                </div>
                <div className="text-3xl animate-bunny-float" aria-hidden="true">ᕱ⑅ᕱ</div>
              </div>

              <div className="space-y-3">
                {SIGNALS.map(([number, title, copy], index) => (
                  <div key={number} className={"group rounded-2xl border border-white/[.07] bg-black/20 p-4 transition-all hover:-translate-x-1 hover:border-primary/30 " + (index === 0 ? "border-primary/25 bg-primary/[.045]" : "")}>
                    <div className="flex gap-4">
                      <span className="text-[9px] font-black tracking-[.2em] text-primary pt-1">{number}</span>
                      <div>
                        <div className="font-black text-sm tracking-wide">{title}</div>
                        <div className="text-xs text-on-surface-variant mt-1 leading-relaxed">{copy}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-white/[.07] flex items-center justify-between gap-4">
                <div className="text-[9px] font-black uppercase tracking-[.2em] text-on-surface-variant">SYSTEM STATUS</div>
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.2em] text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_10px_#00e5ff]" />
                  chaotic / operational
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 sm:-left-8 bunny-sticker rotate-[-6deg]">GOOD GIRLS CAUSE PROBLEMS ♡</div>
            <div className="absolute -top-5 -right-2 sm:-right-5 bunny-sticker bunny-sticker-cyan rotate-[5deg]">MORE CHAOS PLS</div>
          </div>
        </div>

        <div className="mt-16 md:mt-20 flex items-center gap-4">
          <div className="text-[9px] font-black tracking-[.3em] text-primary uppercase">SCROLL FOR TROUBLE</div>
          <div className="neon-rule flex-1" />
          <MaterialIcon name="keyboard_double_arrow_down" className="text-secondary text-2xl animate-bounce" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
