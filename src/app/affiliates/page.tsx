import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Button from "@/components/ui/Button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Affiliate Program - Earn With CouplePlayHub",
  description:
    "Join the CouplePlayHub affiliate program and earn commissions by promoting the best online couple games. Partner with us and monetize your audience.",
  keywords: [
    "couple games affiliate",
    "adult games affiliate program",
    "earn with couple games",
  ],
  path: "/affiliates",
});

export default function AffiliatesPage() {
  return (
    <PageShell>
      <section className="py-16 px-8 bg-surface min-h-[80vh] flex items-center">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Breadcrumbs items={[{ label: "Affiliates" }]} />
          <MaterialIcon
            name="handshake"
            className="text-secondary text-7xl"
          />
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter">
            AFFILIATE <span className="text-secondary">PROGRAM</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            Partner with CouplePlayHub and earn commissions promoting the best couple games online. Program details coming soon.
          </p>
          <div className="pt-4">
            <Button
              href="/join"
              variant="secondary"
              size="lg"
              className="rounded-xl"
            >
              JOIN AS AFFILIATE
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
