import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { RecentActivityService } from '../../services/recent-activity.service';
import { selectCirrusUser } from '../../store/selectors/cirrus-user.selector';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { totalFlightHoursString } from '../../helpers/totalFlightHoursString';
import { Router } from '@angular/router';

@Component({
  selector: 'cirrus-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
})
export class RecentActivityComponent implements OnInit {
  recentActivityNotifications$ =
    this.recentActivityService.recentActivityNotifcations$;

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
    private router: Router
  ) {}

  ngOnInit() {
    this.recentActivityService.getRecentActivityAndNotifications();
  }

  viewAllNotifications() {
    console.log('recent activity view all notifications');
  }

  navigateToCourse(course: number) {
    this.router.navigate(['/courses', course]);
  }
}
