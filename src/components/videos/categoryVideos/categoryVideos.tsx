import { IVideoPreview } from "../../../shared/interfaces/Video";
import Card from "../card/card";
import LoadableCategory from "../loadable/loadableCategory";
import styles from "./categoryVideos.module.css";

interface IVideosProps {
  videos: IVideoPreview[];
  pageCategory: string;
  pageToken?: string;
}

export default function CategoryVideos({ videos, pageCategory, pageToken }: IVideosProps) {
  return (
    <section className={styles.videos}>
      <h2 className={styles.title}>
        <span className={styles.category}>{pageCategory}</span> videos
      </h2>
      <div className={styles.videosContainer}>
        {videos.map(({ snippet, statistics, id }) => (
          <Card
            key={id}
            videoId={id}
            title={snippet.title}
            channelId={snippet.channelId}
            channelTitle={snippet.channelTitle}
            thumbnails={snippet.thumbnails}
            meta={{ viewCount: statistics.viewCount, publishedAt: snippet.publishedAt }}
          />
        ))}
        <LoadableCategory initPageToken={pageToken} />
      </div>
    </section>
  );
}
