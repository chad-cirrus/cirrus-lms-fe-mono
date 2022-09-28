import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';
import { ICirrusUser } from '@cirrus/models';
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

  collapse = false;
  showHamburgerMenu = false;
  @ViewChild('outletContainer') outletContainer!: ElementRef;
  constructor(
    private notificationService: NotificationService,
    private store: Store<AppState>,
    private breakpointObserver: BreakpointObserver
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
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  openHamburgerMenu() {
    console.log('open hamburger');
  }

  toggleCollapse(collapse: boolean) {
    this.collapse = collapse;
  }

  private getBreakpoint({ breakpoints }: BreakpointState) {
    const [breakpoint] = Object.entries(breakpoints).find(
      ([_breakpoint, match]) => match === true
    ) as [breakpoint: string, matches: boolean];
    return breakpoint;
  }
}
