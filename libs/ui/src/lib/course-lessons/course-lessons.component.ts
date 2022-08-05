import { Component, Input } from '@angular/core';
import { CourseOverviewLesson, ICourseOverviewLessons } from '@cirrus/models';

@Component({
  selector: 'cirrus-course-lessons',
  templateUrl: './course-lessons.component.html',
  styleUrls: ['./course-lessons.component.scss'],
})
export class CourseLessonsComponent {
  private _lessons: CourseOverviewLesson[] = [];

  @Input() courseOverviewLessons!: ICourseOverviewLessons;
}
