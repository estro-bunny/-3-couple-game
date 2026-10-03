import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy - CouplePlayHub",
  description:
    "Read how CouplePlayHub handles local game progress, optional Lovense connections, and the limited services used by the site.",
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
              CouplePlayHub is designed to be private by default. The games do
              not require an account, and game progress is stored locally in
              your browser. We do not claim that the site is zero-log or that
              no data ever leaves your device.
            </p>

            <h2 className="text-2xl font-bold font-headline text-on-surface pt-4">
              Game Progress
            </h2>
            <p>
              Round counts and related game state use your browser&apos;s local
              storage. Clearing that browser data can remove local progress.
              There is currently no account system or cross-device sync.
            </p>

            <h2 className="text-2xl font-bold font-headline text-on-surface pt-4">
              Optional Lovense Connection
            </h2>
            <p>
              Lovense integration is optional. If you connect it, the browser
              communicates with Lovense services and Lovense Connect to
              establish the hardware connection. CouplePlayHub uses an
              anonymous local identifier for this integration; it is not an
              account identity. Do not use the integration if you are not
              comfortable with that third-party communication.
            </p>

            <h2 className="text-2xl font-bold font-headline text-on-surface pt-4">
              Accounts &amp; Email
            </h2>
            <p>
              Accounts and email-based sign-in are not currently part of the
              CouplePlayHub product. The old account pages are retained only
              as informational placeholders and are not connected to an
              account database.
            </p>

            <h2 className="text-2xl font-bold font-headline text-on-surface pt-4">
              Third-Party Services
            </h2>
            <p>
              The site is deployed through its hosting provider, and optional
              integrations may communicate with their own services. Their
              respective privacy policies and terms apply to those services.
            </p>

            <h2 className="text-2xl font-bold font-headline text-on-surface pt-4">
              Contact Us
            </h2>
            <p>
              If you have questions about CouplePlayHub privacy practices,
              contact the project maintainers through the project&apos;s
              published support channels.
            </p>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
