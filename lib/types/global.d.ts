export interface VideoApiResponse {
  transcript: TranscriptResponse[];
  metaData: VideoMetaData;
  wordFrequency: WordFrequency[];
  splitWordFrequency: {
    pronouns: WordFrequency[];
    auxiliaryVerbs: WordFrequency[];
    linkingWords: WordFrequency[];
    conjunctiveAdverbs: WordFrequency[];
    others: WordFrequency[];
  };
}

export interface ApiError {
  error: string;
}
type VideoMetaData = {
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
};
