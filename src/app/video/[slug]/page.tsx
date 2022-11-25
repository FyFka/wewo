import { apiHost, apiKey } from "../../../shared/configuration";
import { IVideoView } from "../../../shared/interfaces/Video";
import { notFound } from "next/navigation";
import Image from "next/image";
import DynamicDescription from "../../../components/videos/dynamicDescription/dynamicDescription";
import { toViewCount } from "../../../shared/helpers";
import CommentThreads from "../../../components/videos/commentThreads/commentThreads";
import styles from "./video.module.css";

async function getVideo(videoId: string) {
  const params = new URLSearchParams({
    part: "snippet,player,contentDetails,statistics",
    id: videoId,
    regionCode: "US",
    key: apiKey,
  });

  const endpoint = `${apiHost}/videos?${params}`;
  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch video");
  const data = await res.json();
  return data as IVideoView;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const videoView = await getVideo(params.slug);
  if (videoView.items.length === 0) {
    notFound();
  }

  const video = videoView.items[0];
  return (
    <div>
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
          <Image width={24} height={24} src="/assets/like.svg" alt="likes count" />
          <span>{toViewCount(video.statistics.likeCount)}</span>
        </a>
      </div>
      <DynamicDescription description={video.snippet.description} />
      <CommentThreads videoId={video.id} count={video.statistics.commentCount} />
    </div>
  );
}
