import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, distinctUntilChanged, share } from 'rxjs/operators';
import { AppService } from './app.service';
import { setInstructorView } from './store/actions/view.actions';
import { fetchWorkBookRoutes } from './store/actions/workbook-routes.actions';
import { AppState } from './store/reducers';
import { selectLessonStateBusy } from './store/selectors/lessons.selector';
import { selectWorkBookRoutes } from './store/selectors/workbook-routes.selector';

@Component({
  selector: 'cirrus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  lessonStateBusy$ = this.store.select(selectLessonStateBusy).pipe(delay(1));
  workbookRoutes$ = this.store.select(selectWorkBookRoutes);
  courseId$ = this.appService.courseId$.pipe(distinctUntilChanged(), share());

  constructor(private store: Store<AppState>, private appService: AppService) {}

  ngOnInit() {
    this.courseId$.subscribe(id => {
      if (id) {
        this.store.dispatch(fetchWorkBookRoutes({ courseId: +id }));
      }
    });
  }

  instructorViewMode(instructorView: boolean) {
    this.store.dispatch(setInstructorView({ instructorView }));
  }
}
