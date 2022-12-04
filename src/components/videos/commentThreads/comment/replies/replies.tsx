"use client";

import Link from "next/link";
import Image from "next/image";
import { IComment, IReplies, IReplySnippet } from "../../../../../shared/interfaces/Comments";
import { toPublishedAt, toViewCount } from "../../../../../shared/helpers";
import { useRef, useState } from "react";
import styles from "./replies.module.css";

interface IRepliesProps {
  initReplies: IComment<IReplySnippet>[];
  parentId: string;
  totalReplies: number;
}

export default function Replies({ initReplies, totalReplies, parentId }: IRepliesProps) {
  const skipCount = useRef(initReplies.length);
  const pageToken = useRef<string>();
  const [replies, setReplies] = useState<IComment<IReplySnippet>[]>(initReplies);

  const handleLoadMore = async () => {
    const params = new URLSearchParams({
      parentId,
      skip: skipCount.current.toString(),
      ...(pageToken.current && { pageToken: pageToken.current }),
    });
    const res = await fetch(`/api/replies?${params}`);
    const nextReplies: IReplies = await res.json();
    if (skipCount.current !== 0) {
      skipCount.current = 0;
    }
    pageToken.current = nextReplies.nextPageToken;
    setReplies((repl) => [...repl, ...nextReplies.replies]);
  };

  const isLoadMore =
    (pageToken.current && !Boolean(skipCount.current)) ||
    (Boolean(skipCount.current) && initReplies.length !== totalReplies);
  return (
    <div className={styles.replies}>
      {replies.map((reply) => (
        <div key={reply.id} className={styles.replyContainer}>
          <Link href={`/channel/${reply.snippet.authorChannelId.value}`}>
            <Image
              className={styles.avatar}
              src={reply.snippet.authorProfileImageUrl}
              height={48}
              width={48}
              alt={`${reply.snippet.authorDisplayName} avatar`}
            />
          </Link>
          <div>
            <Link href={`/channel/${reply.snippet.authorChannelId.value}`} className={styles.authorInfo}>
              <h4 className={styles.authorName}>{reply.snippet.authorDisplayName}</h4>
              <span className={styles.publishedAt}>{toPublishedAt(reply.snippet.publishedAt)}</span>
            </Link>
            <p className={styles.authorText}>{reply.snippet.textOriginal}</p>
            <div className={styles.action}>
              <a className={styles.like} href={`https://www.youtube.com/watch?v=${reply.snippet.videoId}`} title="like">
                <Image className={styles.likeIcon} src="/assets/like.svg" width={24} height={24} alt="like" />
                <span className={styles.likeCount}>{toViewCount(reply.snippet.likeCount)}</span>
              </a>
              <a
                className={styles.dislike}
                href={`https://www.youtube.com/watch?v=${reply.snippet.videoId}`}
                title="dislike"
              >
                <Image className={styles.likeIcon} src="/assets/like.svg" width={24} height={24} alt="dislike" />
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
