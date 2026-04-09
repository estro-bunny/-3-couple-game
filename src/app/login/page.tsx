import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Button from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Log In to CouplePlayHub",
  description:
    "Log in to your CouplePlayHub account to continue playing couple games with your partner.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <PageShell>
      <section className="py-16 px-8 bg-surface min-h-[80vh] flex items-center">
        <div className="max-w-md mx-auto w-full glass-card rounded-2xl p-10 border border-outline-variant/20 space-y-8">
          <h1 className="text-4xl font-black font-headline tracking-tighter text-center">
            WELCOME <span className="text-primary">BACK</span>
          </h1>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-bold text-on-surface-variant mb-2"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-lg bg-surface-container-high border border-outline-variant/20 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-bold text-on-surface-variant mb-2"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-lg bg-surface-container-high border border-outline-variant/20 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
              />
            </div>
          </form>
          <Button className="w-full rounded-xl">LOG IN</Button>
          <p className="text-center text-sm text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Button
              href="/join"
              variant="ghost"
              size="sm"
              className="inline px-0"
            >
              Join Now
            </Button>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
