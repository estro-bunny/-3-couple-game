import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Button from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Join CouplePlayHub - Create Your Free Account",
  description:
    "Sign up for CouplePlayHub and start playing couple games tonight. Free registration, no credit card required. Access sexy dice, truth or dare, and more.",
  keywords: [
    "sign up couple games",
    "register coupleplayhub",
    "free couple game account",
  ],
  path: "/join",
  noIndex: true,
});

export default function JoinPage() {
  return (
    <PageShell>
      <section className="py-16 px-8 bg-surface min-h-[80vh] flex items-center">
        <div className="max-w-md mx-auto w-full glass-card rounded-2xl p-10 border border-primary/20 space-y-8">
          <h1 className="text-4xl font-black font-headline tracking-tighter text-center">
            JOIN THE <span className="text-primary">VAULT</span>
          </h1>
          <p className="text-center text-on-surface-variant text-sm">
            No credit card required to explore the lobby.
          </p>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="display-name"
                className="block text-sm font-bold text-on-surface-variant mb-2"
              >
                Display Name
              </label>
              <input
                id="display-name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                className="w-full px-4 py-3 rounded-lg bg-surface-container-high border border-outline-variant/20 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-on-surface-variant mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-lg bg-surface-container-high border border-outline-variant/20 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-on-surface-variant mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                className="w-full px-4 py-3 rounded-lg bg-surface-container-high border border-outline-variant/20 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
              />
            </div>
          </form>
          <Button className="w-full rounded-xl shadow-[0_0_30px_rgba(255,0,255,0.3)]">
            CREATE ACCOUNT
          </Button>
          <p className="text-center text-sm text-on-surface-variant">
            Already a member?{" "}
            <Button
              href="/login"
              variant="ghost"
              size="sm"
              className="inline px-0"
            >
              Log In
            </Button>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
