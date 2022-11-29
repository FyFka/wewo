"use client";

import { useRef, useState } from "react";
import { IVideoPreview } from "../../../shared/interfaces/Video";
import Card from "../card/card";
import InfiniteScroll from "./infiniteScroll/infiniteScroll";

interface ILoadableCategoryProps {
  initPageToken?: string;
}

export default function LoadableCategory({ initPageToken }: ILoadableCategoryProps) {
  const pageToken = useRef(initPageToken || "");
  const [searchVideos, setSearchVideos] = useState<IVideoPreview[]>([]);

  const handleLoadSearch = async () => {
    if (pageToken.current) {
      const params = new URLSearchParams({ pageToken: pageToken.current });
      const res = await fetch(`/api/category?${params}`);
      const videoList = await res.json();
      pageToken.current = videoList.nextPageToken || "";
      setSearchVideos((prev) => [...prev, ...videoList.items]);
    }
  };

  return (
    <InfiniteScroll onTrigger={handleLoadSearch}>
      {searchVideos.map(({ id, snippet, statistics }) => (
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
    </InfiniteScroll>
  );
}
