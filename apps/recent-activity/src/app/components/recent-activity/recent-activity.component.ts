import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { RecentActivityService } from '../../services/recent-activity.service';
import { selectCirrusUser } from '../../store/selectors/cirrus-user.selector';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { totalFlightHoursString } from '../../helpers/totalFlightHoursString';

import { MatSidenav } from '@angular/material/sidenav';

import { Router } from '@angular/router';
import { INotification } from '@cirrus/models';
import { RecentActivityFacade } from '../../facade.service';

@Component({
  selector: 'cirrus-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
})
export class RecentActivityComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;

  events: string[] = [];
  opened!: boolean;
  recentActivityNotifications$ =
    this.recentActivityService.recentActivityNotifications$;
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
    private router: Router,
    private facade: RecentActivityFacade
  ) {}

  ngOnInit() {
    this.recentActivityService.getRecentActivityAndNotifications();
  }

  viewAllNotifications() {
    console.log('recent activity view all notifications');
    this.drawer.open();
  }

  dismissNotificationsMenu() {
    this.drawer.close();
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

  navigateToCourse(course: number) {
    this.router.navigate(['/courses', course]);
  }
}
