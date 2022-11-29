import type { NextApiRequest, NextApiResponse } from "next";
import { rapidApiHost, rapidApiKey } from "../../shared/configuration";
import { IVideoPreviewList } from "../../shared/interfaces/Video";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IVideoPreviewList>) {
  const params = new URLSearchParams({
    part: "snippet",
    pageToken: req.query.pageToken as string,
    maxResults: "50",
    regionCode: "US",
  });
  const apiResp = await fetch(`${rapidApiHost}/search?${params}`, {
    headers: { "X-RapidAPI-Key": rapidApiKey, "X-RapidAPI-Host": rapidApiHost.slice(8) },
  });
  const categoryVideos = await apiResp.json();

  res.status(200).json(categoryVideos);
}
