"use client";

import { useEffect } from "react";
import styles from "./errorBoundary.module.css";

interface IErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: IErrorBoundaryProps) {
  useEffect(() => {
    console.error(error.message);
  }, [error]);

  const handleReset = () => {
    reset();
  };

  return (
    <section className={styles.errorContainer}>
      <h1 className={styles.title}>{error.message}</h1>
      <button className={styles.reset} onClick={handleReset} title="Reset"></button>
    </section>
  );
}
