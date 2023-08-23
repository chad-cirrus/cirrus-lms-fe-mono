import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isCourseFree } from '@cirrus/models';
import { UiCourseService } from '@cirrus/ui';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { fetchCourseOverview } from '../store/actions/course.actions';
import { selectCourseOverview } from '../store/selectors/course.selector';
import { selectOrder } from '../store/selectors/orders.selector';

const isNullObject = (obj: { id: number }): boolean => {
  return obj === undefined || obj === null || obj.id === undefined || obj.id === null || obj.id === 0;
};

@Component({
  selector: 'cirrus-course-enrollment',
  template: '<mat-spinner color="accent"></mat-spinner>',
})
export class CourseEnrollmentComponent implements OnInit {
  private course$ = this.store.select(selectCourseOverview);
  private order$ = this.store.select(selectOrder).pipe(map(order => order.order));

  constructor(
    private store: Store,
    private uiCourseService: UiCourseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.course$.subscribe(course => {
      if (course.id === 0) {
        this.store.dispatch(
          fetchCourseOverview({
            courseId: this.route.parent?.snapshot.params['courseId'],
          }),
        );
      }
    });
    combineLatest([this.course$, this.order$])
      .pipe(
        filter(([course, order]) => !isNullObject(course) && !isNullObject(order)),
        first(),
      )
      .subscribe(([course, order]) => {
        if (isCourseFree(course)) {
          this.uiCourseService.freeCourseEnroll(course).subscribe(() => {
            this.store.dispatch(fetchCourseOverview({ courseId: course.id }));
            this.router.navigate(['/courses', course.id]);
          });
        } else {
          this.uiCourseService.courseEnroll(course, order).subscribe(() => {
            this.router.navigate(['/shopping-cart']);
          });
        }
      });
  }
}
