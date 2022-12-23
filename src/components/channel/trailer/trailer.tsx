import Link from "next/link";
import { useMemo } from "react";
import { IVideo } from "../../../shared/interfaces/Video";
import DynamicDescription from "../../videos/dynamicDescription/dynamicDescription";
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
      <div className={styles.trailerInfo}>
        <Link href={`/video/${trailer.id}`} className={styles.title}>
          {trailer.snippet.title}
        </Link>
        <DynamicDescription description={trailer.snippet.description} />
      </div>
    </div>
  );
}
