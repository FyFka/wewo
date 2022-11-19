import Link from "next/link";
import Image from "next/image";
import { IUserComment } from "../../../../shared/interfaces/IComments";
import { toPublishedAt, toViewCount } from "../../../../shared/helpers";
import styles from "./comment.module.css";

interface ICommentProps {
  comment: IUserComment;
}

export default function Comment({ comment }: ICommentProps) {
  const rootComment = comment.snippet.topLevelComment.snippet;
  return (
    <div className={styles.commentContainer} title={rootComment.authorDisplayName}>
      <Link href="/">
        <Image
          className={styles.avatar}
          src={rootComment.authorProfileImageUrl}
          height={48}
          width={48}
          alt={`${rootComment.authorDisplayName} avatar`}
        />
      </Link>
      <div>
        <Link href="/" className={styles.authorInfo}>
          <h4 className={styles.authorName}>{rootComment.authorDisplayName}</h4>
          <span className={styles.publishedAt}>{toPublishedAt(rootComment.publishedAt)}</span>
        </Link>
        <p className={styles.authorComment}>{rootComment.textOriginal}</p>
        <div className={styles.meta}>
          <a className={styles.like} href="/" title="like">
            <Image src="/assets/like.svg" width={24} height={24} alt="likes count" />
            <span className={styles.likeCount}>{toViewCount(rootComment.likeCount)}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
