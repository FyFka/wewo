import { ILocalized } from "./Localized";
import { IPageInfo } from "./Page";
import { IThumbnails } from "./Thumbnails";

export interface IVideoPreview {
  kind: string;
  etag: string;
  items: IVideoPreviewItem[];
  nextPageToken?: string;
}

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
  snippet: IVideoSnippet;
  contentDetails: IContentDetails;
  statistics: IStatistics;
  player: IPlayer;
}

export interface IPlayer {
  embedHtml: string;
}

export interface IVideoPreviewItem {
  kind: string;
  etag: string;
  id: string;
  snippet: IVideoSnippet;
  contentDetails: IContentDetails;
  statistics: IStatistics;
}

interface IVideoSnippet {
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
