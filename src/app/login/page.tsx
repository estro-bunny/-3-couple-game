import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
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
          <h1 className="text-4xl font-black font-headline tracking-tighter text-center">Log In to CouplePlayHub</h1>
          <p className="text-center text-on-surface-variant">There is nothing to log into yet. Current game progress stays local in your browser.</p>
          
          
        </div>
      </section>
    </PageShell>
  );
}
