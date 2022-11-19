import type { NextApiRequest, NextApiResponse } from "next";
import { apiHost, apiKey } from "../../shared/configuration";
import { ICommentThreads } from "../../shared/interfaces/IComments";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ICommentThreads>) {
  const params = new URLSearchParams({
    part: "snippet,replies",
    videoId: req.query.videoId as string,
    regionCode: "US",
    order: "relevance",
    key: apiKey,
  });

  const apiResp = await fetch(`${apiHost}/commentThreads?${params}`);
  const commentThreads = await apiResp.json();

  res.status(200).json(commentThreads);
}
