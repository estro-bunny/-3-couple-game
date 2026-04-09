import Button from "@/components/ui/Button";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function CTASection() {
  return (
    <section className="py-24 px-8 bg-surface" aria-label="Join CouplePlayHub">
      <div className="max-w-4xl mx-auto glass-card rounded-[2rem] p-16 text-center space-y-8 border border-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true">
          <MaterialIcon
            name="favorite"
            className="text-9xl text-primary"
            filled
          />
        </div>
        <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tight">
          READY TO PLAY?
        </h2>
        <p className="text-xl text-on-surface-variant">
          Join thousands of couples enhancing their relationships with fun, naughty, and romantic games tonight.
        </p>
        <div className="pt-4">
          <Button
            href="/join"
            size="lg"
            className="rounded-xl text-xl shadow-[0_0_30px_rgba(255,0,255,0.4)]"
          >
            JOIN COUPLEPLAYHUB NOW
          </Button>
        </div>
        <p className="text-sm text-on-surface-variant opacity-60">
          No credit card required to explore the lobby.
        </p>
      </div>
    </section>
  );
}
