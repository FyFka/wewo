"use client";

import { useMemo, useState } from "react";
import styles from "./dynamicDescription.module.css";

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
  return (
    <>
      {!isUnwrapped && (
        <button className={styles.unwrap} onClick={handleUnwrap}>
          <div className={styles.description}>{parsedDescription}</div>
        </button>
      )}
      {isUnwrapped && <div className={styles.description}>{parsedDescription}</div>}
    </>
  );
}
