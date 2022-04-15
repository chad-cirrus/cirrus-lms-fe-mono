import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IContent, CONTENT_TYPE, CONTENT_STATUS } from '@cirrus/models';

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
    this._content_type_icon = this.mapContentTypeToIcon(value.content_type);
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

  private mapContentTypeToIcon(contentType: number): string {
    switch (contentType) {
      case 0:
        return 'images/svg/video_play.svg';
      case 4:
        return 'images/svg/document_button.svg';
      case 5:
        return 'images/svg/quiz_lc_icon.svg';
      case 6:
        return 'images/svg/document_button.svg';
      case 8:
        return 'images/svg/rich_text_icon.svg';
      case 9:
        return 'images/svg/assessment_lc_icon.svg';
      case 10:
        return 'images/svg/assessment_lc_icon.svg';
      case 11:
        return 'images/svg/image_lc_icon.svg';
      default:
        return 'images/svg/document_button.svg';
    }
  }
}
