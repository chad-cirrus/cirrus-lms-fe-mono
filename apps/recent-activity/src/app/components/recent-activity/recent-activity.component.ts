import { Component, OnInit, ViewChild } from '@angular/core';
import { filter, flatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { RecentActivityService } from '../../services/recent-activity.service';
import { selectCirrusUser } from '../../store/selectors/cirrus-user.selector';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { totalFlightHoursString } from '../../helpers/totalFlightHoursString';

import { MatSidenav } from '@angular/material/sidenav';
import { SidenavHeaderService } from '@cirrus/sidenav-header';
import { ICoursesForRecentActivity, ISearchInputData } from '@cirrus/models';
import { IRecentActivityNotifications } from '../../models/IRecentActivityNotifications';
import { PROGRESS_STATUS } from '@cirrus/models';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'cirrus-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
})
export class RecentActivityComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;

  events: string[] = [];
  opened!: boolean;
  courseInputVal = new FormControl('');
  project = environment.project;

  private _filteredTextSubject: Subject<string> = new Subject();
  filteredText$: Observable<string> = this._filteredTextSubject.asObservable();

  private _courseInputSubject: Subject<string> = new Subject();
  courseInput$: Observable<string> = this._courseInputSubject.asObservable();

  recentActivityNotifications$ =
    this.recentActivityService.recentActivityNotifications$;

  courses$ = this.recentActivityNotifications$.pipe(
    map(
      recentActivityNotifications =>
        recentActivityNotifications.recentActivity.courses
    )
  );

  filteredCourses$: Observable<ISearchInputData[]> = combineLatest([
    this.filteredText$,
    this.courses$,
  ]).pipe(
    map(([input, courses]) => {
      if (!input) {
        return;
      }
      return courses.filter(course =>
        course.name.toLowerCase().includes(input.toLowerCase())
      );
    }),
    map(courses => {
      if (!courses) {
        return [];
      }
      return courses.map(course => {
        return {
          name: course.title,
          status: course.status,
          courseId: course.id,
        };
      });
    })
  );

  inProgressCourses$: Observable<ICoursesForRecentActivity[]> =
    this.recentActivityNotifications$.pipe(
      map((resp: IRecentActivityNotifications) =>
        resp.recentActivity.courses.filter(
          (course: ICoursesForRecentActivity) =>
            course.status === PROGRESS_STATUS.in_progress
        )
      )
    );

  user$ = this.store.select(selectCirrusUser);
  flightHoursString$: Observable<string> =
    this.recentActivityNotifications$.pipe(
      map(
        activityNotifications =>
          activityNotifications.recentActivity.overall_progress.logbook_stats
      ),
      map(stats =>
        stats[0] !== undefined ? Math.round(+stats[0].completed) : 0
      ),
      map(hoursAsNumber => totalFlightHoursString(hoursAsNumber))
    );

  constructor(
    private recentActivityService: RecentActivityService,
    private store: Store<AppState>,
    private sidenavHeaderService: SidenavHeaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.recentActivityService.getRecentActivityAndNotifications();

    this.courseInputVal.valueChanges
      .pipe(
        tap(input => {
          this._courseInputSubject.next(input);
        })
      )
      .subscribe();
  }

  filterText(val: string) {
    this._filteredTextSubject.next(val);
  }

  viewAllNotifications() {
    this.sidenavHeaderService.setShowNotifications(true);
  }

  emitNavigation($event: ISearchInputData) {
    this.router.navigate(['courses', $event.courseId]);
  }
}
