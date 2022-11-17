import styles from "./video.module.css";
import { apiHost, apiKey } from "../../../shared/configuration";
import { IVideoView } from "../../../shared/interfaces/IVideo";

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
    throw new Error("Video not found");
  }
  const playerSrc = video.items[0].player.embedHtml.match(/src="([^"]+)"/)![1];

  return (
    <div>
      <iframe
        className={styles.playerFrame}
        src={`https:${playerSrc}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <h2 className={styles.title}>{video.items[0].snippet.title}</h2>
      <pre>{video.items[0].snippet.description}</pre>
    </div>
  );
}
