import { apiKey, apiHost } from "../shared/configuration";

export async function getChannel(channelId: string): Promise<any> {
  const params = new URLSearchParams({
    part: "snippet,contentDetails,statistics,brandingSettings",
    id: channelId,
    key: apiKey,
  });

  const endpoint = `${apiHost}/channels?${params}`;
  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch channel");
  const data = await res.json();
  return data;
}
