import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from '@cirrus/models';
import { FeatureFlagService } from '@cirrus/ui';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { fetchCourseOverview } from '../store/actions/course.actions';
import { CourseState } from '../store/reducers/course.reducer';
import { selectCirrusUser } from '../store/selectors/cirrus-user.selector';
import { selectCourseOverview } from '../store/selectors/course.selector';
import { selectOrder } from '../store/selectors/orders.selector';
import { selectScreenSize } from '../store/selectors/view.selector';

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

  lastPathSegment = this.router.url.split('/').pop() || '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<CourseState>,
    private featureFlagService: FeatureFlagService,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.courseOverview$,
      this.featureFlagService.isFeatureEnabled('course_preview'),
    ])
      .pipe(filter(([overview]) => overview.id !== 0))
      .subscribe(([overview, isCoursePreviewEnabled]) => {
        const isEnrolled = !!overview.course_attempt?.id;
        const isCourseRootUrl = !isNaN(Number(this.lastPathSegment));
        const isCourseStarted = overview.progress?.status !== 'not_started';

        const redirectToOverview =
          (isCourseRootUrl && !isCourseStarted) ||
          (!isEnrolled && isCoursePreviewEnabled);
        const redirectToLessons = isCourseRootUrl && isCourseStarted;
        const redirectToCatalog = !isEnrolled && !isCoursePreviewEnabled;

        if (redirectToOverview)
          this.router.navigate(['/courses', overview.id, 'overview']);
        if (redirectToLessons)
          this.router.navigate(['/courses', overview.id, 'lessons']);
        if (redirectToCatalog) this.router.navigate(['/course-catalog']);
      });

    this.route.params.subscribe(({ courseId }) => {
      this.setCourse(courseId);
    });
  }

  setCourse(courseId: number) {
    this.store.dispatch(fetchCourseOverview({ courseId }));
  }
}
