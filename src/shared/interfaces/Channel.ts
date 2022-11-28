import { ILocalized } from "./Localized";
import { IPageInfo } from "./Page";
import { IThumbnails } from "./Thumbnails";

export interface IChannel {
  kind: string;
  etag: string;
  pageInfo: IPageInfo;
  items: [IChannelItem] | [];
}

interface IChannelItem {
  id: string;
  kind: string;
  etag: string;
  snippet: IChannelSnippet;
  statistics: IChannelStatistics;
  brandingSettings: IBrandingSettings;
}

interface IChannelStatistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

interface IChannelSnippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: IThumbnails;
  localized: ILocalized;
  country: string;
}

interface IBrandingSettings {
  channel: {
    title: string;
    description?: string;
    keywords?: string;
    trackingAnalyticsAccountId?: string;
    unsubscribedTrailer?: string;
    country?: string;
  };
  image?: {
    bannerExternalUrl: string;
  };
}
