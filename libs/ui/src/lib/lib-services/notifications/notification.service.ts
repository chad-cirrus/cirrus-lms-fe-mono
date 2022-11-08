import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { INotification } from '@cirrus/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NotificationService {
  private readonly environment!: Record<string, unknown>;

  constructor(
    private http: HttpClient,
    @Inject('environment') environment: Record<string, unknown>
  ) {
    this.environment = environment;
  }

  getNotificationsCount() {
    return this.http
      .get<INotification[]>(
        `${this.environment.baseUrl}/api/v3/notifications/my-notifications`
      )
      .pipe(map(notif => notif.length));
  }

  clearNotifications(notifications: INotification[]): Observable<boolean> {
    const url = `${this.environment['baseUrl']}/api/v3/notifications/clear`;
    return this.http.post<boolean>(url, { notifications });
  }

  deleteNotification(id: number): Observable<any> {
    const url = `${this.environment['baseUrl']}/api/v3/notifications/${id}`;
    return this.http.delete(url);
  }
}
