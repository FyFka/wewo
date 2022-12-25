import styles from "./search.module.css";
import Card from "../../../components/videos/card/card";
import LoadableSearch from "../../../components/videos/loadable/loadableSearch";
import { getVideosByKey } from "../../../external/videos";

export default async function Search({ searchParams }: { searchParams?: { query: string } }) {
  const videos = await getVideosByKey(searchParams?.query ? searchParams.query : "");

  const videosWithoutPlaylists = videos.items.filter((item) => item.id.kind !== "youtube#playlist");
  return (
    <section className={styles.search}>
      {videosWithoutPlaylists.map(({ id, snippet }) => (
        <Card
          key={snippet.publishedAt}
          videoId={id}
          title={snippet.title}
          channelId={snippet.channelId}
          channelTitle={snippet.channelTitle}
          thumbnails={snippet.thumbnails}
          isChannel={id.kind === "youtube#channel"}
        />
      ))}
      <LoadableSearch initPageToken={videos.nextPageToken} />
    </section>
  );
}
