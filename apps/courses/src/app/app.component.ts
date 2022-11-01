import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, map, takeUntil } from 'rxjs/operators';
import { AppService } from './app.service';
import * as appActions from './store/actions';
import { setCirrusUser, setScreenSize } from './store/actions';
import { AppState } from './store/reducers';
import { selectLessonStateBusy } from './store/selectors/lessons.selector';
import { ICirrusUser, INotification } from '@cirrus/models';
import { selectCirrusUser } from './store/selectors/cirrus-user.selector';
import {
  BehaviorSubject,
  merge,
  Observable,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  selectIsScreenSmall,
  selectSideNavOpen,
} from './store/selectors/view.selector';
import { MatSidenav } from '@angular/material/sidenav';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { CoursesService } from './course/course.service';
import { ErrorService } from '@cirrus/ui';
import { environment } from '../environments/environment';
import { CoursesFacadeService } from './courses-facade.service';
import { SidenavHeaderService } from './services/sidenav-header.service';
import { UserService } from './user/user.service';

@Component({
  selector: 'cirrus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  destroyed = new Subject<void>();
  student = 'John Doe';
  viewToggle = new FormControl(false);
  lessonStateBusy$ = this.store.select(selectLessonStateBusy).pipe(delay(1));

  breakPoint$ = this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ]);
  cirrusUser$ = this.store.select(selectCirrusUser);
  cirrusImpersonateReturnUser$!: Observable<ICirrusUser>;

  project = environment.project;

  error$ = this.errorService.error$;

  notifications$: Observable<any> = this.courseService.notifications$;
  sideNavOpen$: Observable<boolean> = this.store.select(selectSideNavOpen);
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  ftgNotPilot = 160;
  ftgPilot = 112;
  isScreenSmall$: Observable<boolean> = this.store.select(selectIsScreenSmall);

  private _isNotificationsMenuOpenSubject = new BehaviorSubject(false);
  isNotificationMenuOpen$ = this._isNotificationsMenuOpenSubject.asObservable();

  loadingIndicator$ = merge(this.lessonStateBusy$);

  collapse = false;
  showHamburgerMenu = false;
  @ViewChild('outletContainer') outletContainer!: ElementRef;
  @ViewChild('drawer') drawer!: MatSidenav;

  triggerSubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private appService: AppService,
    private breakpointObserver: BreakpointObserver,
    private courseService: CoursesService,
    private errorService: ErrorService,
    private facade: CoursesFacadeService,
    private sidenavHeaderService: SidenavHeaderService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.triggerSubscription = this.appService.getTrigger().subscribe(() => {
      this.outletContainer.nativeElement.scrollTop = 0;
    });

    this.breakPoint$
      .pipe(takeUntil(this.destroyed), map(this.getBreakpoint))
      .subscribe(screenSize =>
        this.store.dispatch(setScreenSize({ screenSize }))
      );

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

    this.sidenavHeaderService.showNotifications$.subscribe(bool => {
      if (this.drawer) {
        bool ? this.drawer.open() : this.drawer.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.triggerSubscription.unsubscribe();
    this.destroyed.next();
    this.destroyed.complete();
  }

  openHamburgerMenu() {
    this.showHamburgerMenu = !this.showHamburgerMenu;
  }

  toggleCollapse(collapse: boolean) {
    this.collapse = collapse;
  }

  dismissErrorMessage() {
    this.errorService.errorSubject.next('');
  }

  handleOpenChanged(sideNavOpen: boolean) {
    this.store.dispatch(appActions.setSideNavOpen({ sideNavOpen }));
  }

  dismissNotificationsMenu() {
    this.sidenavHeaderService.setShowNotifications(false);
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

  toggleNotificationsMenu() {
    this.sidenavHeaderService.toggleShowNotifications();
  }

  logout() {
    this.userService.logout().subscribe(() => {
      window.location.href = 'https://cirrusapproach.com';
    });
  }

  impersonationLogout() {
    this.userService.impersonationLogout();
  }

  drawerOpened() {
    this._isNotificationsMenuOpenSubject.next(true);
  }

  drawerClosed() {
    this._isNotificationsMenuOpenSubject.next(false);
  }

  private getBreakpoint({ breakpoints }: BreakpointState) {
    const [breakpoint] = Object.entries(breakpoints).find(
      ([_breakpoint, match]) => match === true
    ) as [breakpoint: string, matches: boolean];
    return breakpoint;
  }
}
