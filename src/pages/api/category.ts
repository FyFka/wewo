import type { NextApiRequest, NextApiResponse } from "next";
import { apiHost, apiKey } from "../../shared/configuration";
import { IVideoPreview } from "../../shared/interfaces/Video";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IVideoPreview>) {
  const params = new URLSearchParams({
    part: "snippet,contentDetails,statistics",
    chart: "mostPopular",
    maxResults: "50",
    pageToken: req.query.pageToken as string,
    videoCategoryId: req.query.categoryId as string,
    regionCode: "US",
    key: apiKey,
  });
  const apiResp = await fetch(`${apiHost}/videos?${params}`);
  const categoryVideos = await apiResp.json();

  res.status(200).json(categoryVideos);
}
