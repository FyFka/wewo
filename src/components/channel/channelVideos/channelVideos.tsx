import { IVideoSearchItem } from "../../../shared/interfaces/Search";
import Card from "../../videos/card/card";
import styles from "./channelVideos.module.css";

interface IChannelVideosProps {
  videos: IVideoSearchItem[];
}

export default function ChannelVideos({ videos }: IChannelVideosProps) {
  return (
    <div className={styles.videosContainer}>
      {videos.length > 0 ? (
        videos.map(({ id, snippet }) => (
          <Card
            key={snippet.publishedAt}
            videoId={id.videoId ? id.videoId : id.channelId!}
            title={snippet.title}
            channelTitle={snippet.channelTitle}
            thumbnails={snippet.thumbnails}
          />
        ))
      ) : (
        <h4 className={styles.withoutVideos}>This channel does not have any videos</h4>
      )}
    </div>
  );
}
