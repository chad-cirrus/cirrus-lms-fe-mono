import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fetchCourseOverview } from '../store/actions/course.actions';
import { CourseState } from '../store/reducers/course.reducer';
import { selectCourseOverview } from '../store/selectors/course.selector';
import { StageLessonNavigationEvent } from '@cirrus/ui';
import { selectScreenSize } from '../store/selectors/view.selector';
import { selectCirrusUser } from '../store/selectors/cirrus-user.selector';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'cirrus-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  courseOverview$ = this.store.select(selectCourseOverview);
  screenSize$ = this.store.select(selectScreenSize);
  cirrusUser$ = this.store.select(selectCirrusUser);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<CourseState>
  ) {}

  ngOnInit(): void {
    this.courseOverview$
      .pipe(filter(overview => overview.id !== 0), take(1))
      .subscribe((overview) => {
        const defaultTab = overview?.progress?.status === 'not_started' ? 'overview' : 'lessons';
        this.router.navigate(['/', 'courses', overview.id, defaultTab]);
      });

    this.route.params.subscribe(({ courseId }) => {
      this.setCourse(courseId);
    });
  }

  setCourse(courseId: number) {
    this.store.dispatch(fetchCourseOverview({ courseId }));
  }
}
