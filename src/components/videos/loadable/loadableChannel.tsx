"use client";

import { useRef, useState } from "react";
import { IVideoSearch, IVideoSearchItem } from "../../../shared/interfaces/Search";
import { IVideoPreview } from "../../../shared/interfaces/Video";
import Card from "../card/card";
import InfiniteScroll from "./infiniteScroll/infiniteScroll";

interface ILoadableChannelProps {
  initPageToken?: string;
  channelId: string;
}

export default function LoadableChannel({ initPageToken, channelId }: ILoadableChannelProps) {
  const pageToken = useRef(initPageToken || "");
  const [searchVideos, setSearchVideos] = useState<IVideoSearchItem[]>([]);

  const handleLoadSearch = async () => {
    if (pageToken.current) {
      const params = new URLSearchParams({ pageToken: pageToken.current, channelId, type: "video" });
      const res = await fetch(`/api/search?${params}`);
      const { items, nextPageToken }: IVideoSearch = await res.json();
      pageToken.current = nextPageToken || "";
      setSearchVideos((prev) => [...prev, ...items]);
    }
  };

  return (
    <InfiniteScroll onTrigger={handleLoadSearch}>
      {searchVideos.map(({ id, snippet }) => (
        <Card
          key={snippet.publishedAt}
          videoId={id}
          title={snippet.title}
          channelTitle={snippet.channelTitle}
          thumbnails={snippet.thumbnails}
        />
      ))}
    </InfiniteScroll>
  );
}
