import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
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
