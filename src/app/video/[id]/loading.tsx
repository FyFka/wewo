import styles from "./loading.module.css";

export default function VideoLoading() {
  return (
    <section>
      <div className={styles.player}></div>
      <div className={styles.info}></div>
      <div className={styles.channel}></div>
      <div className={styles.description}></div>
    </section>
  );
}
