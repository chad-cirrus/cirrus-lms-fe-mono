import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fetchCourseOverview } from '../store/actions/course.actions';
import { CourseState } from '../store/reducers/course.reducer';
import { selectCourseOverview } from '../store/selectors/course.selector';
import { tap } from 'rxjs/operators';
import { StageLessonNavigationEvent } from '../../../../../libs/ui/src/lib/StageLessonNavigationEvent';

@Component({
  selector: 'cirrus-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  courseOverview$ = this.store.select(selectCourseOverview).pipe(
    tap(course => {
      if (course && course.progress.id > 0) {
        console.log(course.progress.status);
      }
    })
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<CourseState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ courseId }) => {
      console.log(courseId);
      this.store.dispatch(fetchCourseOverview({ courseId }));
    });
  }

  navigateToLesson({ stageId, lessonId }: StageLessonNavigationEvent) {
    this.router.navigate(['stages', stageId, 'lessons', lessonId], { relativeTo: this.route });
  }
}
