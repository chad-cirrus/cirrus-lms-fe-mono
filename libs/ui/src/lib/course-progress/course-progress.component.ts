import { Component } from '@angular/core';

@Component({
  selector: 'cirrus-course-progress',
  templateUrl: './course-progress.component.html',
  styleUrls: ['./course-progress.component.scss'],
})
export class CourseProgressComponent {
  lastCompletedDate = '';
  lessonsCompleted = 0;
  lessonsTotal = 0;
  milestonesReached = 0;
  milestonesTotal = 0;

  lessonsCompletedIcon =
    'courses/images/svg/course-progress-lessons-completed.svg';
  milestonesReachedIcon =
    'courses/images/svg/course-progress-milestones-reached.svg';

  get progressValue() {
    return this.lessonsTotal > 0
      ? (this.lessonsCompleted / this.lessonsTotal) * 100
      : 0;
  }

  get lastCompleted() {
    return this.lastCompletedDate.length > 0
      ? `Last Completed: ${this.lastCompletedDate}`
      : '';
  }
}
