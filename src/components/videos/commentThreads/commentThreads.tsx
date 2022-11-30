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
  const scrollTrigger = useRef<HTMLDivElement>();
  const observerValue = useRef<ICommentThreads>();
  useObserver({ target: scrollTrigger, onIntersect: handleLoadMore });

  useEffect(() => {
    observerValue.current = commentThreads;
  }, [commentThreads]);

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams({ videoId });
      const res = await fetch(`/api/commentThreads?${params}`);
      const threads = await res.json();
      setCommentThreads(threads as ICommentThreads);
    })();
  }, []);

  async function handleLoadMore([entry]: IntersectionObserverEntry[]) {
    if (entry.isIntersecting && observerValue.current?.nextPageToken) {
      const params = new URLSearchParams({ videoId, pageToken: observerValue.current.nextPageToken });
      const res = await fetch(`/api/commentThreads?${params}`);
      const threads = (await res.json()) as ICommentThreads;
      if (observerValue.current.nextPageToken === threads.nextPageToken) return;
      setCommentThreads((prev) => {
        return prev ? { ...threads, items: [...prev.items, ...threads.items] } : prev;
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
        <div ref={scrollTrigger as RefObject<HTMLDivElement>} className={styles.infiniteScrollTrigger}></div>
      </div>
    </div>
  );
}
