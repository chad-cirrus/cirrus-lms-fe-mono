import { Injectable } from '@angular/core';
import { INotification } from '@cirrus/models';
import {
  ConnectionsService,
  UiDownloadService,
  NotificationService,
  FullstoryService,
  FullStoryEvent,
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
    private notificationService: NotificationService,
    private fullstoryService: FullstoryService
  ) {}

  getNotifications() {
    this.courseService.getNotifications();
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

  fullstoryInit() {
    this.fullstoryService.init();
  }

  fullstoryEvent(eventName: string, eventProperties: FullStoryEvent) {
    this.fullstoryService.event(eventName, eventProperties);
  }
}
