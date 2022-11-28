import { IPageInfo } from "./Page";
import { IThumbnails } from "./Thumbnails";

export interface IVideoSearch {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: IPageInfo;
  items: IVideoSearchItem[];
}

interface IVideoSearchId {
  kind: string;
  videoId?: string;
  channelId?: string;
  playlistId?: string;
}

export interface IVideoSearchItem {
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
