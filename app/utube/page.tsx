"use client";

import { useRef, useState } from "react";
import { FieldLabel, FieldSet, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VideoApiResponse } from "@/lib/types/global";
import Ranking from "./ranking";

const page = () => {
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
    <div>
      <Card>
        <CardContent>
          <FieldSet>
            <Field>
              <FieldLabel>Youtube URL</FieldLabel>
              <Input
                ref={urlInputRef}
                id='url'
                placeholder='youtube url here'
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
      {videoData && <Ranking {...videoData} />}
    </div>
  );
};
export default page;
