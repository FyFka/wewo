"use client";

import Link from "next/link";
import Image from "next/image";
import { ICommentThreadsItem } from "../../../../shared/interfaces/Comments";
import { toPublishedAt, toViewCount } from "../../../../shared/helpers";
import { useState } from "react";
import Replies from "./replies/replies";
import styles from "./comment.module.css";

interface ICommentProps {
  thread: ICommentThreadsItem;
}

export default function Comment({ thread }: ICommentProps) {
  const [repliesOpen, setRepliesOpen] = useState(false);

  const handleOpenReplies = () => {
    setRepliesOpen(true);
  };

  const rootComment = thread.snippet.topLevelComment.snippet;
  return (
    <div className={styles.commentContainer} title={rootComment.authorDisplayName}>
      <Link href={`/channel/${rootComment.authorChannelId.value}`}>
        <Image
          className={styles.avatar}
          src={rootComment.authorProfileImageUrl}
          height={48}
          width={48}
          alt={`${rootComment.authorDisplayName} avatar`}
        />
      </Link>
      <div>
        <Link href={`/channel/${rootComment.authorChannelId.value}`} className={styles.authorInfo}>
          <h4 className={styles.authorName}>{rootComment.authorDisplayName}</h4>
          <span className={styles.publishedAt}>{toPublishedAt(rootComment.publishedAt)}</span>
        </Link>
        <p className={styles.authorComment}>{rootComment.textOriginal}</p>
        <div className={styles.meta}>
          <a className={styles.like} href={`https://www.youtube.com/watch?v=${rootComment.videoId}`} title="like">
            <Image src="/assets/like.svg" width={24} height={24} alt="likes count" />
            <span className={styles.likeCount}>{toViewCount(rootComment.likeCount)}</span>
          </a>
        </div>
        {thread.snippet.totalReplyCount > 0 && !repliesOpen && (
          <button onClick={handleOpenReplies} className={styles.replies}>
            {thread.snippet.totalReplyCount} Replies
          </button>
        )}
        {repliesOpen && thread.replies && (
          <Replies
            initReplies={thread.replies.comments}
            totalReplies={thread.snippet.totalReplyCount}
            parentId={thread.id}
          />
        )}
      </div>
    </div>
  );
}
