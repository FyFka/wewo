"use client";

import Link from "next/link";
import Image from "next/image";
import { IComment, IReplies, IReplySnippet } from "../../../../../shared/interfaces/Comments";
import { toPublishedAt, toViewCount } from "../../../../../shared/helpers";
import { useRef, useState } from "react";
import styles from "./replies.module.css";

interface IRepliesProps {
  initReplies: IComment<IReplySnippet>[];
  totalReplies: number;
}

export default function Replies({ initReplies, totalReplies }: IRepliesProps) {
  const isFirstLoad = useRef(true);
  const pageToken = useRef<string>();
  const [replies, setReplies] = useState<IComment<IReplySnippet>[]>(initReplies);

  const handleLoadMore = async () => {
    const params = new URLSearchParams({
      parentId: replies.at(-1)!.snippet.parentId,
      skip: isFirstLoad.current ? initReplies.length.toString() : "0",
      ...(pageToken.current && { pageToken: pageToken.current }),
    });
    const res = await fetch(`/api/replies?${params}`);
    if (!res.ok) {
      throw new Error("Failed to fetch comment threads");
    }
    const nextReplies = (await res.json()) as IReplies;

    if (isFirstLoad.current) {
      isFirstLoad.current = false;
    }
    pageToken.current = nextReplies.nextPageToken;
    setReplies((repl) => [...repl, ...nextReplies.replies]);
  };

  const isLoadMore =
    (pageToken.current && !isFirstLoad.current) || (isFirstLoad.current && initReplies.length !== totalReplies);
  return (
    <div className={styles.replies}>
      {replies.map((reply) => (
        <div key={reply.id} className={styles.replyContainer}>
          <Link href="/">
            <Image
              className={styles.avatar}
              src={reply.snippet.authorProfileImageUrl}
              height={48}
              width={48}
              alt={`${reply.snippet.authorDisplayName} avatar`}
            />
          </Link>
          <div>
            <Link href="/" className={styles.authorInfo}>
              <h4 className={styles.authorName}>{reply.snippet.authorDisplayName}</h4>
              <span className={styles.publishedAt}>{toPublishedAt(reply.snippet.publishedAt)}</span>
            </Link>
            <p className={styles.authorText}>{reply.snippet.textOriginal}</p>
            <div className={styles.meta}>
              <a className={styles.like} href="/" title="like">
                <Image src="/assets/like.svg" width={24} height={24} alt="likes count" />
                <span className={styles.likeCount}>{toViewCount(reply.snippet.likeCount)}</span>
              </a>
            </div>
          </div>
        </div>
      ))}
      {isLoadMore && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
}
