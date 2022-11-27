import { IPageInfo } from "./Page";
import { IThumbnails } from "./Video";

export interface IVideoSearchList {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: IPageInfo;
  items: IVideoSearch[];
}

export interface IVideoSearch {
  kind: string;
  etag: string;
  id: IVideoSearchId;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: IThumbnails;
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

interface IVideoSearchId {
  kind: string;
  videoId?: string;
  channelId?: string;
}
