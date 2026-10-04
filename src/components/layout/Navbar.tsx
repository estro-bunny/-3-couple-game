import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 px-3 pt-3 sm:px-5">
      <nav className="mx-auto max-w-6xl min-h-16 px-3 sm:px-4 md:px-5 flex justify-between items-center gap-3 rounded-[1.35rem] border border-white/10 bg-[#09070e]/90 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,.38)]" aria-label="Main navigation">
        <div className="flex items-center gap-3 min-w-0">
          <Logo size="sm" />
          <div className="hidden xl:flex items-center gap-2 ml-2">
            <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_14px_#00e5ff]" />
            <span className="text-[9px] font-black tracking-[.25em] text-secondary/70">BURROW // ONLINE</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-white/[.035] border border-white/[.06]">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="rounded-lg px-4 py-2.5 text-[11px] font-black uppercase tracking-[.14em] text-on-surface-variant hover:text-on-surface hover:bg-primary/10 transition-all">
              {link.label}
            </Link>
          ))}
        </div>
        <Button href="/games" variant="primary" size="sm" className="rounded-xl border border-primary/40 shadow-[0_0_28px_rgba(255,0,255,.22)] hover:shadow-[0_0_42px_rgba(255,0,255,.38)]">
          PLAY ♡
        </Button>
      </nav>
    </header>
  );
}
