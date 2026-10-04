import type {
  NavLink,
  CategoryItem,
  FeaturedGame,
  GlassGame,
  HighlightItem,
  FeaturePoint,
  FooterLink,
} from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Games", href: "/games", isActive: true },
  { label: "Categories", href: "/categories" },
];

export const CATEGORIES: CategoryItem[] = [
  {
    icon: "favorite",
    title: "Vanilla",
    description: "Soft, romantic, queer-friendly, and playful connections.",
    href: "/categories/vanilla",
  },
  {
    icon: "auto_awesome",
    title: "PG",
    description: "Light teasing, flirting, and fun challenges without gendered roles.",
    href: "/categories/pg",
  },
  {
    icon: "local_fire_department",
    title: "XXX",
    description: "Bolder prompts and playful challenges for partners of any gender.",
    href: "/categories/xxx",
  },
  {
    icon: "token",
    title: "Kinky Levels",
    description: "For partners who want to explore boundaries on their own terms.",
    href: "/categories/kinky-levels",
  },
];

import { getFeaturedGames, getGlassGames, toFeaturedGame, toGlassGame } from "@/lib/games/registry";

export const FEATURED_GAMES = getFeaturedGames().map(toFeaturedGame);

export const GLASS_GAMES = getGlassGames().map(toGlassGame);

export const FEATURES: FeaturePoint[] = [
  { icon: "check_circle", text: "Playable games with simple local progress" },
  { icon: "check_circle", text: "Skip-friendly prompts with no gendered roles" },
  { icon: "check_circle", text: "No account required for local play" },
];

export const HIGHLIGHTS: HighlightItem[] = [
  {
    icon: "security",
    title: "Local-First Progress",
    description: "Game progress is kept in your browser on this device.",
  },
  {
    icon: "devices",
    title: "No Account Needed",
    description:
      "Jump into the games without creating an account or signing in.",
  },
  {
    icon: "stars",
    title: "Queer-Friendly by Design",
    description:
      "No boyfriend/girlfriend assumptions, no assigned roles, and no gender required to play."
  },
];

export const FOOTER_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Support", href: "/support" },
];

export const FOOTER_ICONS = ["share", "lock", "verified_user"];

export const HERO_BG_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBGzPzzzzShkDUuIYTuWtRBaIRtrdezoLfEETeMXUvNj3dedm9P9ImlGVPSNn4fPB705cqs5SgVsnzk10CB0ehSOaCN-H3vKx2qTJpOMDMR8A3jnXukZe_CGSMrOf3RDKmfziw8wZ8scqisVbigURqKs2QASBGk4ffDCFey13exYIr1-bEDEqaWhLEswciER1mYt0oXn0JZb0UU1L6g_4LQppzEpNwzJ2sJ7B_bO0j2auxNyiTT-e9XXdoXWqWmgRbkwudaz9Xwano";

export const SPICE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC9bvR1KYN_aX0g0ZA2Vrn52GENnM688HUpc9N7_EvQFQu_FtJRGeyQI9_uTtM7fKcOmVNj3qcwdOAxx4mGZMx4evqjK8R4rGw23fCTI-w7xGdlXwMKurd7gaksIqSIIB4NoMqbZF4_uF2lsFnf5KjlMoLCcWsBR_040kn8gfC-V7Mrn8Fsdb8KASqORXuUhvaFKQflBFyExxiob0h2NFy6AGEQJCxhZudfkCJQ94MKmGUrnpbcpKInEZBREdTbpsKRbZQbHjsmw-A";

export const PAVLOV_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD3j-xSY2D8ZdO9HbIO0C44lTIBcY1Fkjk-qL9l0q3WU5XRMEhjvn_uuJcsrUsrTnyG3Wm7PTIMuDB1VV7K4W1GNQm-X3RrALDo39-hzUzAE53j6w8YkN6PgnTsaIvNBa_vxlmZYxXCAGqKs_oOFZ6gAKj0O0wk-9AFkGq_uw1uVNqvc1zlmP6AK8IS_hiNhDzcyTdlLh7Xb7WRT69coEHJBnsQujirGhyqoTMnuzPbn6L9xQem8EqEYLUK2Ifb-sAlVp79Wgl62Vg";
