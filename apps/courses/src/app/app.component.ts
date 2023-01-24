import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, map, takeUntil } from 'rxjs/operators';
import { AppService } from './app.service';
import * as appActions from './store/actions';
import { setCirrusUser, setScreenSize } from './store/actions';
import { AppState } from './store/reducers';
import { selectLessonStateBusy } from './store/selectors/lessons.selector';
import { ICirrusUser, INotification } from '@cirrus/models';
import { selectCirrusUser } from './store/selectors/cirrus-user.selector';
import { merge, Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  selectIsScreenSmall,
  selectSideNavOpen,
} from './store/selectors/view.selector';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CoursesService } from './course/course.service';
import {
  CirrusBaseComponent,
  ErrorService,
  NotificationService,
  UserService,
} from '@cirrus/ui';
import { environment } from '../environments/environment';
import { CoursesFacadeService } from './courses-facade.service';
import { SidenavHeaderService } from '@cirrus/sidenav-header';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'cirrus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent
  extends CirrusBaseComponent
  implements OnInit, OnDestroy
{
  student = 'John Doe';
  viewToggle = new FormControl(false);
  lessonStateBusy$ = this.store.select(selectLessonStateBusy).pipe(delay(1));

  cirrusUser$ = this.store.select(selectCirrusUser);

  project = environment.project;

  notifications$: Observable<INotification[]> =
    this.courseService.notifications$;

  sideNavOpen$: Observable<boolean> = this.store.select(selectSideNavOpen);
  ftgNotPilot = 160;
  ftgPilot = 112;
  isScreenSmall$: Observable<boolean> = this.store.select(selectIsScreenSmall);

  loadingIndicator$ = merge(this.lessonStateBusy$);

  triggerSubscription!: Subscription;
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  constructor(
    private store: Store<AppState>,
    private appService: AppService,
    private courseService: CoursesService,
    private facade: CoursesFacadeService,
    router: Router,
    scroller: ViewportScroller,
    userService: UserService,
    breakpointObserver: BreakpointObserver,
    sidenavHeaderService: SidenavHeaderService,
    notificationService: NotificationService,
    errorService: ErrorService,
    route: ActivatedRoute
  ) {
    super(
      userService,
      breakpointObserver,
      sidenavHeaderService,
      notificationService,
      errorService,
      router,
      scroller,
      route
    );
  }

  ngOnInit() {
    super.ngOnInit();

    console.log('Environment variable test', process.env['NX_TEST_VARIABLE']);

    this.courseService.getNotifications();

    this.triggerSubscription = this.appService.getTrigger().subscribe(() => {
      this.outletContainer.nativeElement.scrollTop = 0;
    });

    this.breakPoint$
      .pipe(takeUntil(this.destroyed), map(this.getBreakpoint))
      .subscribe(screenSize =>
        this.store.dispatch(setScreenSize({ screenSize }))
      );

    const cirrusUser = JSON.parse(
      <string>localStorage.getItem('cirrus-user')
    ) as ICirrusUser;
    this.store.dispatch(setCirrusUser({ cirrusUser }));

    this.viewToggle.valueChanges.subscribe(instructorView =>
      this.store.dispatch(appActions.setInstructorView({ instructorView }))
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.triggerSubscription.unsubscribe();
  }

  openHamburgerMenu() {
    this.showHamburgerMenu = !this.showHamburgerMenu;
  }

  handleOpenChanged(sideNavOpen: boolean) {
    this.store.dispatch(appActions.setSideNavOpen({ sideNavOpen }));
  }

  clearNotifications(notifications: INotification[]) {
    this.facade.clearNotifications(notifications).subscribe();
  }

  deleteNotification(id: number) {
    this.facade.deleteNotification(id).subscribe();
  }

  acceptInvite(notification: INotification) {
    this.facade.acceptInvite(notification).subscribe();
  }

  declineInvite(notification: INotification) {
    this.facade.declineInvite(notification).subscribe();
  }
}
