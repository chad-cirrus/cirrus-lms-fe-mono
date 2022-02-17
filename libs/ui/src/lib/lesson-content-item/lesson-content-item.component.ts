import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CONTENT_TYPE,
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
  @Input() instructorView!: boolean | null;
  @Output() fetchMediaOutput = new EventEmitter<IPlayListItem>();

  get playlist(): IPlayListItem[] {
    return [
      {
        id: 0,
        type: CONTENT_TYPE.vimeo,
        title: 'Review Lesson Objective',
        contentTitle: 'Primary Flight Controls',
        status: PlayListItemStatus.Completed,
        url: '377578235',
        blob_directory: '',
      },
      {
        id: 1,
        type: CONTENT_TYPE.scorm,
        title: 'Completion Standards',
        contentTitle: 'Primary Flight Controls',
        status: PlayListItemStatus.Unknown,
        url: ' ',
        blob_directory: 'aa4cce2d02ad275bb1a2IceProtectionSystemLimitations-1',
      },
      {
        id: 2,
        type: CONTENT_TYPE.vimeo,
        title: 'Preflight Planning and Preparation',
        contentTitle: 'Primary Flight Controls',
        status: PlayListItemStatus.InProgress,
        url: '377578144',
        blob_directory: '',
      },
      {
        id: 3,
        type: CONTENT_TYPE.vimeo,
        title: 'Normal Checklist Procedures',
        contentTitle: 'Primary Flight Controls',
        status: PlayListItemStatus.Unknown,
        url: '377578202',
        blob_directory: '',
      },
    ];
  }

  fetchMedia(item: IPlayListItem) {
    this.fetchMediaOutput.next(item);
  }
}
