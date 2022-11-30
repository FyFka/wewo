import { IVideoSearchItem } from "../../../shared/interfaces/Search";
import Card from "../../videos/card/card";
import LoadableChannel from "../../videos/loadable/loadableChannel";
import styles from "./channelVideos.module.css";

interface IChannelVideosProps {
  videos: IVideoSearchItem[];
  initPageToken?: string;
  channelId: string;
}

export default function ChannelVideos({ videos, initPageToken, channelId }: IChannelVideosProps) {
  return (
    <div className={styles.videosContainer}>
      {videos.length > 0 ? (
        videos.map(({ id, snippet }) => (
          <Card
            key={snippet.publishedAt}
            videoId={id}
            title={snippet.title}
            channelTitle={snippet.channelTitle}
            thumbnails={snippet.thumbnails}
          />
        ))
      ) : (
        <h4 className={styles.withoutVideos}>This channel does not have any videos</h4>
      )}
      <LoadableChannel channelId={channelId} initPageToken={initPageToken} />
    </div>
  );
}
