import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs/operators';
import { AppService } from './app.service';
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

  constructor(private store: Store<AppState>, private appService: AppService) {}

  ngOnInit() {
    this.appService.courseId$.subscribe(id => {
      if (id) {
        const courseId = +id;
        this.store.dispatch(fetchWorkBookRoutes({ courseId }));
      }
    });
  }
}
