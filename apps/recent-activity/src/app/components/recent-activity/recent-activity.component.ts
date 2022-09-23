import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RecentActivityService } from '../../services/recent-activity.service';
import { selectCirrusUser } from '../../store/selectors/cirrus-user.selector';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'cirrus-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
})
export class RecentActivityComponent implements OnInit {
  recentActivityNotifications$ =
    this.recentActivityService.recentActivityNotifcations$.pipe(
      tap(a => console.log('a', a))
    );

  user$ = this.store.select(selectCirrusUser);

  constructor(
    private recentActivityService: RecentActivityService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.recentActivityService.getRecentActivityAndNotifications();
  }

  viewAllNotifications() {
    console.log('recent activity view all notifications');
  }
}
