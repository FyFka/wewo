"use client";

import styles from "./card.module.css";
import Link from "next/link";
import Image from "next/image";
import { IThumbnails } from "../../../shared/interfaces/Thumbnails";
import { toPublishedAt, toViewCount } from "../../../shared/helpers";
import { IVideoSearchId } from "../../../shared/interfaces/Search";

interface ICardProps {
  thumbnails: IThumbnails;
  title: string;
  videoId: string | IVideoSearchId;
  channelId?: string;
  channelTitle: string;
  meta?: { viewCount: string; publishedAt: string };
  isChannel?: boolean;
}

export default function Card({ thumbnails, title, videoId, channelId, channelTitle, meta, isChannel }: ICardProps) {
  const getId = (id: string | IVideoSearchId) => {
    if (typeof id === "string") {
      return id;
    } else if (id.videoId) {
      return id.videoId;
    }
    return id.playlistId;
  };

  return (
    <div className={styles.card} title={JSON.stringify(thumbnails)}>
      <Link className={styles.previewContainer} href={isChannel ? `/channel/${channelId}` : `/video/${getId(videoId)}`}>
        <div className={styles.preview} title={title}>
          <div className={`${styles.imageContainer} ${isChannel ? styles.channelImage : ""}`}>
            <Image src={thumbnails.medium.url} alt={title} fill />
          </div>
          {!isChannel && (
            <div className={styles.play}>
              <Image src="/assets/play.svg" alt="play video" width={42} height={42} />
              <h4 className={styles.playText}>Play</h4>
            </div>
          )}
        </div>
        <h4 className={styles.title}>{title}</h4>
      </Link>
      {channelId && (
        <Link href={`/channel/${channelId}`}>
          <h5 className={styles.description}>{channelTitle}</h5>
          {meta && (
            <h6 className={styles.meta}>
              {toViewCount(meta.viewCount)} views
              <span className={styles.published}>{toPublishedAt(meta.publishedAt)}</span>
            </h6>
          )}
        </Link>
      )}
    </div>
  );
}
