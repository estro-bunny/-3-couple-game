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
          <h1 className="text-4xl font-black font-headline tracking-tighter text-center">Create Your Free Account</h1>
          <p className="text-center text-on-surface-variant text-sm">Accounts are not part of the current product yet. CouplePlayHub is designed for no-login local play.</p>
          <p className="text-center text-on-surface-variant">Account signup is coming later. For now, jump straight into the games without creating an account.</p>
          
          
        </div>
      </section>
    </PageShell>
  );
}
