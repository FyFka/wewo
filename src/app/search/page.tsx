import Card from "../../components/videos/card/card";
import { getVideosBySearch } from "../../external/videos";
import styles from "./search.module.css";

export default async function Search({ searchParams }: { searchParams: { query: string } }) {
  const videos = await getVideosBySearch(searchParams.query);

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
