"use client";

import { useRef, useState } from "react";
import { FieldLabel, FieldSet, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VideoApiResponse } from "@/lib/types/global";
import Ranking from "./ranking";

const Page = () => {
  const [videoData, setVideoData] = useState<VideoApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const handleFetchData = async () => {
    const videoUrl = urlInputRef.current?.value;
    if (!videoUrl || loading) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/video?url=${encodeURIComponent(videoUrl)}`);
      if (!res.ok) throw new Error("Fetch failed");

      const result = (await res.json()) as VideoApiResponse;
      setVideoData(result);
    } catch (error) {
      console.error("Fehler beim Laden der Video-Daten:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <FieldSet>
            <Field>
              <FieldLabel>Youtube URL</FieldLabel>
              <Input
                ref={urlInputRef}
                id='url'
                placeholder='youtube url here'
                disabled={loading}
                required
              />
              <Field orientation='horizontal'>
                <Button
                  type='submit'
                  onClick={handleFetchData}
                  disabled={loading}>
                  {loading ? "Lädt..." : "Abrufen"}
                </Button>
              </Field>
            </Field>
          </FieldSet>
        </CardContent>
      </Card>
      {videoData && (
        <>
          <h4 className='text-2xl font-bold mb-4'>
            {videoData.metaData.title}
          </h4>
          <Image
            src={videoData.metaData.thumbnail_url}
            alt='Video Thumbnail'
            width={200}
            height={112}
            unoptimized
          />
          <p className='mb-2'>Autor: {videoData.metaData.author_name}</p>
          <p className='mb-4'>
            Anzahl Wörter: {videoData.wordFrequency.length}
          </p>
          <div className='flex gap-2'>
            <div className='w-full'>
              <h1>others</h1>
              <Ranking data={videoData.splitWordFrequency.others} />
            </div>
            <div>
              <h1>pronouns</h1>
              <Ranking data={videoData.splitWordFrequency.pronouns} />
            </div>
            <div>
              <h1>auxiliary verbs</h1>
              <Ranking data={videoData.splitWordFrequency.auxiliaryVerbs} />
            </div>
            <div>
              <h1>linking words</h1>
              <Ranking data={videoData.splitWordFrequency.linkingWords} />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Page;
