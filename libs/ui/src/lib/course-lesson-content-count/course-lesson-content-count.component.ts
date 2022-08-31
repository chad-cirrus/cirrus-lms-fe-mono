import { Component, Input } from '@angular/core';
import { ContentCounts } from '@cirrus/models';

export interface IContentCountAndCompletionTime {
  content_counts: ContentCounts;
  completion_time?: string;
}

@Component({
  selector: 'cirrus-course-lesson-content-count',
  templateUrl: './course-lesson-content-count.component.html',
  styleUrls: ['./course-lesson-content-count.component.scss'],
})
export class CourseLessonContentCountComponent {
  private _countString = '';

  get countString() {
    return this._countString;
  }

  @Input()
  set contentCountsCompletionTime(value: IContentCountAndCompletionTime) {
    this._countString = this.createString(value);
  }

  @Input() completion_time!: string;

  private createString(
    contentCountAndCompletionTime: IContentCountAndCompletionTime
  ) {
    const dict: { [key: string]: string } = {
      ['videos']: 'Videos',
      ['documents']: 'Documents',
      ['quizzes']: 'Quizzes',
      ['assessments']: 'Assessments',
    };

    const countArray = Object.entries(
      contentCountAndCompletionTime.content_counts
    );

    const contentCountString = countArray.reduce((prev, curr, index) => {
      return (
        prev +
        dict[curr[0]] +
        ' ' +
        curr[1] +
        `${
          index < countArray.length - 1
            ? ' ' + String.fromCharCode(8226) + ' '
            : ''
        }`
      );
    }, '');

    const completionTimeString =
      contentCountAndCompletionTime.completion_time !== null
        ? ' ' +
          String.fromCharCode(8226) +
          ' Estimated Time: ' +
          contentCountAndCompletionTime.completion_time
        : '';

    return contentCountString + completionTimeString;
  }
}
