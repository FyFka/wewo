"use client";

import styles from "./commentThreads.module.css";
import { useEffect, useRef, useState } from "react";
import { useObserver } from "../../../hooks/useObserver";
import { toViewCount } from "../../../shared/helpers";
import { ICommentThreadsItem, ICommentThreads } from "../../../shared/interfaces/Comments";
import Comment from "./comment/comment";

interface ICommentsProps {
  videoId: string;
  count: string;
}

export default function CommentThreads({ videoId, count }: ICommentsProps) {
  const [threads, setThreads] = useState<ICommentThreadsItem[]>([]);
  const pageToken = useRef<string>();
  const scrollTrigger = useRef<HTMLDivElement>(null);
  useObserver({ target: scrollTrigger, onIntersect: handleLoadMore });

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams({ videoId });
      const res = await fetch(`/api/commentThreads?${params}`);
      const { items, nextPageToken }: ICommentThreads = await res.json();
      pageToken.current = nextPageToken;
      setThreads(items);
    })();
  }, []);

  async function handleLoadMore([entry]: IntersectionObserverEntry[]) {
    if (entry.isIntersecting && pageToken.current) {
      const params = new URLSearchParams({ videoId, pageToken: pageToken.current });
      const res = await fetch(`/api/commentThreads?${params}`);
      const { items, nextPageToken }: ICommentThreads = await res.json();
      pageToken.current = nextPageToken;
      setThreads((prev) => [...prev, ...items]);
    }
  }

  return (
    <div className={styles.threadsContainer}>
      <h3 className={styles.threadsCount}>{toViewCount(count)} Comments</h3>
      <div className={styles.threads}>
        {threads.map((thread) => (
          <Comment key={thread.id} thread={thread} />
        ))}
        <div ref={scrollTrigger} className={styles.infiniteScrollTrigger}></div>
      </div>
    </div>
  );
}
