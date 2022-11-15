"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import Category from "./category/category";
import styles from "./categories.module.css";

const categoriesMock = [
  { to: "/", name: "Trending", icon: "/assets/categories/trending.svg" },
  { to: "/", name: "Music", icon: "/assets/categories/music.svg" },
  { to: "/", name: "Gaming", icon: "/assets/categories/gaming.svg" },
  { to: "/", name: "News", icon: "/assets/categories/news.svg" },
  { to: "/", name: "Movies", icon: "/assets/categories/movies.svg" },
  { to: "/", name: "Learning", icon: "/assets/categories/learning.svg" },
  { to: "/", name: "Sports", icon: "/assets/categories/sports.svg" },
];

export default function Categories() {
  const categories = useRef<HTMLElement>();
  const [compact, setCompact] = useState(false);

  const handleChangeCompact = (entry: IntersectionObserverEntry[]) => {
    if (!entry[0].isIntersecting) {
      setCompact(true);
    } else {
      setCompact(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleChangeCompact, { threshold: 0.5 });
    const htmlSection = categories.current;
    if (htmlSection) {
      observer.observe(htmlSection);
    }
  }, []);

  return (
    <>
      <section ref={categories as RefObject<HTMLElement>} className={styles.categories}>
        <nav className={styles.categoriesInner}>
          {categoriesMock.map(({ to, name, icon }) => (
            <Category to={to} name={name} key={name} icon={icon} />
          ))}
        </nav>
      </section>
      {compact && (
        <section className={styles.compactCategories}>
          <nav className={styles.categoriesInner}>
            {categoriesMock.map(({ to, name }) => (
              <Category to={to} name={name} key={name} compact={compact} />
            ))}
          </nav>
        </section>
      )}
    </>
  );
}
