"use client";

import Link from "next/link";
import Image from "next/image";
import { IVideo } from "../../../shared/interfaces/IVideo";
import styles from "./card.module.css";

interface ICardProps {
  video: IVideo;
}

export default function Card({ video }: ICardProps) {
  return (
    <Link href="/" className={styles.card}>
      <div className={styles.preview}>
        <Image src={video.snippet.thumbnails.high.url} alt={video.snippet.title} fill />
        <div className={styles.play}></div>
      </div>
    </Link>
  );
}
