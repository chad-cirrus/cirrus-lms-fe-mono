import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  delay,
  distinctUntilChanged,
  map,
  share,
  takeUntil,
} from 'rxjs/operators';
import { AppService } from './app.service';
import * as appActions from './store/actions';
import { setCirrusUser, setScreenSize } from './store/actions';
import { AppState } from './store/reducers';
import {
  selectLesson,
  selectLessonStateBusy,
} from './store/selectors/lessons.selector';
import { ICirrusUser, ILesson } from '@cirrus/models';
import {
  selectCirrusUser,
  selectRole,
} from './store/selectors/cirrus-user.selector';
import { merge, Observable, of, Subject, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  selectIsScreenSmall,
  selectIsScreenTablet,
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

@Component({
  selector: 'cirrus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  destroyed = new Subject<void>();
  student = 'John Doe';
  viewToggle = new FormControl(false);
  toggle$ = this.viewToggle.valueChanges;
  lessonStateBusy$ = this.store.select(selectLessonStateBusy).pipe(delay(1));

  role$ = this.store.select(selectRole);
  lesson$: Observable<ILesson> = this.store.select(selectLesson);
  breakPoint$ = this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ]);
  cirrusUser$ = this.store.select(selectCirrusUser);
  cirrusImpersonateReturnUser$!: Observable<ICirrusUser>;
  courseId$ = this.appService.courseId$.pipe(distinctUntilChanged(), share());

  project = environment.project;

  error$ = this.errorService.error$;

  notificationCount$: Observable<any> = this.courseService.notificationsCount$;
  sideNavOpen$: Observable<boolean> = this.store.select(selectSideNavOpen);
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  ftgNotPilot = 160;
  ftgPilot = 112;
  isScreenSmall$: Observable<boolean> = this.store.select(selectIsScreenSmall);
  isScreenTablet$: Observable<boolean> =
    this.store.select(selectIsScreenTablet);

  loadingIndicator$ = merge(this.lessonStateBusy$);

  collapse = false;
  showHamburgerMenu = false;
  @ViewChild('outletContainer') outletContainer!: ElementRef;

  triggerSubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private appService: AppService,
    private breakpointObserver: BreakpointObserver,
    private courseService: CoursesService,
    private errorService: ErrorService
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

  private getBreakpoint({ breakpoints }: BreakpointState) {
    const [breakpoint] = Object.entries(breakpoints).find(
      ([_breakpoint, match]) => match === true
    ) as [breakpoint: string, matches: boolean];
    return breakpoint;
  }
}
