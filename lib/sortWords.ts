import { TranscriptResponse } from "youtube-transcript-plus/dist/types";
import {
  germanPronouns,
  germanAuxiliaryVerbs,
  germanLinkingWords,
  germanConjunctiveAdverbs,
} from "./utils";
import { VideoApiResponse } from "./types/global";
export interface WordFrequency {
  word: string;
  count: number;
}

export const getSortedWordFrequency = (
  transcript: TranscriptResponse[],
): WordFrequency[] => {
  const frequencyMap: Record<string, { count: number }> = {};

  for (const entry of transcript) {
    // const cleanText = entry.text.replace(/&[a-z0-9]+;/gi, "");
    // const cleanText = entry.text.replace(/&[a-z0-9]+;?/gi, " ");
    // const cleanText = entry.text.replace(/(?:&|(?<=^|\s))[a-z0-9]+;/gi, " ");
    const cleanText = entry.text.replace(
      /&[a-z0-9]+;?|(?<=^|\s)gt;?|(?<=^|\s)amp;?|(?<=^|\s)lt;?/gi,
      " ",
    );
    // Extrahiert Wörter (Unicode-safe)
    const words = cleanText.toLowerCase().match(/[\p{L}]+/gu);

    if (words) {
      for (const word of words) {
        if (!frequencyMap[word]) {
          frequencyMap[word] = { count: 0 };
        }
        frequencyMap[word].count += 1;
      }
    }
  }

  return Object.entries(frequencyMap)
    .map(
      ([word, data]): WordFrequency => ({
        word,
        count: data.count,
      }),
    )
    .sort((a, b) => {
      // Sortierung nach Häufigkeit
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.word.localeCompare(b.word);
    });
};

export const splitByGermanWordTypes = (
  wordFreq: WordFrequency[],
): VideoApiResponse["splitWordFrequency"] => {
  const categories = {
    pronouns: germanPronouns,
    auxiliaryVerbs: germanAuxiliaryVerbs,
    linkingWords: germanLinkingWords,
    conjunctiveAdverbs: germanConjunctiveAdverbs,
  };

  const result: VideoApiResponse["splitWordFrequency"] = {
    pronouns: [],
    auxiliaryVerbs: [],
    linkingWords: [],
    conjunctiveAdverbs: [],
    others: [],
  };

  for (const item of wordFreq) {
    const word = item.word.toLowerCase();

    // Wir suchen den Key des Arrays, das das Wort enthält
    const category = (
      Object.keys(categories) as Array<keyof typeof categories>
    ).find((key) => categories[key].includes(word));

    if (category) {
      result[category].push(item);
    } else {
      result.others.push(item);
    }
  }

  return result;
};
