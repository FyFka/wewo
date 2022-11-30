"use client";

import { useRef, useState } from "react";
import { IVideoSearchItem } from "../../../shared/interfaces/Search";
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
      const videoList = await res.json();
      const filteredVideos = videoList.items.filter((video: IVideoSearchItem) => video.id.kind !== "youtube#channel");
      pageToken.current = videoList.nextPageToken || "";
      setSearchVideos((prev) => [...prev, ...filteredVideos]);
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
