import { MutableRefObject, useEffect } from "react";

interface IUseObserver {
  target: MutableRefObject<HTMLElement | undefined>;
  onIntersect: IntersectionObserverCallback;
  threshold?: number;
}

export function useObserver({ target, onIntersect, threshold = 0 }: IUseObserver) {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { threshold });
    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
}
