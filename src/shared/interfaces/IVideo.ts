export interface IVideoList {
  kind: string;
  etag: string;
  items: IVideo[];
}

export interface IVideo {
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
  thumbnails: IThumbnail;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
}

interface IThumbnail {
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
  standard: {
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
