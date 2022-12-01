"use client";

import { useRef, useState } from "react";
import { CategoryEnum } from "../../../shared/interfaces/Categories";
import { IVideoPreviewItem, IVideoPreview } from "../../../shared/interfaces/Video";
import Card from "../card/card";
import InfiniteScroll from "./infiniteScroll/infiniteScroll";

interface ILoadableCategoryProps {
  initPageToken?: string;
  category: CategoryEnum;
}

export default function LoadableCategory({ initPageToken, category }: ILoadableCategoryProps) {
  const pageToken = useRef(initPageToken || "");
  const [categoryVideos, setCategoryVideos] = useState<IVideoPreviewItem[]>([]);

  const handleLoadCategory = async () => {
    if (pageToken.current) {
      const params = new URLSearchParams({ pageToken: pageToken.current, categoryId: category });
      const res = await fetch(`/api/category?${params}`);
      const { items, nextPageToken }: IVideoPreview = await res.json();
      pageToken.current = nextPageToken || "";
      setCategoryVideos((prev) => [...prev, ...items]);
    }
  };

  return (
    <InfiniteScroll onTrigger={handleLoadCategory}>
      {categoryVideos.map(({ id, snippet, statistics }) => (
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
