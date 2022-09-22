import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCourseOverview } from '../../store/selectors/course.selector';

@Component({
  selector: 'cirrus-course-enrollments-route',
  templateUrl: './course-enrollments-route.component.html',
  styleUrls: ['./course-enrollments-route.component.scss']
})
export class CourseEnrollmentsRouteComponent {
  courseOverview$ = this.store.select(selectCourseOverview);

  constructor(private store: Store) {}
}
