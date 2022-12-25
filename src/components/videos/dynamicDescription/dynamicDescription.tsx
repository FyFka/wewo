"use client";

import styles from "./dynamicDescription.module.css";
import { useMemo, useState } from "react";

interface IDynamicDescriptionProps {
  description: string;
}

export default function DynamicDescription({ description }: IDynamicDescriptionProps) {
  const [isUnwrapped, setIsUnwrapped] = useState(false);

  const handleUnwrap = () => {
    setIsUnwrapped(true);
  };

  const parseDescription = () => {
    const descriptionParts = description.split("\n");

    return descriptionParts.map((slice, idx) => (
      <p className={styles.row} key={idx}>
        {slice}
      </p>
    ));
  };

  const parsedDescription = useMemo(parseDescription, [description]);
  if (isUnwrapped) {
    return (
      <div className={styles.unwrapped}>
        <div className={styles.description}>{parsedDescription}</div>
      </div>
    );
  } else {
    return (
      <button className={styles.wrapped} onClick={handleUnwrap}>
        <div className={styles.description}>{parsedDescription}</div>
      </button>
    );
  }
}
