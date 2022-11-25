"use client";

import { RefObject, useRef, useState } from "react";
import { useObserver } from "../../../hooks/useObserver";
import { IVideoPreview, IVideoPreviewList } from "../../../shared/interfaces/Video";
import Card from "../card/card";
import styles from "./infiniteVideos.module.css";

interface InfiniteVideosProps {
  pageToken?: string;
}

export default function InfiniteVideos({ pageToken }: InfiniteVideosProps) {
  const [videos, setVideos] = useState<IVideoPreview[]>([]);
  const infiniteScroll = useRef<HTMLDivElement>();
  const observerValue = useRef<string>(pageToken || "");
  useObserver({ target: infiniteScroll, onIntersect: handleLoadVideos });

  async function handleLoadVideos([entry]: IntersectionObserverEntry[]) {
    if (entry.isIntersecting && observerValue.current) {
      const params = new URLSearchParams({ pageToken: observerValue.current });
      const res = await fetch(`/api/category?${params}`);
      if (!res.ok) {
        throw new Error("Failed to fetch category videos");
      }
      const videosList = (await res.json()) as IVideoPreviewList;
      observerValue.current = videosList.nextPageToken || "";
      setVideos((prev) => [...prev, ...videosList.items]);
    }
  }

  return (
    <>
      {videos.map(({ snippet, statistics, id }) => (
        <Card
          key={id}
          videoId={id}
          title={snippet.title}
          channelId={snippet.channelId}
          channelTitle={snippet.channelTitle}
          thumbnails={snippet.thumbnails}
          meta={{ viewCount: statistics.viewCount, publishedAt: snippet.publishedAt }}
        />
      ))}
      <div ref={infiniteScroll as RefObject<HTMLDivElement>} className={styles.infiniteScrollTrigger}></div>
    </>
  );
}
