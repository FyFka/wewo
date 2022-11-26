import Image from "next/image";
import styles from "./banner.module.css";

interface IBannerProps {
  source: string;
}

export default function Banner({ source }: IBannerProps) {
  return (
    <div className={styles.banner}>
      <Image
        className={styles.image}
        src={`${source}=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
        alt="channel banner"
        fill
      />
    </div>
  );
}
