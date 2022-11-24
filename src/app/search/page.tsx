import Categories from "../../components/categories/categories";
import VideoSearch from "../../components/videos/videoSearch/videoSearch";
import { apiKey, apiHost } from "../../shared/configuration";
import { URLSearchParams } from "url";
import { IVideoSearchList } from "../../shared/interfaces/Search";

async function getSearchVideos(query: string) {
  const params = new URLSearchParams({
    part: "snippet",
    q: query,
    maxResults: "50",
    regionCode: "US",
    key: apiKey,
  });

  const endpoint = `${apiHost}/search?${params}`;
  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch videos");
  }
  const data = await res.json();
  return data as IVideoSearchList;
}

export default async function Search({ searchParams }: { searchParams: { query: string } }) {
  const videos = await getSearchVideos(searchParams.query);

  return (
    <>
      <Categories />
      <VideoSearch videos={videos.items} />
    </>
  );
}
