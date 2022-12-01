import { notFound } from "next/navigation";
import Image from "next/image";
import DynamicDescription from "../../../components/videos/dynamicDescription/dynamicDescription";
import { toViewCount } from "../../../shared/helpers";
import CommentThreads from "../../../components/videos/commentThreads/commentThreads";
import { getVideoById } from "../../../external/videos";
import styles from "./video.module.css";

export default async function Video({ params }: { params: { id: string } }) {
  const videoList = await getVideoById(params.id);

  if (videoList.items.length === 0) {
    notFound();
  }

  const video = videoList.items[0];
  return (
    <section>
      <iframe
        className={styles.playerFrame}
        src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className={styles.videoInfo}>
        <h2 className={styles.title}>{video.snippet.title}</h2>
        <a
          className={styles.likesContainer}
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <Image className={styles.likeIcon} width={24} height={24} src="/assets/like.svg" alt="likes count" />
          <span>{toViewCount(video.statistics.likeCount)}</span>
        </a>
      </div>
      <DynamicDescription description={video.snippet.description} />
      <CommentThreads videoId={video.id} count={video.statistics.commentCount} />
    </section>
  );
}
