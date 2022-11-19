"use client";

import Link from "next/link";
import Image from "next/image";
import { IVideoPreview } from "../../../shared/interfaces/IVideo";
import styles from "./card.module.css";
import { toPublishedAt, toViewCount } from "../../../shared/helpers";

interface ICardProps {
  video: IVideoPreview;
}

export default function Card({ video }: ICardProps) {
  const previewUrl = video.snippet.thumbnails.maxres
    ? video.snippet.thumbnails.maxres.url
    : video.snippet.thumbnails.high.url;

  return (
    <div className={styles.card}>
      <Link className={styles.previewContainer} href={`/video/${video.id}`} prefetch={false}>
        <div className={styles.preview} title={video.snippet.title}>
          <Image
            src={previewUrl}
            alt={video.snippet.title}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1024px) 33vw,
              (max-width: 1440px) 25vw,
              20vw"
          />
          <div className={styles.play}>
            <Image src="/assets/play.svg" alt="play" width={42} height={42} />
            <h4 className={styles.playText}>Play</h4>
          </div>
        </div>
        <h4 className={styles.title}>{video.snippet.title}</h4>
      </Link>
      <Link href={`/channel/${video.snippet.channelId}`} prefetch={false}>
        <h5 className={styles.description}>{video.snippet.channelTitle}</h5>
        <h6 className={styles.meta}>
          {toViewCount(video.statistics.viewCount)} views
          <span className={styles.published}>{toPublishedAt(video.snippet.publishedAt)}</span>
        </h6>
      </Link>
    </div>
  );
}
