export interface IPlayListItem {
  id: number;
  title: string;
  contentTitle: string;
  type: PlayListItemType;
  status: PlayListItemStatus;
  url?: string;
}

export enum PlayListItemType {
  Video,
  Document,
}

export enum PlayListItemStatus {
  Unknown,
  Completed,
}
