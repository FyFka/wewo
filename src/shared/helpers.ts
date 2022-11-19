export const toViewCount = (viewCount: string | number) => {
  const count = Number(viewCount);
  if (count > 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count > 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  } else {
    return viewCount;
  }
};

export const toPublishedAt = (publishedAt: string) => {
  const date = new Date(publishedAt);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  if (diffDays > 365) {
    return `${Math.floor(diffDays / 365)} year ago`;
  } else if (diffDays > 30) {
    return `${Math.floor(diffDays / 30)} month ago`;
  } else if (diffDays > 7) {
    return `${Math.floor(diffDays / 7)} week ago`;
  } else if (diffDays > 1) {
    return `${diffDays} days ago`;
  } else {
    return "today";
  }
};
