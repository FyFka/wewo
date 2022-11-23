import type { NextApiRequest, NextApiResponse } from "next";
import { apiHost, apiKey } from "../../shared/configuration";
import { IReplies } from "../../shared/interfaces/Comments";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IReplies>) {
  const pageToken = req.query.pageToken as string;
  const skip = req.query.skip as string;
  const params = new URLSearchParams({
    part: "snippet",
    parentId: req.query.parentId as string,
    ...(pageToken && { pageToken }),
    maxResults: "15",
    key: apiKey,
  });

  const apiResp = await fetch(`${apiHost}/comments?${params}`);
  const replies = await apiResp.json();

  res.status(200).json({ replies: replies.items.slice(parseInt(skip)), nextPageToken: replies.nextPageToken });
}
