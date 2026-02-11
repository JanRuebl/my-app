import { getSortedWordFrequency, WordFrequency } from "@/lib/sortWords";
import { ApiError, VideoApiResponse, VideoMetaData } from "@/lib/types/global";
import { NextRequest, NextResponse } from "next/server";
import { fetchTranscript } from "youtube-transcript-plus";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<VideoApiResponse | ApiError>> {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 },
    );
  }
  try {
    const transcript = await getTranscript(url);
    const metaData = await getVideoMetaData(url);
    const wordFrequency = getSortedWordFrequency(transcript);

    return NextResponse.json({ transcript, metaData, wordFrequency });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

const getTranscript = async (url: string) => {
  const transcript = await fetchTranscript(url, {});
  if (!transcript) throw new Error("Transkript konnte nicht geladen werden");

  return transcript;
};

const getVideoMetaData = async (url: string) => {
  const oembedUrl = `https://www.youtube.com/oembed?url=${url}&format=json`;
  const metaResponse = await fetch(oembedUrl);
  if (!metaResponse.ok)
    throw new Error("Metadaten konnten nicht geladen werden");
  const metaData = (await metaResponse.json()) as VideoMetaData;

  return metaData;
};
