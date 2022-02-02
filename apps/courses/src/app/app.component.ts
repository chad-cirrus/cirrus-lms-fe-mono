import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, distinctUntilChanged, share, tap } from 'rxjs/operators';
import { AppService } from './app.service';
import * as appActions from './store/actions';
import { fetchWorkBookRoutes } from './store/actions/workbook-routes.actions';
import { AppState } from './store/reducers';
import { selectLessonStateBusy } from './store/selectors/lessons.selector';
import { selectWorkBookRoutes } from './store/selectors/workbook-routes.selector';
import { setCirrusUser } from './store/actions';
import { ICirrusUser } from '@cirrus/models';
import { selectRole } from './store/selectors/cirrus-user.selector';

@Component({
  selector: 'cirrus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  lessonStateBusy$ = this.store.select(selectLessonStateBusy).pipe(delay(1));
  workbookRoutes$ = this.store.select(selectWorkBookRoutes);
  role$ = this.store.select(selectRole).pipe(tap(role => console.log(role)));
  courseId$ = this.appService.courseId$.pipe(distinctUntilChanged(), share());

  constructor(private store: Store<AppState>, private appService: AppService) {}

  ngOnInit() {
    this.courseId$.subscribe(id => {
      if (id) {
        this.store.dispatch(fetchWorkBookRoutes({ courseId: +id }));
      }
    });

    console.log(localStorage.getItem('cirrus-user'));
    const cirrusUser = JSON.parse(
      <string>localStorage.getItem('cirrus-user')
    ) as ICirrusUser;
    console.log(cirrusUser);
    this.store.dispatch(setCirrusUser({ cirrusUser }));
  }

  instructorViewMode(instructorView: boolean) {
    this.store.dispatch(appActions.setInstructorView({ instructorView }));
  }

  handleOpenChanged(sideNavOpen: boolean) {
    this.store.dispatch(appActions.setSideNavOpen({ sideNavOpen }));
  }
}
