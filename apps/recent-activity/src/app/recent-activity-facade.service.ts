import { Injectable } from '@angular/core';
import { INotification } from '@cirrus/models';
import {
  ConnectionsService,
  UiDownloadService,
  NotificationService,
  FeatureFlagService,
} from '@cirrus/ui';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RecentActivityService } from './services/recent-activity.service';
import { FullstoryService } from '@cirrus/ui';

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
    private notificationService: NotificationService,
    private featureFlagService: FeatureFlagService,
    private fullstoryService: FullstoryService
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

  downloadCertificate(user_certificate_id: number) {
    return this.downloadService.downloadCertificate(user_certificate_id);
  }

  isFeatureFlagEnabled(featureName: string): Observable<boolean> {
    return this.featureFlagService.isFeatureEnabled(featureName);
  }

  fullstoryInit() {
    this.fullstoryService.init();
  }
}
