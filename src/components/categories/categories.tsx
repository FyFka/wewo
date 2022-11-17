"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import Category from "./category/category";
import styles from "./categories.module.css";

const categoriesMock = [
  { to: "/", name: "Trending", icon: "/assets/categories/trending.svg" },
  { to: "/gaming", name: "Gaming", icon: "/assets/categories/gaming.svg" },
  { to: "/blogs", name: "People & Blogs", icon: "/assets/categories/blogs.svg" },
  { to: "/animation", name: "Film & Animation", icon: "/assets/categories/animation.svg" },
  { to: "/science", name: "Science & Technology", icon: "/assets/categories/science.svg" },
  { to: "/music", name: "Music", icon: "/assets/categories/music.svg" },
  { to: "/sports", name: "Sports", icon: "/assets/categories/sports.svg" },
];

export default function Categories() {
  const categories = useRef<HTMLElement>();
  const [compact, setCompact] = useState(false);

  const handleChangeCompact = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      setCompact(false);
    } else {
      setCompact(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleChangeCompact, { threshold: 0 });
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
