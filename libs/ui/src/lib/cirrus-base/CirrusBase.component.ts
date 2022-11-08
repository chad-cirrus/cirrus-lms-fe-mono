import { map } from 'rxjs/operators';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, of, Subject } from 'rxjs';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { SidenavHeaderService } from '@cirrus/sidenav-header';
import { ICirrusUser } from '@cirrus/models';
import { UserService } from '../shared/user.service';
import { NotificationService } from '../lib-services/notifications/notification.service';
import { ErrorService } from '../lib-services/error/error.service';

@Component({
  template: `<p>works</p>`,
})
export abstract class CirrusBaseComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatSidenav;
  @ViewChild('outletContainer') outletContainer!: ElementRef;

  destroyed = new Subject<void>();
  breakPoint$ = this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ]);
  cirrusImpersonateReturnUser$ = of(
    JSON.parse(
      <string>localStorage.getItem('cirrus-impersonation-return-user')
    ) as ICirrusUser
  );
  notificationCount$ = this.notificationService.getNotificationsCount();
  myOrdersCount$ = this.userService
    .getMyOrders()
    .pipe(map(order => order.order_line_items.length));
  error$ = this.errorService.error$;

  protected _isNotificationsMenuOpenSubject = new BehaviorSubject(false);
  isNotificationMenuOpen$ = this._isNotificationsMenuOpenSubject.asObservable();

  collapse = false;
  showHamburgerMenu = false;

  protected constructor(
    protected userService: UserService,
    protected breakpointObserver: BreakpointObserver,
    protected sidenavHeaderService: SidenavHeaderService,
    protected notificationService: NotificationService,
    protected errorService: ErrorService
  ) {}

  ngOnInit() {
    this.sidenavHeaderService.showNotifications$.subscribe(bool => {
      if (this.drawer) {
        bool ? this.drawer.open() : this.drawer.close();
      }
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  dismissErrorMessage() {
    this.errorService.errorSubject.next('');
  }

  drawerOpened() {
    this._isNotificationsMenuOpenSubject.next(true);
  }

  drawerClosed() {
    this._isNotificationsMenuOpenSubject.next(false);
  }

  toggleNotificationsMenu() {
    this.sidenavHeaderService.toggleShowNotifications();
  }

  dismissNotificationsMenu() {
    this.sidenavHeaderService.setShowNotifications(false);
  }

  toggleCollapse(collapse: boolean) {
    this.collapse = collapse;
  }

  protected getBreakpoint({ breakpoints }: BreakpointState) {
    const [breakpoint] = Object.entries(breakpoints).find(
      ([_breakpoint, match]) => match
    ) as [breakpoint: string, matches: boolean];
    return breakpoint;
  }

  logout() {
    this.userService.logout().subscribe(() => {
      window.location.href = 'https://cirrusapproach.com';
    });
  }

  impersonationLogout() {
    this.userService.impersonationLogout();
  }
}
