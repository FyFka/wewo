import styles from "./container.module.css";

interface IContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: IContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
