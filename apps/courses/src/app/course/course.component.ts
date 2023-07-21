import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fetchCourseOverview } from '../store/actions/course.actions';
import { CourseState } from '../store/reducers/course.reducer';
import { selectCourseOverview } from '../store/selectors/course.selector';
import { selectScreenSize } from '../store/selectors/view.selector';
import { selectCirrusUser } from '../store/selectors/cirrus-user.selector';
import { filter, map, take, tap, switchMap, first } from 'rxjs/operators';
import { selectOrder } from '../store/selectors/orders.selector';
import { Observable } from 'rxjs';
import { OrderState } from '../store/reducers/order.reducer';
import { IOrder } from '@cirrus/models';
import { mockOrder } from './testData';
import { FeatureFlagService } from '@cirrus/ui';

@Component({
  selector: 'cirrus-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  courseOverview$ = this.store.select(selectCourseOverview);
  screenSize$ = this.store.select(selectScreenSize);
  cirrusUser$ = this.store.select(selectCirrusUser);
  order$: Observable<IOrder> = this.store
    .select(selectOrder)
    .pipe(map(order => order.order));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<CourseState>,
    private featureFlagService: FeatureFlagService
  ) {}

  ngOnInit(): void {
    this.courseOverview$
      .pipe(
        filter(overview => overview.id !== 0),
        first(),
        switchMap(overview => {
          // Check if the 'course_preview' feature is enabled
          return this.featureFlagService
            .isFeatureEnabled('course_preview')
            .pipe(
              tap(isFeatureEnabled => {
                if (!isFeatureEnabled && !overview.course_attempt?.id) {
                  // Feature is not enabled and !course_attempt_id, navigate to course catalog
                  this.router.navigate(['/course-catalog']);
                } else {
                  // Feature is enabled or course_attempt_id, determine the default tab
                  const preview = !overview.course_attempt?.id;
                  const defaultTab =
                    overview?.progress?.status === 'not_started' || preview
                      ? 'overview'
                      : 'lessons';
                  this.router.navigate([
                    '/',
                    'courses',
                    overview.id,
                    defaultTab,
                  ]);
                }
              })
            );
        })
      )
      .subscribe();

    this.route.params.subscribe(({ courseId }) => {
      this.setCourse(courseId);
    });
  }

  setCourse(courseId: number) {
    this.store.dispatch(fetchCourseOverview({ courseId }));
  }
}
