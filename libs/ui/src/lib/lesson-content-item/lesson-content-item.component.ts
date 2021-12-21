import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IContent,
  IPlayListItem,
  PlayListItemStatus,
  PlayListItemType,
} from '@cirrus/models';

@Component({
  selector: 'cirrus-lesson-content-item',
  templateUrl: './lesson-content-item.component.html',
  styleUrls: ['./lesson-content-item.component.scss'],
})
export class LessonContentItemComponent {
  @Input() item: IContent | undefined;
  @Output() fetchMediaOutput = new EventEmitter<IPlayListItem>();

  get playlist(): IPlayListItem[] {
    return [
      {
        id: 0,
        type: PlayListItemType.Video,
        title: 'Review Lesson Objective',
        contentTitle: 'Primary Flight Controls',
        status: PlayListItemStatus.Completed,
        url: '377578235',
      },
      {
        id: 1,
        type: PlayListItemType.Document,
        title: 'Completion Standards',
        contentTitle: 'Primary Flight Controls',
        status: PlayListItemStatus.Unknown,
        url: ' ',
      },
      {
        id: 2,
        type: PlayListItemType.Video,
        title: 'Preflight Planning and Preparation',
        contentTitle: 'Primary Flight Controls',
        status: PlayListItemStatus.Completed,
        url: '377578144',
      },
      {
        id: 3,
        type: PlayListItemType.Video,
        title: 'Normal Checklist Procedures',
        contentTitle: 'Primary Flight Controls',
        status: PlayListItemStatus.Unknown,
        url: '377578202',
      },
    ];
  }

  fetchMedia(item: IPlayListItem) {
    this.fetchMediaOutput.next(item);
  }
}
