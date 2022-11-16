import Image from "next/image";
import Link from "next/link";
import styles from "./logo.module.css";

export default function Logo() {
  return (
    <Link className={styles.logo} href="/">
      <Image src="/assets/logo.svg" alt="Wewo" width={32} height={32} />
      <h1 className={styles.appName}>Wewo</h1>
    </Link>
  );
}
