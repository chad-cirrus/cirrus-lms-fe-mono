import { CONTENT_TYPE } from './ContentType';

export interface IPlayListItem {
  id: number;
  title: string;
  contentTitle: string;
  type: CONTENT_TYPE;
  status: PlayListItemStatus;
  url?: string;
  blob_directory: string;
}

export enum PlayListItemType {
  Video,
  Document,
}

export enum PlayListItemStatus {
  Unknown,
  Completed,
  InProgress,
}
