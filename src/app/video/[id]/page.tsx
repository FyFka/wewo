import { notFound } from "next/navigation";
import Image from "next/image";
import DynamicDescription from "../../../components/videos/dynamicDescription/dynamicDescription";
import { toViewCount } from "../../../shared/helpers";
import CommentThreads from "../../../components/videos/commentThreads/commentThreads";
import { getVideoById } from "../../../external/videos";
import styles from "./video.module.css";
import Link from "next/link";

export default async function Video({ params }: { params: { id: string } }) {
  const videoView = await getVideoById(params.id);

  if (videoView.items.length === 0) {
    notFound();
  }

  const video = videoView.items[0];
  return (
    <section>
      <iframe
        className={styles.player}
        src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className={styles.info}>
        <h2 className={styles.title}>{video.snippet.title}</h2>
        <div className={styles.action}>
          <h4 className={styles.views}>{toViewCount(video.statistics.viewCount)} views</h4>
          <a
            className={styles.like}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noreferrer"
            title="like"
          >
            <Image className={styles.actionIcon} width={24} height={24} src="/assets/like.svg" alt="like" />
            <span>{toViewCount(video.statistics.likeCount)}</span>
          </a>
          <a
            className={styles.dislike}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noreferrer"
            title="dislike"
          >
            <Image className={styles.actionIcon} width={24} height={24} src="/assets/like.svg" alt="dislike" />
          </a>
        </div>
      </div>
      <Link className={styles.channel} href={`/channel/${video.snippet.channelId}`}>
        {video.snippet.channelTitle}
      </Link>
      <DynamicDescription description={video.snippet.description} />
      <CommentThreads videoId={video.id} count={video.statistics.commentCount} />
    </section>
  );
}
