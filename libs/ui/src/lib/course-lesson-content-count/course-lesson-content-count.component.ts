import { Component, Input } from '@angular/core';
import { ContentCounts } from '@cirrus/models';

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
  set contentCounts(value: ContentCounts) {
    this._countString = this.createString(value);
  }

  private createString(contentCounts: ContentCounts) {
    const dict: { [key: string]: string } = {
      ['videos']: 'Videos',
      ['documents']: 'Documents',
      ['quizzes']: 'Quizzes',
      ['assessments']: 'Assessments',
    };

    const countArray = Object.entries(contentCounts);
    return countArray.reduce((prev, curr, index) => {
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
  }
}
