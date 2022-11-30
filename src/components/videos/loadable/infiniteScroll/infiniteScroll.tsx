"use client";

import { useRef, RefObject } from "react";
import { useObserver } from "../../../../hooks/useObserver";
import styles from "./infiniteScroll.module.css";

interface InfiniteScrollProps {
  children: React.ReactNode;
  onTrigger: () => void;
}

export default function InfiniteScroll({ children, onTrigger }: InfiniteScrollProps) {
  const scrollTrigger = useRef<HTMLDivElement>();
  useObserver({ target: scrollTrigger, onIntersect: handleTrigger });

  function handleTrigger([entry]: IntersectionObserverEntry[]) {
    if (entry.isIntersecting) {
      onTrigger();
    }
  }

  return (
    <>
      {children}
      <div ref={scrollTrigger as RefObject<HTMLDivElement>} className={styles.infiniteScrollTrigger}></div>
    </>
  );
}
