import { IVideo } from "../../../shared/interfaces/Video";
import styles from "./trailer.module.css";

interface ITrailerProps {
  trailer: IVideo;
}

export default function Trailer({ trailer }: ITrailerProps) {
  return (
    <div className={styles.trailer}>
      <iframe
        className={styles.player}
        src={`https://www.youtube.com/embed/${trailer.id}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div>
        <h2 className={styles.title}>{trailer.snippet.title}</h2>
        <p className={styles.description}>{trailer.snippet.description}</p>
      </div>
    </div>
  );
}
