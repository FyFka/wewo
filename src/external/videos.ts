import { apiKey, apiHost, rapidApiHost, rapidApiKey } from "../shared/configuration";
import { CategoryEnum } from "../shared/interfaces/Categories";
import { IVideoSearch } from "../shared/interfaces/Search";
import { IVideoPreview, IVideoView } from "../shared/interfaces/Video";

export async function getVideosByCategory(categoryId: CategoryEnum): Promise<IVideoPreview> {
  const params = new URLSearchParams({
    part: "snippet,contentDetails,statistics",
    chart: "mostPopular",
    maxResults: "50",
    regionCode: "US",
    videoCategoryId: categoryId,
    key: apiKey,
  });

  const endpoint = `${apiHost}/videos?${params}`;
  const res = await fetch(endpoint, { next: { revalidate: 1800 } });
  if (!res.ok) throw new Error("Failed to fetch videos");
  const data = await res.json();
  return data;
}

export async function getVideosByKey(query: string, key: string = "q", type?: string): Promise<IVideoSearch> {
  const params = new URLSearchParams({
    part: "snippet",
    ...(type && { type }),
    [key]: query,
    maxResults: "50",
    regionCode: "US",
  });

  const endpoint = `${rapidApiHost}/search?${params}`;
  const res = await fetch(endpoint, {
    cache: "no-store",
    headers: { "X-RapidAPI-Key": rapidApiKey, "X-RapidAPI-Host": rapidApiHost.slice(8) },
  });
  if (!res.ok) throw new Error("Failed to fetch videos");
  const data = await res.json();
  return data;
}

export async function getVideoById(videoId: string): Promise<IVideoView> {
  const params = new URLSearchParams({
    part: "snippet,player,contentDetails,statistics",
    id: videoId,
    regionCode: "US",
    key: apiKey,
  });

  const endpoint = `${apiHost}/videos?${params}`;
  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch video");
  const data = await res.json();
  return data;
}
