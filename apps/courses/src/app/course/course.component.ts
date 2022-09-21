import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fetchCourseOverview } from '../store/actions/course.actions';
import { CourseState } from '../store/reducers/course.reducer';
import { selectCourseOverview } from '../store/selectors/course.selector';
import { StageLessonNavigationEvent } from '@cirrus/ui';
import { selectScreenSize } from '../store/selectors/view.selector';
import { selectCirrusUser } from '../store/selectors/cirrus-user.selector';

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
    this.route.params.subscribe(({ courseId }) => {
      this.setCourse(courseId);
    });
  }

  setCourse(courseId: number) {
    this.store.dispatch(fetchCourseOverview({ courseId }));
  }

  navigateToLesson({ stageId, lessonId }: StageLessonNavigationEvent) {
    this.router.navigate(['stages', stageId, 'lessons', lessonId], {
      relativeTo: this.route,
    });
  }
}
