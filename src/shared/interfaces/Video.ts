import { ILocalized } from "./Localized";
import { IPageInfo } from "./Page";

export interface IVideoView {
  kind: string;
  etag: string;
  items: [IVideo] | [];
  pageInfo: IPageInfo;
}

export interface IVideo {
  kind: string;
  etag: string;
  id: string;
  snippet: ISnippet;
  contentDetails: IContentDetails;
  statistics: IStatistics;
  player: IPlayer;
}

export interface IPlayer {
  embedHtml: string;
}

export interface IVideoPreviewList {
  kind: string;
  etag: string;
  items: IVideoPreview[];
  nextPageToken?: string;
}

export interface IVideoPreview {
  kind: string;
  etag: string;
  id: string;
  snippet: ISnippet;
  contentDetails: IContentDetails;
  statistics: IStatistics;
}

export interface ISnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IThumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: ILocalized;
}

export interface IThumbnails {
  default: {
    url: string;
    width: number;
    height: number;
  };
  medium: {
    url: string;
    width: number;
    height: number;
  };
  high: {
    url: string;
    width: number;
    height: number;
  };
  standard?: {
    url: string;
    width: number;
    height: number;
  };
  maxres?: {
    url: string;
    width: number;
    height: number;
  };
}

interface IContentDetails {
  duration: string;
  dimension: string;
  definition: string;
  caption: boolean;
  licensedContent: boolean;
  contentRating: {};
  projection: string;
}

interface IStatistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}
