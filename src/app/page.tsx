import Categories from "../components/categories/categories";
import Videos from "../components/videos/videos";
import { apiHost, apiKey } from "../shared/configuration";
import { IVideoPreviewList } from "../shared/interfaces/Video";

async function getVideos() {
  const params = new URLSearchParams({
    part: "snippet,contentDetails,statistics",
    chart: "mostPopular",
    maxResults: "50",
    regionCode: "US",
    key: apiKey,
  });

  const endpoint = `${apiHost}/videos?${params}`;
  const res = await fetch(endpoint, {
    next: {
      revalidate: 1800,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch videos");
  }
  const data = await res.json();
  return data as IVideoPreviewList;
}

export default async function Home() {
  const videos = await getVideos();

  return (
    <>
      <Categories />
      <Videos videos={videos.items} />
    </>
  );
}
