import styles from "./notFound.module.css";
import Link from "next/link";

interface INotFoundProps {
  title: string;
}

export default function NotFound({ title }: INotFoundProps) {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>{title}</h1>
      <Link href="/" className={styles.back}>
        Back to save place
      </Link>
    </div>
  );
}
