import Link from "next/link";
import { FEATURED_GAMES, GLASS_GAMES } from "@/lib/constants";
import MaterialIcon from "./MaterialIcon";
function toSlug(title: string) { return title.toLowerCase().replace(/\s+/g, "-"); }
interface RelatedGamesProps { currentSlug: string; }
export default function RelatedGames({ currentSlug }: RelatedGamesProps) {
  const allGames = [
    ...FEATURED_GAMES.map((g) => ({ slug: toSlug(g.title), title: g.title, image: g.image, description: g.description })),
    ...GLASS_GAMES.map((g) => ({ slug: toSlug(g.title), title: g.title, image: undefined, description: g.description })),
  ];
  const related = allGames.filter((g) => g.slug !== currentSlug).slice(0, 4);
  if (related.length === 0) return null;
  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 md:px-8 bg-surface-container-low">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black font-headline tracking-tighter mb-6 sm:mb-8 text-center">YOU MIGHT ALSO <span className="text-primary-container">ENJOY</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {related.map((game) => (
            <Link key={game.slug} href={`/games/${game.slug}`} className="group glass-card min-h-56 rounded-xl border border-outline-variant/20 overflow-hidden hover:border-primary/40 transition-colors">
              {game.image ? <div className="relative h-28 sm:h-32 overflow-hidden"><img src={game.image} alt={`${game.title} - couple game`} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" loading="lazy" width={300} height={128} /></div> :
                <div className="h-28 sm:h-32 flex items-center justify-center bg-surface-container-high"><MaterialIcon name="casino" className="text-4xl sm:text-5xl text-primary/40" /></div>}
              <div className="p-4"><h3 className="font-headline font-bold text-sm uppercase tracking-tight group-hover:text-primary transition-colors">{game.title}</h3>{game.description && <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{game.description}</p>}</div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6 sm:mt-8"><Link href="/games" className="inline-flex min-h-11 items-center text-primary font-bold hover:underline text-sm">VIEW ALL GAMES &rarr;</Link></div>
      </div>
    </section>
  );
}
