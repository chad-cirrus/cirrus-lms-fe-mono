import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ICirrusUser, INotification } from '@cirrus/models';
import { SidenavHeaderService } from '@cirrus/sidenav-header';
import { CirrusBaseComponent, ErrorService, NotificationService, UserService } from '@cirrus/ui';
import { Store } from '@ngrx/store';
import { Observable, Subscription, merge } from 'rxjs';
import { delay, filter, map, takeUntil } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { AppService } from './app.service';
import { CoursesService } from './course/course.service';
import { CoursesFacadeService } from './courses-facade.service';
import * as appActions from './store/actions';
import { setCirrusUser, setScreenSize } from './store/actions';
import { fetchOrders } from './store/actions/orders.actions';
import { AppState } from './store/reducers';
import { selectCirrusUser, selectIsLoggedIn } from './store/selectors/cirrus-user.selector';
import { selectLessonStateBusy } from './store/selectors/lessons.selector';
import { selectIsScreenSmall, selectSideNavOpen } from './store/selectors/view.selector';

@Component({
  selector: 'cirrus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends CirrusBaseComponent implements OnInit, OnDestroy {
  student = 'John Doe';
  viewToggle = new UntypedFormControl(false);
  lessonStateBusy$ = this.store.select(selectLessonStateBusy).pipe(delay(1));

  cirrusUser$ = this.store.select(selectCirrusUser);
  isLoggedIn$: Observable<boolean> = this.store.select(selectIsLoggedIn);

  project = environment.project;

  notifications$: Observable<INotification[]> = this.courseService.notifications$;

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
    route: ActivatedRoute,
  ) {
    super(
      userService,
      breakpointObserver,
      sidenavHeaderService,
      notificationService,
      errorService,
      router,
      scroller,
      route,
    );

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe((event) => {
        (window as { [key: string]: any })['dataLayer'] = (window as { [key: string]: any })['dataLayer'] || [];
        (window as { [key: string]: any })['dataLayer'].push({
          'event': 'pageView',
          'pagePath': event.urlAfterRedirects
        });
      })
  }

  ngOnInit() {
    super.ngOnInit();

    this.facade.fullstoryInit();

    const cirrusUser = JSON.parse(<string>localStorage.getItem('cirrus-user')) as ICirrusUser;

    this.myOrders$.subscribe(() => {
      if (cirrusUser) {
        this.facade.fullStoryIdentify(cirrusUser);
        this.store.dispatch(fetchOrders());
      }
    });

    this.triggerSubscription = this.appService.getTrigger().subscribe(() => {
      this.outletContainer.nativeElement.scrollTop = 0;
    });

    this.breakPoint$
      .pipe(takeUntil(this.destroyed), map(this.getBreakpoint))
      .subscribe(screenSize => this.store.dispatch(setScreenSize({ screenSize })));

    if (cirrusUser) {
      this.courseService.getNotifications();
    }

    this.store.dispatch(setCirrusUser({ cirrusUser }));

    this.viewToggle.valueChanges.subscribe(instructorView =>
      this.store.dispatch(appActions.setInstructorView({ instructorView })),
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
