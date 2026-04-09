import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#131313]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(255,0,255,0.1)]">
        <nav
          className="flex justify-between items-center px-8 h-20"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-8">
            <Logo size="sm" />
            <div className="hidden md:flex gap-6 items-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-headline tracking-tight transition-colors duration-300 ${
                    link.isActive
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button href="/login" variant="ghost" size="sm">
              Login
            </Button>
            <Button href="/join" variant="primary" size="sm">
              Join Now
            </Button>
          </div>
        </nav>
      </header>
      {/* Separator line */}
      <div
        className="fixed top-20 w-full h-px bg-gradient-to-b from-surface-container-low to-transparent z-40"
        aria-hidden="true"
      />
    </>
  );
}
