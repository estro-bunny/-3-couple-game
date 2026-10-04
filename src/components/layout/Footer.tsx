import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative bg-[#050409] w-full px-5 md:px-8 pt-14 pb-8 border-t border-primary/15 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-xl">
            <div className="text-[9px] font-black tracking-[.35em] text-secondary uppercase mb-3">BUNNI CORE // SIGNING OFF</div>
            <div className="font-headline font-black text-3xl sm:text-4xl tracking-[-.05em]">
              ESTROBUNNY'S <span className="text-primary">BURROW.</span>
            </div>
            <p className="mt-4 text-sm text-on-surface-variant max-w-md leading-relaxed">
              Cute chaos for couples who cause trouble together ♡
              No account. No pressure. Skip anything. Come back whenever.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="text-[10px] font-black uppercase tracking-[.16em] text-on-surface-variant hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-5 border-t border-white/[.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[9px] font-black uppercase tracking-[.18em] text-on-surface-variant/60">
          <span>ᕱ⑅ᕱ // STILL HERE ♡</span>
          <span>LOCAL-FIRST // BUILT WITH CHAOS</span>
          <span>© {new Date().getFullYear()} ESTROBUNNY</span>
        </div>
      </div>
    </footer>
  );
}
