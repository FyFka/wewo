import { IPageInfo } from "./IPage";

export interface ICommentThreads {
  etag: string;
  items: IUserComment[];
  kind: string;
  nextPageToken: string;
  pageInfo: IPageInfo;
}

export interface IUserComment {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    canReply: boolean;
    isPublic: boolean;
    topLevelComment: IComment;
    totalReplyCount: number;
    videoId: string;
  };
  replies: { comments: IComment<IReplySnippet>[] };
}

export interface IComment<T = ICommentSnippet> {
  kind: "youtube#comment";
  etag: string;
  id: string;
  snippet: T;
}

export interface ICommentSnippet {
  authorChannelId: {
    value: string;
  };
  authorChannelUrl: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  canRate: boolean;
  likeCount: number;
  updatedAt: string;
  textDisplay: string;
  textOriginal: string;
  publishedAt: string;
  videoId: string;
  viewerRating: string;
}

export interface IReplySnippet extends ICommentSnippet {
  parentId: string;
}
