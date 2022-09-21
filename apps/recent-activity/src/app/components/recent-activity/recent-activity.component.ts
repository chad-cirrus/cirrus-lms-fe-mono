import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RecentActivityService } from '../../services/recent-activity.service';

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

  constructor(private recentActivityService: RecentActivityService) {}

  ngOnInit() {
    this.recentActivityService.getNotifications().subscribe(console.log);

    this.recentActivityService.getRecentActivityAndNotifications();
  }
}
