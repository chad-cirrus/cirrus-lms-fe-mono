import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IContent, CONTENT_TYPE, CONTENT_STATUS } from '@cirrus/models';

@Component({
  selector: 'cirrus-lesson-content-item',
  templateUrl: './lesson-content-item.component.html',
  styleUrls: ['./lesson-content-item.component.scss'],
})
export class LessonContentItemComponent {
  @Input() content: IContent | undefined;
  @Input() lastItem = false;
  @Output() fetchMediaOutput = new EventEmitter<IContent>();

  get contentType() {
    return CONTENT_TYPE;
  }

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

  get contentStatus() {
    return CONTENT_STATUS;
  }

  fetchMedia() {
    this.fetchMediaOutput.next(this.content);
  }
}
