import { Component } from '@angular/core';
import { selectStages } from '../../store/selectors/course.selector';
import { Store } from '@ngrx/store';
import { StageLessonNavigationEvent } from '@cirrus/ui';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cirrus-course-lessons-route',
  templateUrl: './course-lessons-route.component.html',
  styleUrls: ['./course-lessons-route.component.scss'],
})
export class CourseLessonsRouteComponent {
  stages$ = this.store.select(selectStages);

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  navigateToLesson({ stageId, lessonId }: StageLessonNavigationEvent) {
    this.router.navigate(['stages', stageId, 'lessons', lessonId], {
      relativeTo: this.route.parent,
    });
  }
}
