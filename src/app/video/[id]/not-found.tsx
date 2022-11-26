"use client";

import { useRouter } from "next/navigation";
import styles from "./not-found.module.css";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.replace("/");
  };

  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>Video not found😐</h1>
      <button className={styles.back} onClick={handleGoBack}>
        Back to save place
      </button>
    </div>
  );
}
