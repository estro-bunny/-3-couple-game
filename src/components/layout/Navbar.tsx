import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 px-3 pt-3">
      <nav
        className="mx-auto max-w-7xl min-h-16 px-3 sm:px-4 md:px-6 flex justify-between items-center gap-3 rounded-2xl border border-primary/20 bg-[#08070d]/80 backdrop-blur-2xl shadow-[0_10px_50px_rgba(255,0,255,.12)]"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <Logo size="sm" />
          <span className="hidden lg:inline text-[10px] font-black tracking-[.28em] text-secondary/70">
            BURROW // ONLINE
          </span>
          <div className="hidden md:flex gap-4 lg:gap-5 items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative font-headline text-sm font-bold tracking-tight text-on-surface-variant hover:text-primary transition-colors after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-secondary hover:after:w-full after:transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <Button href="/games" variant="primary" size="sm" className="rounded-xl shadow-[0_0_24px_rgba(255,0,255,.25)] shrink-0">
          PLAY NOW <span aria-hidden="true">♡</span>
        </Button>
      </nav>
    </header>
  );
}
