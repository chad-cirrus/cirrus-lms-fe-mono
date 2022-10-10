import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCourseOverview } from '../../store/selectors/course.selector';
import { filter } from 'rxjs/operators';
import { ICourseOverview } from '@cirrus/models';

@Component({
  selector: 'cirrus-course-overview-route',
  templateUrl: './course-overview-route.component.html',
  styleUrls: ['./course-overview-route.component.scss'],
})
export class CourseOverviewRouteComponent {
  courseOverview$ = this.store
    .select(selectCourseOverview)
    .pipe(filter<ICourseOverview>(Boolean));

  constructor(private store: Store) {}
}
