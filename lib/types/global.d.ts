export interface VideoApiResponse {
  transcript: TranscriptResponse[];
  metaData: VideoMetaData;
  wordFrequency: WordFrequency[];
}

export interface ApiError {
  error: string;
}
type VideoMetaData = {
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
};
