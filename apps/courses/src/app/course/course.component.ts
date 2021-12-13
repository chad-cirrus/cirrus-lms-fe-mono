import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { fetchLessons } from '../store/actions';
import { LessonState } from '../store/reducers/lesson.reducer';
import { selectLesson } from '../store/selectors/lessons.selector';

@Component({
  selector: 'cirrus-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  courseId$ = this.route.params.pipe(map(params => params['courseId']));

  lesson$: Observable<any> = this.store.select(selectLesson);
  constructor(
    private route: ActivatedRoute,
    private store: Store<LessonState>
  ) {}

  ngOnInit() {
    this.store.dispatch(fetchLessons({ courseId: 12 }));
  }
}
