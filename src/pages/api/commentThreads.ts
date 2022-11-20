import type { NextApiRequest, NextApiResponse } from "next";
import { apiHost, apiKey } from "../../shared/configuration";
import { ICommentThreads } from "../../shared/interfaces/Comments";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ICommentThreads>) {
  const pageToken = req.query.pageToken as string;
  const params = new URLSearchParams({
    part: "snippet,replies",
    videoId: req.query.videoId as string,
    ...(pageToken && { pageToken }),
    regionCode: "US",
    maxResults: "50",
    order: "relevance",
    key: apiKey,
  });

  const apiResp = await fetch(`${apiHost}/commentThreads?${params}`);
  const commentThreads = await apiResp.json();

  res.status(200).json(commentThreads);
}
