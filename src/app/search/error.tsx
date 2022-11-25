"use client";

import ErrorBoundary from "../../components/errorBoundary/errorBoundary";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorBoundary error={error} reset={reset} />;
}
