import { Injectable } from '@angular/core';
import { INotification } from '@cirrus/models';
import { ConnectionsService } from '@cirrus/ui';
import { tap } from 'rxjs/operators';
import { RecentActivityService } from './services/recent-activity.service';

@Injectable({
  providedIn: 'root',
})
export class RecentActivityFacade {
  constructor(
    private recentActivityService: RecentActivityService,
    private connectionService: ConnectionsService
  ) {}

  getRecentActivityPayload() {
    return this.recentActivityService.getRecentActivityAndNotifications();
  }

  acceptInvite(notification: INotification) {
    return this.connectionService
      .acceptInvite(notification)
      .pipe(tap(() => this.getRecentActivityPayload()));
  }

  declineInvite(notification: INotification) {
    return this.connectionService
      .declineInvite(notification)
      .pipe(tap(() => this.getRecentActivityPayload()));
  }
}
