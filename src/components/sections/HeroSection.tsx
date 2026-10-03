import { HERO_BG_IMAGE } from "@/lib/constants";
import Button from "@/components/ui/Button";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center px-5 py-24 hero-gradient cyber-grid overflow-hidden"
      aria-label="Welcome to CouplePlayHub"
    >
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-cover bg-center mix-blend-screen" style={{ backgroundImage: `url('${HERO_BG_IMAGE}')` }} aria-hidden="true" />
      <div className="absolute -top-24 -left-20 text-[12rem] leading-none text-primary/10 animate-bunny-float select-none" aria-hidden="true">♡</div>
      <div className="absolute top-32 -right-16 text-[10rem] leading-none text-secondary/10 -rotate-12 select-none" aria-hidden="true">✦</div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/5 px-4 py-2 text-[10px] font-black tracking-[.28em] text-secondary uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_12px_#00e5ff]" />
          ESTROBUNNY PRESENTS
          <span className="text-primary">♡</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black font-headline tracking-[-.06em] leading-[.88]">
          COUPLES WHO{" "}
          <span className="block bg-gradient-to-r from-primary via-[#ff3ddf] to-secondary text-transparent bg-clip-text">
            PLAY TOGETHER
          </span>
          <span className="block text-on-surface/90">CAUSE CHAOS ♡</span>
        </h1>

        <p className="text-on-surface-variant text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
          A chaotic little playground for two. Dice, dares, questions, timers and
          spins — made to turn <span className="text-primary font-bold">“what should we do?”</span> into
          <span className="text-secondary font-bold"> “oh, fuck it, let's play.”</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <Button href="/games" size="lg" className="rounded-xl shadow-[0_0_35px_rgba(255,0,255,.35)] hover:shadow-[0_0_65px_rgba(255,0,255,.55)] hover:-translate-y-0.5 transition-all">
            START CHAOS ♡
          </Button>
          <Button href="/categories" variant="outline" size="lg" className="rounded-xl border-secondary/30 hover:border-secondary hover:text-secondary">
            FIND YOUR VIBE
          </Button>
        </div>

        <div className="pt-8 flex flex-wrap justify-center gap-3 text-[10px] font-black tracking-[.18em] uppercase">
          {["FREE TO PLAY", "NO ACCOUNT", "SKIP ANYTHING", "LOCAL-FIRST"].map((tag) => (
            <span key={tag} className="rounded-full border border-outline-variant/40 bg-black/20 px-3 py-1.5 text-on-surface-variant">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <div className="text-[9px] font-black tracking-[.35em] text-primary/60 uppercase mb-2">scroll for trouble</div>
        <MaterialIcon name="keyboard_double_arrow_down" className="text-secondary text-3xl animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}
