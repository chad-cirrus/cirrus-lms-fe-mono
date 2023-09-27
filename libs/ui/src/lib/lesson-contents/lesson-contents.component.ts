import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CONTENT_STATUS,
  CONTENT_TYPE,
  IContent,
  ILesson,
} from '@cirrus/models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cirrus-lesson-contents',
  templateUrl: './lesson-contents.component.html',
  styleUrls: ['./lesson-contents.component.scss'],
})
export class LessonContentsComponent {
  private _lesson!: ILesson;

  @Input()
  set lesson(val: ILesson) {
    this._lesson = val;
    
    if (!this.instructorView) {
      this._contents.next(val.contents);
    } else {
      this._contents.next(val.instructor_contents);
    }
  }

  get lesson() {
    return this._lesson;
  }

  private _contents = new BehaviorSubject<IContent[]>([]);
  contents$ = this._contents.asObservable();

  get contents() {
    return this._contents;
  }

  private _instructorView = false;

  @Input()
  set instructorView(val: boolean) {
    this._instructorView = val;
    this._contents.next(
      val ? this.lesson?.instructor_contents : this.lesson?.contents
    );
  }

  get instructorView() {
    return this._instructorView;
  }

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
