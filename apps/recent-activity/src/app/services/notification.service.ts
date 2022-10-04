import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { INotification } from '@cirrus/models';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notificationsCount$ = this.http
    .get<INotification[]>(
      `${environment.baseUrl}/api/v3/notifications/my-notifications`
    )
    .pipe(map(notif => notif.length));

  constructor(private http: HttpClient) {}
}
