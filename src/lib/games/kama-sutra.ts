export type KamaCardKind = "question" | "challenge" | "connection";

export interface KamaCard {
  id: string;
  kind: KamaCardKind;
  title: string;
  prompt: string;
  emoji: string;
}

export const KAMA_SUTRA_CARDS: readonly KamaCard[] = [
  {
    id: "favorite-memory",
    kind: "question",
    title: "Favorite Memory",
    prompt: "Tell your partner about a favorite romantic memory you share.",
    emoji: "💗",
  },
  {
    id: "slow-moment",
    kind: "challenge",
    title: "Slow Moment",
    prompt: "Take a quiet minute together: hold hands, breathe, and stay present.",
    emoji: "🌙",
  },
  {
    id: "three-compliments",
    kind: "connection",
    title: "Three Things",
    prompt: "Take turns naming three things you genuinely appreciate about each other.",
    emoji: "✨",
  },
  {
    id: "dream-date",
    kind: "question",
    title: "Dream Date",
    prompt: "Describe your ideal date together, from the first hello to the goodbye.",
    emoji: "🌸",
  },
  {
    id: "eye-contact",
    kind: "challenge",
    title: "Eye Contact",
    prompt: "Look at each other for ten seconds without speaking, then share how it felt.",
    emoji: "👀",
  },
  {
    id: "secret-song",
    kind: "connection",
    title: "Secret Song",
    prompt: "Choose a song that reminds you of your partner and explain why.",
    emoji: "🎵",
  },
  {
    id: "future-us",
    kind: "question",
    title: "Future Us",
    prompt: "Share one small thing you would love to experience together someday.",
    emoji: "🔮",
  },
  {
    id: "gentle-affection",
    kind: "challenge",
    title: "Gentle Affection",
    prompt: "Give your partner a warm hug or another form of affection you both enjoy.",
    emoji: "🫶",
  },
  {
    id: "partner-choice",
    kind: "connection",
    title: "Partner's Choice",
    prompt: "Let your partner choose the next wholesome romantic activity.",
    emoji: "🎀",
  },
  {
    id: "gratitude",
    kind: "connection",
    title: "Gratitude",
    prompt: "Finish this sentence: "I feel lucky to have you because..."",
    emoji: "🌷",
  },
];

export function pickKamaCard(
  cards: readonly KamaCard[],
  previousId?: string
): KamaCard | undefined {
  if (cards.length === 0) return undefined;

  const available =
    cards.length > 1 && previousId
      ? cards.filter((card) => card.id !== previousId)
      : cards;

  return available[Math.floor(Math.random() * available.length)] ?? cards[0];
}
