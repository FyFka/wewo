import Image from "next/image";
import { toViewCount } from "../../../shared/helpers";
import { IThumbnails } from "../../../shared/interfaces/Video";
import styles from "./channelPreview.module.css";

interface IChannelPreviewProps {
  subscribers: string;
  title: string;
  customUrl: string;
  thumbnails: IThumbnails;
}

export default function ChannelPreview({ subscribers, title, thumbnails, customUrl }: IChannelPreviewProps) {
  const thumbnail = thumbnails.maxres ? thumbnails.maxres.url : thumbnails.high.url;

  return (
    <div className={styles.preview}>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <Image src={thumbnail} alt={`${title}'s avatar`} fill />
        </div>
        <div title={title}>
          <h2 className={styles.title}>{title}</h2>
          <h4 className={styles.customUrl}>{customUrl}</h4>
          <h4 className={styles.viewCount}>{toViewCount(subscribers)} subscribers</h4>
        </div>
      </div>
      <a href={`https://www.youtube.com/${customUrl}`} target="_blank" rel="noreferrer" className={styles.subscribe}>
        Subscribe
      </a>
    </div>
  );
}
