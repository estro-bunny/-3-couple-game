import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Button from "@/components/ui/Button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Hot Deals - Special Offers on Couple Games",
  description:
    "Grab special offers and limited-time promotions on premium couple games. Check back often for exclusive deals on VIP memberships and game bundles.",
  keywords: [
    "couple games deals",
    "adult game promotions",
    "couple games discount",
    "game night offers",
  ],
  path: "/deals",
});

export default function DealsPage() {
  return (
    <PageShell>
      <section className="py-16 px-8 bg-surface min-h-[80vh] flex items-center">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Breadcrumbs items={[{ label: "Deals" }]} />
          <MaterialIcon
            name="local_offer"
            className="text-secondary text-7xl"
          />
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter">
            HOT <span className="text-secondary">DEALS</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            Special offers and limited-time promotions on couple games. Check back often for exclusive deals!
          </p>
          <div className="pt-4">
            <Button
              href="/games"
              variant="secondary"
              size="lg"
              className="rounded-xl"
            >
              EXPLORE GAMES
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
