import { apiHost, apiKey } from "../../../shared/configuration";
import { IVideoView } from "../../../shared/interfaces/IVideo";
import { notFound } from "next/navigation";
import Image from "next/image";
import DynamicDescription from "../../../components/videos/dynamicDescription/dynamicDescription";
import styles from "./video.module.css";
import { toViewCount } from "../../../shared/helpers";
import CommentThreads from "../../../components/videos/commentThreads/commentThreads";

async function getVideo(videoId: string) {
  const params = new URLSearchParams({
    part: "snippet,player,contentDetails,statistics",
    id: videoId,
    regionCode: "US",
    key: apiKey,
  });

  const endpoint = `${apiHost}/videos?${params}`;
  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch video");
  }
  const data = await res.json();
  return data as IVideoView;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const video = await getVideo(params.slug);
  if (video.items.length === 0) {
    notFound();
  }

  return (
    <div>
      <iframe
        className={styles.playerFrame}
        src={`https://www.youtube.com/embed/${video.items[0].id}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className={styles.videoInfo}>
        <h2 className={styles.title}>{video.items[0].snippet.title}</h2>
        <a
          className={styles.likesContainer}
          href={`https://www.youtube.com/watch?v=${video.items[0].id}`}
          target="_blank"
          rel="noreferrer"
        >
          <Image width={24} height={24} src="/assets/like.svg" alt="likes count" />
          <span>{toViewCount(video.items[0].statistics.likeCount)}</span>
        </a>
      </div>
      <DynamicDescription description={video.items[0].snippet.description} />
      <CommentThreads videoId={video.items[0].id} count={video.items[0].statistics.commentCount} />
    </div>
  );
}
