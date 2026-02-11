import { TranscriptResponse } from "youtube-transcript-plus/dist/types";

export interface WordFrequency {
  word: string;
  count: number;
}

export const getSortedWordFrequency = (
  transcript: TranscriptResponse[],
): WordFrequency[] => {
  const wholeText = transcript.map((item) => item.text).join(" ");
  // 1. Validierung und Splitting
  const words: string[] | null = wholeText.toLowerCase().match(/\w+/g);
  if (!words) return [];

  // 2. Mapping mit Record-Typ
  const frequencyMap: Record<string, number> = {};

  for (const word of words) {
    frequencyMap[word] = (frequencyMap[word] || 0) + 1;
  }

  // 3. Transformation in Array & Sortierung
  return Object.entries(frequencyMap)
    .map(([word, count]): WordFrequency => ({ word, count }))
    .sort((a, b) => {
      // Primär nach Häufigkeit (absteigend)
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      // Sekundär alphabetisch (aufsteigend) bei Gleichstand
      return a.word.localeCompare(b.word);
    });
};
