import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service - CouplePlayHub",
  description:
    "Read the CouplePlayHub terms of service. Understand the rules and guidelines for using our online couple games platform.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PageShell>
      <article className="py-16 px-8 bg-surface min-h-[80vh]">
        <div className="max-w-3xl mx-auto space-y-8">
          <Breadcrumbs items={[{ label: "Terms of Service" }]} />
          <h1 className="text-5xl font-black font-headline tracking-tighter">
            TERMS OF <span className="text-primary">SERVICE</span>
          </h1>
          <div className="space-y-6 text-on-surface-variant leading-relaxed">
            <p>
              By using CouplePlayHub, you agree to the following terms and
              conditions governing your use of our online couple games platform.
            </p>

            <h2 className="text-2xl font-bold font-headline text-on-surface pt-4">
              Eligibility
            </h2>
            <p>
              You must be at least 18 years of age to use CouplePlayHub. By
              creating an account, you confirm that you meet this age
              requirement and are legally able to enter into this agreement.
            </p>

            <h2 className="text-2xl font-bold font-headline text-on-surface pt-4">
              Acceptable Use
            </h2>
            <p>
              CouplePlayHub is designed for consenting adult couples. You
              agree to use the platform responsibly and in accordance with
              all applicable laws. Harassment, abuse, or misuse of the
              platform will result in account termination.
            </p>

            <h2 className="text-2xl font-bold font-headline text-on-surface pt-4">
              Intellectual Property
            </h2>
            <p>
              All games, content, and designs on CouplePlayHub are the
              intellectual property of the platform. You may not copy,
              reproduce, or distribute our content without written
              permission.
            </p>

            <h2 className="text-2xl font-bold font-headline text-on-surface pt-4">
              Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time.
              Continued use of the platform after changes constitutes
              acceptance of the updated terms.
            </p>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
