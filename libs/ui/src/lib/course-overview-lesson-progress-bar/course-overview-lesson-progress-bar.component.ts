import { Component, Input } from '@angular/core';

@Component({
  selector: 'cirrus-course-overview-lesson-progress-bar',
  templateUrl: './course-overview-lesson-progress-bar.component.html',
  styleUrls: ['./course-overview-lesson-progress-bar.component.scss'],
})
export class CourseOverviewLessonProgressBarComponent {
  private _value = 0;

  get value() {
    return this._value;
  }

  private _lessonProgress = {
    total: 0,
    completed: 0,
  };

  @Input()
  set lessonProgress(value: { total: number; completed: number }) {
    this._lessonProgress = value;
    this._value = ((value.total / value.completed) * 100) | 0;
  }

  get lessonProgress() {
    return this._lessonProgress;
  }
}
