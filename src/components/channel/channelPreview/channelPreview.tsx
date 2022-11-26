import Image from "next/image";
import { toViewCount } from "../../../shared/helpers";
import styles from "./channelPreview.module.css";

interface IChannelPreviewProps {
  subscribers: number;
  title: string;
  customUrl: string;
  avatar: string;
}

export default function ChannelPreview({ subscribers, title, avatar, customUrl }: IChannelPreviewProps) {
  return (
    <div className={styles.preview}>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <Image src={avatar} alt={`${title}'s avatar`} fill />
        </div>
        <div title={title}>
          <h2 className={styles.title}>{title}</h2>
          <h4 className={styles.customUrl}>{customUrl}</h4>
          <h4 className={styles.viewCount}>{toViewCount(subscribers)} subscribers</h4>
        </div>
      </div>
      <button className={styles.subscribe}>subscribe</button>
    </div>
  );
}
