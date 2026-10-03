export type PartyMode = "quick" | "questions" | "challenges";

export interface PartyPrompt {
  id: string;
  text: string;
  emoji: string;
}

export const PARTY_DECKS: Record<PartyMode, readonly PartyPrompt[]> = {
  quick: [
    { id: "movie", text: "Do your best dramatic movie-trailer voice.", emoji: "🎬" },
    { id: "dance", text: "Have a 15-second dance break together.", emoji: "💃" },
    { id: "nickname", text: "Invent a ridiculous nickname for your partner.", emoji: "🐇" },
    { id: "emoji", text: "Describe your relationship using only three emojis.", emoji: "💗" },
    { id: "song", text: "Pick the next song everyone has to hear.", emoji: "🎵" },
  ],
  questions: [
    { id: "first-impression", text: "What was your first impression of your partner?", emoji: "👀" },
    { id: "superpower", text: "If your partner had a superpower, what would it be?", emoji: "⚡" },
    { id: "dream-trip", text: "Where would you take everyone for a dream group trip?", emoji: "✈️" },
    { id: "funniest", text: "What is the funniest thing that happened on a date?", emoji: "😂" },
    { id: "playlist", text: "Which song belongs on the soundtrack of your relationship?", emoji: "🎶" },
  ],
  challenges: [
    { id: "compliment", text: "Give someone a genuine compliment.", emoji: "💗" },
    { id: "statue", text: "Freeze in a dramatic pose for five seconds.", emoji: "🗿" },
    { id: "charades", text: "Act out a movie without speaking.", emoji: "🎭" },
    { id: "toast", text: "Give a ten-second toast to the group.", emoji: "🥂" },
    { id: "laugh", text: "Try to make your partner laugh without touching them.", emoji: "😈" },
  ],
};

export function pickPartyPrompt(deck: readonly PartyPrompt[], previousId?: string): PartyPrompt | undefined {
  if (deck.length === 0) return undefined;

  const available =
    deck.length > 1 && previousId
      ? deck.filter((prompt) => prompt.id !== previousId)
      : deck;

  return available[Math.floor(Math.random() * available.length)] ?? deck[0];
}
