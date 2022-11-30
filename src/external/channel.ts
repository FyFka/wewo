import { apiKey, apiHost } from "../shared/configuration";
import { IChannel } from "../shared/interfaces/Channel";

export async function getChannelById(channelId: string): Promise<IChannel> {
  const params = new URLSearchParams({
    part: "snippet, statistics, brandingSettings",
    id: channelId,
    key: apiKey,
  });

  const endpoint = `${apiHost}/channels?${params}`;
  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch channel");
  const data = await res.json();
  return data;
}
