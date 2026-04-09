import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Button from "@/components/ui/Button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Support - Get Help With CouplePlayHub",
  description:
    "Need help with CouplePlayHub? Our support team is ready to assist you with account issues, game questions, and technical support.",
  keywords: [
    "coupleplayhub support",
    "couple games help",
    "contact coupleplayhub",
  ],
  path: "/support",
});

export default function SupportPage() {
  return (
    <PageShell>
      <section className="py-16 px-8 bg-surface min-h-[80vh] flex items-center">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Breadcrumbs items={[{ label: "Support" }]} />
          <MaterialIcon
            name="support_agent"
            className="text-primary text-7xl"
          />
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter">
            NEED <span className="text-primary">HELP?</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            Our support team is here to assist you with any questions about couple games, your account, or technical issues.
          </p>
          <div className="pt-4">
            <Button size="lg" className="rounded-xl">
              CONTACT SUPPORT
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
