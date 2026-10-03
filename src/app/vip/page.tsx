import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Button from "@/components/ui/Button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "VIP Access - Premium Couple Games & Exclusive Content",
  description:
    "Unlock premium card decks, elite game modes, and exclusive couple game content updated every week. Join VIP for the ultimate intimate gaming experience.",
  keywords: [
    "vip couple games",
    "premium adult games",
    "exclusive couple content",
    "elite game modes",
  ],
  path: "/vip",
});

export default function VipPage() {
  return (
    <PageShell>
      <section className="py-16 px-8 bg-surface min-h-[80vh] flex items-center">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Breadcrumbs items={[{ label: "VIP" }]} />
          <MaterialIcon name="stars" className="text-primary text-7xl" />
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter">
            VIP <span className="text-primary">ACCESS</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">VIP is not part of the current product. This page is intentionally a roadmap placeholder; there is no account, subscription, or premium-content system yet.</p>
                  </div>
      </section>
    </PageShell>
  );
}
