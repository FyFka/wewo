"use client";

import Link from "next/link";
import Image from "next/image";
import { IThumbnail } from "../../../shared/interfaces/Video";
import { toPublishedAt, toViewCount } from "../../../shared/helpers";
import styles from "./card.module.css";

interface ICardProps {
  thumbnails: IThumbnail;
  title: string;
  videoId: string;
  channelId: string;
  channelTitle: string;
  meta?: { viewCount: string; publishedAt: string };
  isChannel?: boolean;
}

export default function Card({ thumbnails, title, videoId, channelId, channelTitle, meta, isChannel }: ICardProps) {
  const thumbnail = thumbnails.maxres ? thumbnails.maxres.url : thumbnails.high.url;

  return (
    <div className={styles.card}>
      <Link className={styles.previewContainer} href={isChannel ? `/channel/${channelId}` : `/video/${videoId}`}>
        <div className={styles.preview} title={title}>
          <div className={`${styles.imageContainer} ${isChannel ? styles.channelImage : ""}`}>
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1024px) 33vw,
              (max-width: 1440px) 25vw,
              20vw"
            />
          </div>
          {!isChannel && (
            <div className={styles.play}>
              <Image src="/assets/play.svg" alt="play" width={42} height={42} />
              <h4 className={styles.playText}>Play</h4>
            </div>
          )}
        </div>
        <h4 className={styles.title}>{title}</h4>
      </Link>
      <Link href={`/channel/${channelId}`}>
        <h5 className={styles.description}>{channelTitle}</h5>
        {meta && (
          <h6 className={styles.meta}>
            {toViewCount(meta.viewCount)} views
            <span className={styles.published}>{toPublishedAt(meta.publishedAt)}</span>
          </h6>
        )}
      </Link>
    </div>
  );
}
