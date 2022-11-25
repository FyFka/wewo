"use client";

import Categories from "../../components/categories/categories";
import ErrorBoundary from "../../components/errorBoundary/errorBoundary";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <>
      <Categories />
      <ErrorBoundary error={error} reset={reset} />
    </>
  );
}
