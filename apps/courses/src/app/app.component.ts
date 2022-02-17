import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, distinctUntilChanged, map, share, tap } from 'rxjs/operators';
import { AppService } from './app.service';
import * as appActions from './store/actions';
import { fetchWorkBookRoutes } from './store/actions/workbook-routes.actions';
import { AppState } from './store/reducers';
import { selectLessonStateBusy } from './store/selectors/lessons.selector';
import { selectWorkBookRoutes } from './store/selectors/workbook-routes.selector';
import { setCirrusUser } from './store/actions';
import { ICirrusUser } from '@cirrus/models';
import { selectRole } from './store/selectors/cirrus-user.selector';
import { fromEvent, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { selectSideNavOpen } from './store/selectors/view.selector';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'cirrus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  student = 'John Doe';
  viewToggle = new FormControl(false);
  toggle$ = this.viewToggle.valueChanges;
  lessonStateBusy$ = this.store.select(selectLessonStateBusy).pipe(delay(1));
  workbookRoutes$ = this.store.select(selectWorkBookRoutes);
  role$ = this.store.select(selectRole).pipe(tap(role => console.log(role)));
  courseId$ = this.appService.courseId$.pipe(distinctUntilChanged(), share());
  scrollTop$ = fromEvent(window, 'scroll').pipe(
    map(event => event.target && event.target['documentElement'].scrollTop),
    map(top => top > 160),
    distinctUntilChanged()
  );
  sideNavOpen$: Observable<boolean> = this.store.select(selectSideNavOpen);
  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  highPostion$ = this.role$.pipe(
    map(role => (role === 'pilot' ? '2rem' : '5rem'))
  );
  lowPostion$ = this.role$.pipe(
    map(role => (role === 'pilot' ? '9rem' : '12rem'))
  );

  constructor(private store: Store<AppState>, private appService: AppService) {}

  ngOnInit() {
    this.courseId$.subscribe(id => {
      if (id) {
        this.store.dispatch(fetchWorkBookRoutes({ courseId: +id }));
      }
    });

    const cirrusUser = JSON.parse(
      <string>localStorage.getItem('cirrus-user')
    ) as ICirrusUser;
    this.store.dispatch(setCirrusUser({ cirrusUser }));

    this.viewToggle.valueChanges.subscribe(instructorView =>
      this.store.dispatch(appActions.setInstructorView({ instructorView }))
    );

    this.sideNavOpen$.subscribe(open => {
      if (open) {
        this.sideNav.toggle();
      }
    });
  }

  handleOpenChanged(sideNavOpen: boolean) {
    this.store.dispatch(appActions.setSideNavOpen({ sideNavOpen }));
  }
}
