import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CONTENT_STATUS,
  CONTENT_TYPE,
  IContent,
  ILesson,
} from '@cirrus/models';

@Component({
  selector: 'cirrus-lesson-contents',
  templateUrl: './lesson-contents.component.html',
  styleUrls: ['./lesson-contents.component.scss'],
})
export class LessonContentsComponent {
  @Input() instructorView!: boolean;
  @Input() lesson!: ILesson;

  @Output() fetchMedia = new EventEmitter<IContent>();

  get contentType() {
    return CONTENT_TYPE;
  }

  get playButtonString() {
    return 'images/svg/video_play.svg';
  }

  get openDocumentString() {
    return 'images/svg/document_button.svg';
  }

  get contentStatus() {
    return CONTENT_STATUS;
  }

  get completeCheck() {
    return 'images/svg/complete_check.svg';
  }

  get inProgress() {
    return 'images/svg/in_progress.svg';
  }

  handleFetchMedia(content: IContent) {
    this.fetchMedia.next(content);
  }
}
