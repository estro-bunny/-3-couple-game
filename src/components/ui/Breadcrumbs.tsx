import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 sm:mb-6 text-left overflow-hidden">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-on-surface-variant">
        <li className="shrink-0">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center hover:text-primary transition-colors"
          >
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex min-w-0 items-center gap-2">
            <span className="text-outline" aria-hidden="true">/</span>
            {item.href && i < items.length - 1 ? (
              <Link
                href={item.href}
                className="inline-flex min-h-10 max-w-[40vw] items-center truncate hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="max-w-[52vw] truncate text-on-surface font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
