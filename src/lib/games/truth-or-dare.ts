export type TruthOrDareMode = "truth" | "dare";

export interface Prompt {
  id: string;
  text: string;
}

export const TRUTHS: Prompt[] = [
  { id: "truth-1", text: "What is one small thing your partner does that always makes you smile?" },
  { id: "truth-2", text: "What was your first impression of your partner?" },
  { id: "truth-3", text: "What is a memory together you would happily relive?" },
  { id: "truth-4", text: "What is something you would love to try together on a future date?" },
  { id: "truth-5", text: "What compliment from your partner has stuck with you?" },
  { id: "truth-6", text: "What song reminds you of your relationship?" },
  { id: "truth-7", text: "What is one thing you wish you did more often together?" },
  { id: "truth-8", text: "What makes you feel most appreciated by your partner?" },
];

export const DARES: Prompt[] = [
  { id: "dare-1", text: "Give your partner a genuine compliment and hold eye contact for five seconds." },
  { id: "dare-2", text: "Choose a song and have a tiny living-room dance together." },
  { id: "dare-3", text: "Give your partner a ten-second hug." },
  { id: "dare-4", text: "Recreate your first date in exactly three sentences." },
  { id: "dare-5", text: "Let your partner choose your next non-alcoholic drink." },
  { id: "dare-6", text: "Take turns saying one thing you appreciate about each other." },
  { id: "dare-7", text: "Make your best dramatic movie-trailer voice for your relationship." },
  { id: "dare-8", text: "Plan a five-minute mini-date you could do right now." },
];

export const PROMPTS: Record<TruthOrDareMode, Prompt[]> = {
  truth: TRUTHS,
  dare: DARES,
};
