"use client";

import { useEffect, useState } from "react";
import { toViewCount } from "../../../shared/helpers";
import { ICommentThreads } from "../../../shared/interfaces/IComments";
import Comment from "./comment/comment";
import styles from "./commentThreads.module.css";

interface ICommentsProps {
  videoId: string;
  count: string;
}

export default function CommentThreads({ videoId, count }: ICommentsProps) {
  const [commentThreads, setCommentThreads] = useState<ICommentThreads>();

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams({ videoId });
      const comments = await fetch(`/api/commentThreads?${params}`);
      if (!comments.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = (await comments.json()) as ICommentThreads;
      setCommentThreads(data);
    })();
  }, []);

  return (
    <div className={styles.threadsContainer}>
      <h3 className={styles.threadsCount}>{toViewCount(count)} Comments</h3>
      <div className={styles.threads}>
        {commentThreads?.items.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
