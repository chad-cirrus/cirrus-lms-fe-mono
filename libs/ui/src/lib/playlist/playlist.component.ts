import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CONTENT_TYPE,
  IPlayListItem,
  PlayListItemStatus,
  PlayListItemType,
} from '@cirrus/models';

@Component({
  selector: 'cirrus-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent {
  @Input() playListItem: IPlayListItem[] | undefined;
  @Output() fetchMedia = new EventEmitter<IPlayListItem>();

  get playButtonString() {
    return 'images/svg/video_play.svg';
  }

  get openDocumentString() {
    return 'images/svg/document_button.svg';
  }

  get completeCheck() {
    return 'images/svg/complete_check.svg';
  }

  get inProgress() {
    return 'images/svg/in_progress.svg';
  }

  get contentType() {
    return CONTENT_TYPE;
  }

  get type() {
    return PlayListItemType;
  }

  get status() {
    return PlayListItemStatus;
  }

  getMedia(item: IPlayListItem) {
    this.fetchMedia.next(item);
  }
}
