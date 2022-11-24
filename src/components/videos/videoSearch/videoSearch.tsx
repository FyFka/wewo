import { IVideoSearch } from "../../../shared/interfaces/Search";
import Card from "../card/card";
import styles from "./videoSearch.module.css";

interface IVideoSearchProps {
  videos: IVideoSearch[];
}

export default function VideoSearch({ videos }: IVideoSearchProps) {
  return (
    <section className={styles.videoSearch}>
      {videos.map(({ id, snippet }) => (
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
