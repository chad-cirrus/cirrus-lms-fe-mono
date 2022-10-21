import { Injectable } from '@angular/core';
import { INotification } from '@cirrus/models';
import {
  ConnectionsService,
  UiDownloadService,
  NotificationService,
} from '@cirrus/ui';
import { tap } from 'rxjs/operators';
import { CoursesService } from './course/course.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesFacadeService {
  downloadLoading$ = this.downloadService.loading$;

  constructor(
    private courseService: CoursesService,
    private connectionService: ConnectionsService,
    private downloadService: UiDownloadService,
    private notificationService: NotificationService
  ) {}

  getNotifications() {
    return this.courseService.notifications$.subscribe();
  }

  acceptInvite(notification: INotification) {
    return this.connectionService
      .acceptInvite(notification)
      .pipe(tap(() => this.getNotifications()));
  }

  declineInvite(notification: INotification) {
    return this.connectionService
      .declineInvite(notification)
      .pipe(tap(() => this.getNotifications()));
  }

  clearNotifications(notifications: INotification[]) {
    return this.notificationService.clearNotifications(notifications).pipe(
      tap(() => {
        this.getNotifications();
      })
    );
  }

  deleteNotification(id: number) {
    return this.notificationService
      .deleteNotification(id)
      .pipe(tap(() => this.getNotifications()));
  }

  downloadCertificate(course_attempt_id: number) {
    return this.downloadService.downloadCertificate(course_attempt_id);
  }
}
