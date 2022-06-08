import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IContent } from '@cirrus/models';
import { mapContentTypeToIcon } from '../helpers/ContentTypeToIconMapper';
import { progressIconMapper } from '../helpers/ProgressIconMapper';

const progressTextMapper = (progress: string): string => {
  const dictionary: { [key: string]: string } = {
    ['not_started']: 'Not Started',
    ['in_progress']: 'In Progress',
    ['completed']: 'Completed',
    ['failed']: 'Failed',
  };

  return dictionary[progress];
};

@Component({
  selector: 'cirrus-lesson-content-item',
  templateUrl: './lesson-content-item.component.html',
  styleUrls: ['./lesson-content-item.component.scss'],
})
export class LessonContentItemComponent {
  private _content!: IContent;
  private _content_type_icon!: string;
  private _imageSrc!: string;
  private _progressText!: string;

  @Input()
  set content(value: IContent) {
    this._content = value;
    this._content_type_icon = mapContentTypeToIcon(value.content_type);
    this._imageSrc = progressIconMapper(value.progress.status);
    this._progressText = progressTextMapper(value.progress.status);
  }

  get content() {
    return this._content;
  }

  get content_type_icon() {
    return this._content_type_icon;
  }

  get imageSrc() {
    return this._imageSrc;
  }

  get progressText() {
    return this._progressText;
  }

  @Input() isSmallScreen = false;
  @Input() lastItem = false;
  @Output() fetchMediaOutput = new EventEmitter<IContent>();

  fetchMedia() {
    this.fetchMediaOutput.next(this.content);
  }
}
