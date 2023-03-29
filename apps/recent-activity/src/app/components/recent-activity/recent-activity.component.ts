import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Injector,
  OnInit,
} from '@angular/core';

import { ICirrusUser } from '@cirrus/models';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RecentActivityFacade } from '../../facade.service';
import { FlightHours } from '../../models/IRecentActivity';
import { RecentActivityService } from '../../services/recent-activity.service';
import { AppState } from '../../store/reducers';
import { selectCirrusUser } from '../../store/selectors/cirrus-user.selector';

@Component({
  selector: 'cirrus-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
})
export class RecentActivityComponent implements AfterViewInit {
  user$ = this.store.select(selectCirrusUser);
  private _displaySubject = new Subject();
  displayStudentOrInstructorView$ = this._displaySubject.asObservable();

  recentActivityNotifications$ =
    this.recentActivityService.recentActivityNotifications$;

  flightHoursString$: Observable<FlightHours[]> =
    this.recentActivityNotifications$.pipe(
      map(
        activityNotifications =>
          activityNotifications.recentActivity.overall_progress.flight_hours
      )
    );

  flightHoursStringInstructor$: Observable<number> =
    this.flightHoursString$.pipe(
      map(arr => {
        const ifh = arr.filter(a => a.type === 'instructor_flight_hours');
        if (ifh[0]?.completed) {
          return Math.floor(ifh[0].completed);
        }
        return 0;
      })
    );
  flightHoursStringStudent$: Observable<number> = this.flightHoursString$.pipe(
    map(arr => {
      const ifh = arr.filter(a => a.type === 'student_flight_hours');

      if (ifh[0]?.completed) {
        return Math.floor(ifh[0].completed);
      }
      return 0;
    })
  );

  isFeatureFlagEnabled$: Observable<boolean> =
    this.facadeService.isFeatureFlagEnabled('instructor_recent_activity');

  constructor(
    private store: Store<AppState>,
    private recentActivityService: RecentActivityService,
    private facadeService: RecentActivityFacade
  ) {}

  ngAfterViewInit() {
    const cirrusUser = JSON.parse(
      <string>localStorage.getItem('cirrus-user')
    ) as ICirrusUser;

    const path = cirrusUser.role === 'instructor' ? 'instructor' : 'student';
    setTimeout(() => {
      this._displaySubject.next(path);
    }, 0);
  }

  toggleView(e: any) {
    this._displaySubject.next(e);
  }
}
