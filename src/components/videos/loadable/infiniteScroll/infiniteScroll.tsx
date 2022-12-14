"use client";

import styles from "./infiniteScroll.module.css";
import { useRef } from "react";
import { useObserver } from "../../../../hooks/useObserver";

interface InfiniteScrollProps {
  children: React.ReactNode;
  onTrigger: () => void;
}

export default function InfiniteScroll({ children, onTrigger }: InfiniteScrollProps) {
  const scrollTrigger = useRef<HTMLDivElement>(null);
  useObserver({ target: scrollTrigger, onIntersect: handleTrigger });

  function handleTrigger([entry]: IntersectionObserverEntry[]) {
    if (entry.isIntersecting) {
      onTrigger();
    }
  }

  return (
    <>
      {children}
      <div ref={scrollTrigger} className={styles.infiniteScrollTrigger}></div>
    </>
  );
}
