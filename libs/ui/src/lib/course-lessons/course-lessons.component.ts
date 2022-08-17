import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourseOverviewStage } from '@cirrus/models';

@Component({
  selector: 'cirrus-course-lessons',
  templateUrl: './course-lessons.component.html',
  styleUrls: ['./course-lessons.component.scss'],
})
export class CourseLessonsComponent {
  @Input() stages!: ICourseOverviewStage[];
  @Output() navigate = new EventEmitter<number>();

  emitNavigation(lessonId: number) {
    this.navigate.next(lessonId);
  }
}
