import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';
import { ICirrusUser, INotification } from '@cirrus/models';
import { setCirrusUser } from './store/actions/cirrus-user.actions';
import { selectCirrusUser } from './store/selectors/cirrus-user.selector';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, takeUntil, tap } from 'rxjs/operators';
import { setScreenSize } from './store/actions/view.actions';
import { selectIsScreenSmall } from './store/selectors/view.selector';
import {
  CirrusBaseComponent,
  ErrorService,
  NotificationService,
  UserService,
} from '@cirrus/ui';
import { environment } from '../environments/environment';
import { RecentActivityService } from './services/recent-activity.service';
import { RecentActivityFacade } from './facade.service';
import { SidenavHeaderService } from '@cirrus/sidenav-header';
import { Router } from '@angular/router';
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
  cirrusUser$ = this.store.select(selectCirrusUser);
  isScreenSmall$: Observable<boolean> = this.store
    .select(selectIsScreenSmall)
    .pipe(tap(small => console.log('small: ', small)));

  project = environment.project;

  recentActivityNotifications$ =
    this.recentActivityService.recentActivityNotifications$;

  constructor(
    private store: Store<AppState>,
    private recentActivityService: RecentActivityService,
    private facade: RecentActivityFacade,
    router: Router,
    scroller: ViewportScroller,
    errorService: ErrorService,
    notificationService: NotificationService,
    sidenavHeaderService: SidenavHeaderService,
    breakpointObserver: BreakpointObserver,
    userService: UserService
  ) {
    super(
      userService,
      breakpointObserver,
      sidenavHeaderService,
      notificationService,
      errorService,
      router,
      scroller
    );
  }

  ngOnInit() {
    super.ngOnInit();
    const cirrusUser = JSON.parse(
      <string>localStorage.getItem('cirrus-user')
    ) as ICirrusUser;
    this.store.dispatch(setCirrusUser({ cirrusUser }));
    this.breakPoint$
      .pipe(takeUntil(this.destroyed), map(this.getBreakpoint))
      .subscribe(screenSize =>
        this.store.dispatch(setScreenSize({ screenSize }))
      );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
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
