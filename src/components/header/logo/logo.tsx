import styles from "./logo.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className={styles.logo} href="/">
      <Image src="/assets/logo.svg" alt="WeWo" width={32} height={32} />
      <h1 className={styles.appName}>WeWo</h1>
    </Link>
  );
}
