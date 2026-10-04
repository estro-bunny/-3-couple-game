import Button from "@/components/ui/Button";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function CTASection() {
  return (
    <section className="py-24 px-8 bg-surface" aria-label="Enter EstroBunny's Burrow">
      <div className="max-w-4xl mx-auto glass-card rounded-[2rem] p-8 sm:p-12 md:p-16 text-center space-y-8 border border-primary/20 relative overflow-hidden animate-chroma-pulse">
        <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true">
          <MaterialIcon name="favorite" className="text-9xl text-primary" filled />
        </div>
        <div className="text-[10px] font-black tracking-[.35em] text-secondary uppercase">
          CONNECTION ESTABLISHED ♡
        </div>
        <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tight">
          COME BACK TO THE BURROW.
        </h2>
        <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
          No account. No pressure. Just a little neon chaos waiting whenever you feel like playing together.
        </p>
        <div className="pt-4">
          <Button href="/games" size="lg" className="rounded-xl text-xl shadow-[0_0_30px_rgba(255,0,255,0.4)]">
            ENTER THE CHAOS DEN ♡
          </Button>
        </div>
        <p className="text-sm text-on-surface-variant opacity-60">
          Play locally. Skip anything. Stop whenever you want.
        </p>
      </div>
    </section>
  );
}
