import styles from "./logo.module.css";

export default function Logo() {
  return (
    <span className={styles.logo}>
      <h1 className={styles.hiddenAppName}>Wewo</h1>
    </span>
  );
}
