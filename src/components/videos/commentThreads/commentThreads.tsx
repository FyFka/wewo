"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { useObserver } from "../../../hooks/useObserver";
import { toViewCount } from "../../../shared/helpers";
import { ICommentThreads } from "../../../shared/interfaces/Comments";
import Comment from "./comment/comment";
import styles from "./commentThreads.module.css";

interface ICommentsProps {
  videoId: string;
  count: string;
}

export default function CommentThreads({ videoId, count }: ICommentsProps) {
  const [commentThreads, setCommentThreads] = useState<ICommentThreads>();
  const infiniteScroll = useRef<HTMLDivElement>();
  const observerValue = useRef<ICommentThreads>();
  useObserver({ target: infiniteScroll, onIntersect: handleLoadMore });

  useEffect(() => {
    observerValue.current = commentThreads;
  }, [commentThreads]);

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams({ videoId });
      const res = await fetch(`/api/commentThreads?${params}`);
      if (!res.ok) {
        throw new Error("Failed to fetch comment threads");
      }
      const threads = (await res.json()) as ICommentThreads;
      setCommentThreads(threads);
    })();
  }, []);

  async function handleLoadMore([entry]: IntersectionObserverEntry[]) {
    if (entry.isIntersecting && observerValue.current?.nextPageToken) {
      const params = new URLSearchParams({ videoId, pageToken: observerValue.current.nextPageToken });
      const res = await fetch(`/api/commentThreads?${params}`);
      if (!res.ok) {
        throw new Error("Failed to fetch comment threads");
      }
      const newThreads = (await res.json()) as ICommentThreads;
      if (observerValue.current.nextPageToken === newThreads.nextPageToken) return;
      setCommentThreads((prev) => {
        return prev ? { ...newThreads, items: [...prev.items, ...newThreads.items] } : prev;
      });
    }
  }

  return (
    <div className={styles.threadsContainer}>
      <h3 className={styles.threadsCount}>{toViewCount(count)} Comments</h3>
      <div className={styles.threads}>
        {commentThreads?.items.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        <div ref={infiniteScroll as RefObject<HTMLDivElement>} className={styles.infiniteScrollTrigger}></div>
      </div>
    </div>
  );
}
