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
    description: "Soft, romantic, and playful connections.",
    href: "/categories/vanilla",
  },
  {
    icon: "auto_awesome",
    title: "PG",
    description: "Light teasing and fun challenges.",
    href: "/categories/pg",
  },
  {
    icon: "local_fire_department",
    title: "XXX",
    description: "Bolder prompts and playful challenges.",
    href: "/categories/xxx",
  },
  {
    icon: "token",
    title: "Kinky Levels",
    description: "For those who want to push boundaries.",
    href: "/categories/kinky-levels",
  },
];

export const FEATURED_GAMES: FeaturedGame[] = [
  {
    title: "SEXY DICE",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRTjr5qikYrrCqI7bVhaWpLB_OxhmG4wO3cCY0UXISSkJooJe9pr_TEAAFVq3o95tH3qZ6GvvdgyI0g1yy-nJkcl6kAzDs86FhmXRHrviNSegBgNfOw6oQDjHgBvYpc1aZmSMEwQpwKcu8uaTYZQc_wkeR-BST_XK-ydeY1lbs9xO_nNxA2i8yceMRo1dS9N-8hypefOs1AWh-o2nRDlI4GYfTTRELKfRbUTNtJJrVOZxmizmG638PF6qqJK7GD_1HsEKxW90uKHQ",
    alt: "cinematic close up of glowing neon pink dice on a dark reflective satin surface",
    buttonLabel: "ROLL NOW",
    variant: "large",
    href: "/games/sexy-dice",
  },
  {
    title: "SEX ROULETTE WHEEL",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZLFZJ_8J8RuBmpGxKPDws6hwSH81CojwrF9qAuXp6LHMleL3oQoFfgyOcDQUi2jDeBd3brCgaBFCRlqMEGEbqu0wWUS863Jbux1zM7mib7Rdnw8hEWBNl3TRtSWOKdJfijCOjOe1mAym_wd_XnjW_d_A8D1dUDLIlijgUhrLoZnJAp4oedglzyHavcvi1E0YhNqV2HQ35UpWGAwPEJ-8s0Y1PTkyWWV2dnJ0uzm1cCdXPIQh-le--5zLEdF557FfGPZgBhr-8P6Y",
    alt: "luxurious velvet roulette wheel with gold accents and neon violet lighting",
    buttonLabel: "SPIN TO WIN",
    variant: "medium",
    href: "/games/sex-roulette-wheel",
  },
  {
    title: "TRUTH OR DARE",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYX14OnA3en3I2rGN_5m1-bm2tKQjy0x0RuFO2ll8sp05TRG3_WDSr2v6-_sHUyqA3wcADlndq19HGmYpr2cRZQNoJJhNm0PaEYw-gdsCpt0RxgHJlpmyt8rF5Rh0MBtPW9tHUKTf1BAiV8wUQzXE_8Z28BIkTEA7sc_zD0wHZ0YHU86B-vzPHO_CaOaqjhfofRjyItW2QNEtI6eOpDTUgr6oyrcemHg3NgM4ne0DDMcB38VTpfT71FRf9q4euR3HWscoJhxnLL4M",
    alt: "two silhouetted figures whispering in a dark room illuminated by magenta backlight",
    buttonLabel: "PLAY GAME",
    variant: "small",
    href: "/games/truth-or-dare",
  },
  {
    title: "KAMA SUTRA CARDS",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5V8KlXHpBcR9U__5t2B-5ZZ3VSo-btfN3izBw_t6A8mlgJQWd5er08hG_n8vr_0Bo-PP3W-GiXM0e5y7vXwRp1vUCAQJtv1iVKbqtw57e1HK_Rmqnelo2_Ll1Fn_QKO6Ku2ktNJzjoae-VK1LYBuA1oe_yxuPD9d8mevT4jq66rairIh92vj1XPvsY0TwO7C7WDEARRuuIMXH6J74-cixo7Vg78A4NrBW1h5e6iMPWo7HP7qOeTRQ3_fP7XqpL5NVN9G4jF_-3sQ",
    alt: "elegant abstract golden line art representing intimacy on a deep charcoal background",
    buttonLabel: "DRAW A CARD",
    variant: "small",
    href: "/games/kama-sutra-cards",
  },
  {
    title: "PARTY GAMES",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBl1Vq1MsYljDgTzukJFJee2xb3ARdViRwqbA8QhBKUbEqxdqeG9sOOm2NElP1KIcQVEci068OicKevTJ35Li4pTMutPM-fFkkFi1ctQ8VkWvPEZZfkr4x4Jm4VlzaW6hTH5UgXPTEYf_xKOwZjN5Ds4cM8IgRRE3jaVCFhOncnCvA4352y3P_-QyWFzpKBgjb4NkruYcyOIclO5dyOyGT7RIL4rRKaBU5wkpYP6qsr7JUAVlC9B-h27eK7GErNtcMODYfH7IbRCVM",
    alt: "blurry silhouettes at a stylish lounge party with electric violet neon lighting",
    buttonLabel: "START PARTY",
    variant: "wide",
    description:
      "Bring the heat to your social gatherings with moderated fun.",
    href: "/games/party-games",
  },
];

export const GLASS_GAMES: GlassGame[] = [
  {
    icon: "casino",
    title: "SUPER SEX DICE",
    description:
      "Roll for a playful action and setting combination.",
    href: "/games/super-sex-dice",
  },
  {
    icon: "timer",
    title: "SEXY TIMER",
    description:
      "Choose a short countdown and play through a timed prompt.",
    href: "/games/sexy-timer",
  },
  {
    icon: "liquor",
    title: "SPIN THE BOTTLE",
    description:
      "The classic game reimagined for a new era of digital intimacy.",
    href: "/games/spin-the-bottle",
  },
];

export const FEATURES: FeaturePoint[] = [
  { icon: "check_circle", text: "Playable games with simple local progress" },
  { icon: "check_circle", text: "Skip-friendly prompts and controls" },
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
    title: "Built for Connection",
    description:
      "Play together, skip anything uncomfortable, and keep the pace yours.",
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
