import { Component, Input } from '@angular/core';
import { ILessonsstats } from '@cirrus/models';

@Component({
  selector: 'cirrus-course-progress',
  templateUrl: './course-progress.component.html',
  styleUrls: ['./course-progress.component.scss'],
})
export class CourseProgressComponent {
  lessonsCompletedIcon =
    'courses/images/svg/course-progress-lessons-completed.svg';

  get progressValue() {
    return this.lessonStats.total > 0
      ? (this.lessonStats.completed / this.lessonStats.total) * 100
      : 0;
  }

  @Input() lastCompleted = '';
  @Input() lessonStats: ILessonsstats = { total: 0, completed: 0 };
}
