import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy - CouplePlayHub",
  description:
    "Read the CouplePlayHub privacy policy. Learn about our zero-log policy and how we protect your data while you enjoy couple games online.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageShell>
      <article className="py-16 px-8 bg-surface min-h-[80vh]">
        <div className="max-w-3xl mx-auto space-y-8">
          <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
          <h1 className="text-5xl font-black font-headline tracking-tighter">
            PRIVACY <span className="text-primary">POLICY</span>
          </h1>
          <div className="space-y-6 text-on-surface-variant leading-relaxed">
            <p>
              Your privacy is our top priority. CouplePlayHub operates on a
              zero-log policy — we never store your session data or play
              history. Your intimate moments remain completely private.
            </p>

            <h2 className="text-2xl font-bold font-headline text-on-surface pt-4">
              Information We Collect
            </h2>
            <p>
              We only collect the minimum information necessary to provide
              our couple gaming services: your email address for account
              creation and basic usage analytics to improve our games.
            </p>

            <h2 className="text-2xl font-bold font-headline text-on-surface pt-4">
              How We Use Your Information
            </h2>
            <p>
              Your information is used solely to operate the platform, send
              account-related communications, and improve our couple games.
              We never sell or share your personal data with third parties
              for marketing purposes.
            </p>

            <h2 className="text-2xl font-bold font-headline text-on-surface pt-4">
              Data Security
            </h2>
            <p>
              All data is encrypted in transit and at rest. We employ
              industry-standard security measures to protect your account
              and personal information.
            </p>

            <h2 className="text-2xl font-bold font-headline text-on-surface pt-4">
              Contact Us
            </h2>
            <p>
              If you have any questions about this privacy policy, please
              contact our support team.
            </p>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
