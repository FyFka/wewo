import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>Video not found😐</h1>
      <Link href="/" className={styles.back}>
        Back to save place
      </Link>
    </div>
  );
}
