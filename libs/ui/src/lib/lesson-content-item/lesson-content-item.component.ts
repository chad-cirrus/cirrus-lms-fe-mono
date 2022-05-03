import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IContent, CONTENT_TYPE, CONTENT_STATUS } from '@cirrus/models';
import { mapContentTypeToIcon } from '../helpers/ContentTypeToIconMapper';

@Component({
  selector: 'cirrus-lesson-content-item',
  templateUrl: './lesson-content-item.component.html',
  styleUrls: ['./lesson-content-item.component.scss'],
})
export class LessonContentItemComponent {
  private _content!: IContent;
  private _content_type_icon!: string;

  @Input()
  set content(value: IContent) {
    this._content = value;
    this._content_type_icon = mapContentTypeToIcon(value.content_type);
  }

  get content() {
    return this._content;
  }

  get content_type_icon() {
    return this._content_type_icon;
  }

  @Input() lastItem = false;
  @Output() fetchMediaOutput = new EventEmitter<IContent>();

  get contentType() {
    return CONTENT_TYPE;
  }

  get playButtonString() {
    return 'courses/images/svg/video_play.svg';
  }

  get openDocumentString() {
    return 'courses/images/svg/document_button.svg';
  }

  get completeCheck() {
    return 'courses/images/svg/complete_check.svg';
  }

  get inProgress() {
    return 'courses/images/svg/in_progress.svg';
  }

  get contentStatus() {
    return CONTENT_STATUS;
  }

  fetchMedia() {
    this.fetchMediaOutput.next(this.content);
  }
}
