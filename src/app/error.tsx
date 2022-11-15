"use client";

import { useEffect } from "react";
import Header from "../components/header/header";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <Header disabled />
      <h1>Something went wrong</h1>
      <button onClick={() => reset()}>Reset error boundary</button>
    </div>
  );
}
