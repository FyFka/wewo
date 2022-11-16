"use client";

import Link from "next/link";
import Image from "next/image";
import { IVideo } from "../../../shared/interfaces/IVideo";
import styles from "./card.module.css";

interface ICardProps {
  video: IVideo;
}

export default function Card({ video }: ICardProps) {
  const previewUrl = video.snippet.thumbnails.maxres
    ? video.snippet.thumbnails.maxres.url
    : video.snippet.thumbnails.high.url;

  const toViewCount = (viewCount: string) => {
    const count = Number(viewCount);
    if (count > 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count > 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    } else {
      return video.statistics.viewCount;
    }
  };

  const toPublishedAt = (publishedAt: string) => {
    const date = new Date(publishedAt);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays > 365) {
      return `${Math.floor(diffDays / 365)} year ago`;
    } else if (diffDays > 30) {
      return `${Math.floor(diffDays / 30)} month ago`;
    } else if (diffDays > 7) {
      return `${Math.floor(diffDays / 7)} week ago`;
    } else if (diffDays > 1) {
      return `${diffDays} days ago`;
    } else {
      return "today";
    }
  };

  return (
    <div className={styles.card}>
      <Link className={styles.previewContainer} href="/video">
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
      <Link href="/channel">
        <h5 className={styles.description}>{video.snippet.channelTitle}</h5>
        <h6 className={styles.meta}>
          {toViewCount(video.statistics.viewCount)} views
          <span className={styles.published}>{toPublishedAt(video.snippet.publishedAt)}</span>
        </h6>
      </Link>
    </div>
  );
}
