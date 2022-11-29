"use client";

import { useRef, useState } from "react";
import { IVideoSearchItem } from "../../../shared/interfaces/Search";
import Card from "../card/card";
import InfiniteScroll from "./infiniteScroll/infiniteScroll";

interface ILoadableSearchProps {
  initPageToken?: string;
}

export default function LoadableSearch({ initPageToken }: ILoadableSearchProps) {
  const pageToken = useRef(initPageToken || "");
  const [searchVideos, setSearchVideos] = useState<IVideoSearchItem[]>([]);

  const handleLoadSearch = async () => {
    if (pageToken.current) {
      const params = new URLSearchParams({ pageToken: pageToken.current });
      const res = await fetch(`/api/search?${params}`);
      const videoList = await res.json();
      pageToken.current = videoList.nextPageToken || "";
      setSearchVideos((prev) => [...prev, ...videoList.items]);
    }
  };

  return (
    <InfiniteScroll onTrigger={handleLoadSearch}>
      {searchVideos.map(({ id, snippet }) => (
        <Card
          key={snippet.publishedAt}
          videoId={id}
          title={snippet.title}
          channelId={snippet.channelId}
          channelTitle={snippet.channelTitle}
          thumbnails={snippet.thumbnails}
          isChannel={id.kind === "youtube#channel"}
        />
      ))}
    </InfiniteScroll>
  );
}
