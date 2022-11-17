import { IVideoPreview } from "../../shared/interfaces/IVideo";
import Card from "./card/card";
import styles from "./videos.module.css";

interface IVideosProps {
  videos: IVideoPreview[];
}

export default function Videos({ videos }: IVideosProps) {
  return (
    <section className={styles.videos}>
      {videos.map((video) => (
        <Card video={video} key={video.id} />
      ))}
    </section>
  );
}
