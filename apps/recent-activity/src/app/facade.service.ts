import { Injectable } from '@angular/core';
import { INotification } from '@cirrus/models';
import {
  ConnectionsService,
  UiDownloadService,
  NotificationService,
} from '@cirrus/ui';
import { map, tap } from 'rxjs/operators';
import { RecentActivityService } from './services/recent-activity.service';

@Injectable({
  providedIn: 'root',
})
export class RecentActivityFacade {
  achievements$ = this.recentActivityService.recentActivityNotifications$.pipe(
    map(
      recentActivityNotifications =>
        recentActivityNotifications.recentActivity.achievements
    )
  );

  downloadLoading$ = this.downloadService.loading$;

  constructor(
    private recentActivityService: RecentActivityService,
    private connectionService: ConnectionsService,
    private downloadService: UiDownloadService,
    private notificationService: NotificationService
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

  clearNotifications(notifications: INotification[]) {
    return this.notificationService.clearNotifications(notifications).pipe(
      tap(() => {
        this.getRecentActivityPayload();
      })
    );
  }

  deleteNotification(id: number) {
    return this.notificationService
      .deleteNotification(id)
      .pipe(tap(() => this.getRecentActivityPayload()));
  }

  downloadCertificate(course_attempt_id: number) {
    return this.downloadService.downloadCertificate(course_attempt_id);
  }
}
