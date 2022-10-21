import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';
import { ICirrusUser, INotification } from '@cirrus/models';
import { setCirrusUser } from './store/actions/cirrus-user.actions';
import { selectCirrusUser } from './store/selectors/cirrus-user.selector';
import { NotificationService } from './services/notification.service';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { map, takeUntil } from 'rxjs/operators';
import { setScreenSize } from './store/actions/view.actions';
import { selectIsScreenSmall } from './store/selectors/view.selector';
import { ErrorService } from '@cirrus/ui';
import { environment } from '../environments/environment';
import { RecentActivityService } from './services/recent-activity.service';
import { MatSidenav } from '@angular/material/sidenav';
import { RecentActivityFacade } from './facade.service';

@Component({
  selector: 'cirrus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  destroyed = new Subject<void>();
  cirrusUser$ = this.store.select(selectCirrusUser);
  cirrusImpersonateReturnUser$!: Observable<ICirrusUser>;
  notificationCount$ = this.notificationService.notificationsCount$;
  isScreenSmall$: Observable<boolean> = this.store.select(selectIsScreenSmall);
  breakPoint$ = this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ]);

  error$ = this.errorService.error$;
  project = environment.project;

  private _isNotificationsMenuOpenSubject = new BehaviorSubject(false);
  isNotificationMenuOpen$ = this._isNotificationsMenuOpenSubject.asObservable();

  recentActivityNotifications$ =
    this.recentActivityService.recentActivityNotifications$;

  collapse = false;
  showHamburgerMenu = false;
  isNotificationsMenuOpen = false;
  @ViewChild('drawer') drawer!: MatSidenav;

  @ViewChild('outletContainer') outletContainer!: ElementRef;
  constructor(
    private notificationService: NotificationService,
    private store: Store<AppState>,
    private breakpointObserver: BreakpointObserver,
    private errorService: ErrorService,
    private recentActivityService: RecentActivityService,
    private facade: RecentActivityFacade
  ) {}

  ngOnInit() {
    const cirrusUser = JSON.parse(
      <string>localStorage.getItem('cirrus-user')
    ) as ICirrusUser;
    this.store.dispatch(setCirrusUser({ cirrusUser }));
    this.cirrusImpersonateReturnUser$ = of(
      JSON.parse(
        <string>localStorage.getItem('cirrus-impersonation-return-user')
      ) as ICirrusUser
    );
    this.breakPoint$
      .pipe(takeUntil(this.destroyed), map(this.getBreakpoint))
      .subscribe(screenSize =>
        this.store.dispatch(setScreenSize({ screenSize }))
      );

    this.recentActivityService.notificationMenuStateToggle$.subscribe(bool => {
      if (this.drawer) {
        bool ? this.drawer.open() : this.drawer.close();
      }
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  openHamburgerMenu() {
    console.log('open hamburger');
  }

  dismissErrorMessage() {
    this.errorService.errorSubject.next('');
  }

  toggleCollapse(collapse: boolean) {
    this.collapse = collapse;
  }

  dismissNotificationsMenu() {
    this.recentActivityService.notificationMenuStateToggleSubject.next(false);
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
