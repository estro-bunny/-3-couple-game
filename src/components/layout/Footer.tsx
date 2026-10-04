import Link from "next/link";
import { FOOTER_LINKS, FOOTER_ICONS } from "@/lib/constants";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full py-12 px-8 border-t border-outline-variant/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-lg font-black text-primary font-headline">
            ESTROBUNNY'S BURROW
          </span>
          <p className="text-on-surface-variant font-body text-sm tracking-wide">
            &copy; {new Date().getFullYear()} EstroBunny's Burrow. All rights reserved.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-8">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-on-surface-variant font-body text-sm tracking-wide hover:text-primary underline decoration-primary-container transition-opacity opacity-80 hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4" aria-label="Trust badges">
          {FOOTER_ICONS.map((icon) => (
            <MaterialIcon
              key={icon}
              name={icon}
              className="text-on-surface-variant cursor-pointer hover:text-primary"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
