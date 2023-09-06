import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isCourseFree } from '@cirrus/models';
import { UiCourseService } from '@cirrus/ui';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { fetchCourseOverview } from '../store/actions/course.actions';
import { fetchOrders } from '../store/actions/orders.actions';
import { CourseState } from '../store/reducers/course.reducer';
import { OrderState } from '../store/reducers/order.reducer';
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

  private loadingRemoteData$ = this.store.pipe(
    map(state => {
      const storeState = state as { course: CourseState; order: OrderState };
      return storeState.course.busy || storeState.order.busy;
    }),
  );

  constructor(
    private store: Store,
    private uiCourseService: UiCourseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  /**
   * Ensures that the course and active order are loaded before attempting to enroll the user. Watches the busy
   * indicator on the course and order features in the store to determine when the data is loaded.
   */
  ngOnInit(): void {
    this.store.dispatch(
      fetchCourseOverview({
        courseId: this.route.parent?.snapshot.params['courseId'],
      }),
    );
    this.store.dispatch(fetchOrders());
    combineLatest([this.course$, this.order$, this.loadingRemoteData$])
      .pipe(
        filter(([course, , loading]) => !isNullObject(course) && !loading),
        first(),
      )
      .subscribe(([course, order]) => {
        if (isCourseFree(course)) {
          this.uiCourseService.freeCourseEnroll(course).subscribe(() => {
            this.store.dispatch(fetchCourseOverview({ courseId: course.id }));
            this.router.navigate(['/courses', course.id, 'overview']);
          });
        } else {
          this.uiCourseService.courseEnroll(course, order).subscribe(() => {
            this.router.navigate(['/shopping-cart']);
          });
        }
      });
  }
}
