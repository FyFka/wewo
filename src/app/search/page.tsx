import { rapidApiKey, rapidApiHost } from "../../shared/configuration";
import { URLSearchParams } from "url";
import { IVideoSearchList } from "../../shared/interfaces/Search";
import Card from "../../components/videos/card/card";
import styles from "./search.module.css";

async function getSearchVideos(query: string) {
  const params = new URLSearchParams({
    part: "snippet",
    q: query,
    maxResults: "50",
    regionCode: "US",
  });

  const endpoint = `${rapidApiHost}/search?${params}`;
  const res = await fetch(endpoint, {
    cache: "no-store",
    headers: { "X-RapidAPI-Key": rapidApiKey, "X-RapidAPI-Host": rapidApiHost.slice(8) },
  });
  if (!res.ok) throw new Error("Failed to fetch videos");
  const data = await res.json();
  return data as IVideoSearchList;
}

export default async function Search({ searchParams }: { searchParams: { query: string } }) {
  const videos = await getSearchVideos(searchParams.query);

  return (
    <section className={styles.search}>
      {videos.items.map(({ id, snippet }) => (
        <Card
          key={id.videoId ? id.videoId : id.channelId}
          videoId={id.videoId ? id.videoId : id.channelId!}
          title={snippet.title}
          channelId={snippet.channelId}
          channelTitle={snippet.channelTitle}
          thumbnails={snippet.thumbnails}
          isChannel={id.kind === "youtube#channel"}
        />
      ))}
    </section>
  );
}
