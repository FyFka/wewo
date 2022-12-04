"use client";

import { useEffect, useState } from "react";
import styles from "./errorBoundary.module.css";

interface IErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: IErrorBoundaryProps) {
  const [isShowError, setShowError] = useState(false);

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  const handleReset = () => {
    reset();
  };

  const handleShow = () => {
    setShowError(true);
  };

  return (
    <section className={styles.errorContainer}>
      <h1 className={styles.title}>Something bad happened😨</h1>
      {isShowError && (
        <div className={styles.errorDisplay}>
          <h4 className={styles.message}>{error.message}</h4>
          <p>{error.stack}</p>
        </div>
      )}
      {!isShowError && (
        <button className={styles.show} onClick={handleShow}>
          Show me
        </button>
      )}
      <button className={styles.reset} onClick={handleReset} title="Reset"></button>
    </section>
  );
}
