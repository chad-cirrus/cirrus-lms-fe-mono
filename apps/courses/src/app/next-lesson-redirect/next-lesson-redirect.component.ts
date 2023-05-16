import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { fetchCourseOverview } from '../store/actions/course.actions';
import { selectCourseOverview } from '../store/selectors/course.selector';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'cirrus-next-lesson-redirect',
  template: ``,
  styles: [],
})
export class NextLessonRedirectComponent implements OnInit {
  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(fetchCourseOverview({ courseId: params.courseId }));
    });

    this.store
      .select(selectCourseOverview)
      .pipe(
        filter(({ id: courseId }) => courseId !== 0),
        take(1)
      )
      .subscribe(overview => {
        const {
          id: courseId,
          next_lesson: { id: lessonId, stage_id: stageId },
        } = overview;
        if (lessonId === undefined) {
          this.router.navigate(['courses', courseId, 'overview']);
        } else {
          this.router.navigate([
            'courses',
            courseId,
            'stages',
            stageId,
            'lessons',
            lessonId,
          ]);
        }
      });
  }
}
