import styles from "./loading.module.css";

export default function ChannelLoading() {
  return (
    <section>
      <div className={styles.banner}></div>
      <div className={styles.preview}>
        <div className={styles.info}>
          <div className={styles.avatar}></div>
          <div>
            <div className={styles.meta}></div>
            <div className={styles.meta}></div>
            <div className={styles.meta}></div>
          </div>
        </div>
        <div className={styles.subscribe}></div>
      </div>
      <div className={styles.videos}></div>
    </section>
  );
}
