import styles from "./banner.module.css";
import Image from "next/image";

interface IBannerProps {
  source?: string;
}

export default function Banner({ source }: IBannerProps) {
  return (
    <div className={styles.banner}>
      {source && (
        <Image
          className={styles.image}
          src={`${source}=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
          alt="channel banner"
          fill
        />
      )}
    </div>
  );
}
