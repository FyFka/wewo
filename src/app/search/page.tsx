import Card from "../../components/videos/card/card";
import { getVideosByKey } from "../../external/videos";
import styles from "./search.module.css";

export default async function Search({ searchParams }: { searchParams?: { query: string } }) {
  const videos = await getVideosByKey(searchParams?.query ? searchParams.query : "");

  return (
    <section className={styles.search}>
      {videos.items.map(({ id, snippet }) => (
        <Card
          key={snippet.publishedAt}
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
