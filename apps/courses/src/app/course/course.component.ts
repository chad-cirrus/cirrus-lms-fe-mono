import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from '@cirrus/models';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
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

  isCourseRootUrl = !isNaN(Number(this.router.url.split('/').pop() || ''));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<CourseState>,
  ) {}

  ngOnInit(): void {
    if (this.isCourseRootUrl) {
      this.router.navigate(['overview'], { relativeTo: this.route });
    }

    this.route.params.subscribe(({ courseId }) => {
      this.setCourse(courseId);
    });
  }

  setCourse(courseId: number) {
    this.store.dispatch(fetchCourseOverview({ courseId }));
  }
}
