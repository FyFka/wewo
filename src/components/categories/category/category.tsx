import Link from "next/link";
import Image from "next/image";
import styles from "./category.module.css";

interface ICategoryProps {
  to: string;
  name: string;
  compact?: boolean;
  icon?: string;
}

export default function Category({ to, name, compact, icon }: ICategoryProps) {
  return (
    <Link className={`${compact ? styles.compactCategory : styles.category}`} href={to}>
      {icon && <Image src={icon} width={32} height={32} alt={`${name}'s category`} priority />}
      <h6 className={styles.categoryName}>{name}</h6>
    </Link>
  );
}
