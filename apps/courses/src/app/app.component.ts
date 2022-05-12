import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, distinctUntilChanged, map, share } from 'rxjs/operators';
import { AppService } from './app.service';
import * as appActions from './store/actions';
import { fetchWorkbook } from './store/actions/workbook-routes.actions';
import { AppState } from './store/reducers';
import { selectLessonStateBusy } from './store/selectors/lessons.selector';
import { setCirrusUser } from './store/actions';
import { ICirrusUser } from '@cirrus/models';
import {
  selectCirrusUser,
  selectRole,
} from './store/selectors/cirrus-user.selector';
import { fromEvent, Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  selectSideNavOpen,
  selectIsScreenSmall,
} from './store/selectors/view.selector';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CoursesService } from './course/course.service';

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
  role$ = this.store.select(selectRole);
  cirrusUser$ = this.store.select(selectCirrusUser);
  cirrusImpersonateReturnUser$!: Observable<ICirrusUser>;
  courseId$ = this.appService.courseId$.pipe(distinctUntilChanged(), share());
  scrolledPast$ = fromEvent(window, 'scroll').pipe(
    map(event => event.target && event.target['documentElement'].scrollTop),
    map(top => top > 160),
    distinctUntilChanged()
  );
  notificationCount$: Observable<any> = this.courseService.notificationsCount$;
  sideNavOpen$: Observable<boolean> = this.store.select(selectSideNavOpen);
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  ftgNotPilot = 160;
  ftgPilot = 112;
  isScreenSmall$: Observable<boolean> = this.store.select(selectIsScreenSmall);
  collapse!: boolean;
  showHamburgerMenu = false;

  constructor(
    private store: Store<AppState>,
    private appService: AppService,
    private breakpointObserver: BreakpointObserver,
    private courseService: CoursesService
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe('(max-width: 600px)')
      .pipe(
        map(({ matches }) => {
          return matches;
        })
      )
      .subscribe(isScreenSmall => {
        this.store.dispatch(appActions.setIsScreenSmall({ isScreenSmall }));
      });


    this.courseId$.subscribe(id => {
      if (id) {
        this.store.dispatch(fetchWorkbook({ courseId: +id }));
      }
    });

    this.cirrusImpersonateReturnUser$ = of(
      JSON.parse(
        <string>localStorage.getItem('cirrus-impersonation-return-user')
      ) as ICirrusUser
    );

    const cirrusUser = JSON.parse(
      <string>localStorage.getItem('cirrus-user')
    ) as ICirrusUser;
    this.store.dispatch(setCirrusUser({ cirrusUser }));

    this.viewToggle.valueChanges.subscribe(instructorView =>
      this.store.dispatch(appActions.setInstructorView({ instructorView }))
    );
  }

  openHamburgerMenu() {
    this.showHamburgerMenu = !this.showHamburgerMenu;
  }

  toggleCollapse(collapse: boolean) {
    this.collapse = collapse;
  }

  handleOpenChanged(sideNavOpen: boolean) {
    this.store.dispatch(appActions.setSideNavOpen({ sideNavOpen }));
  }
}
