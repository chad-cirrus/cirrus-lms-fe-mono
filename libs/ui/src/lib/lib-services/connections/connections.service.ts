import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { INotification } from '@cirrus/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionsService {
  private environment!: Record<string, unknown>;

  constructor(
    private http: HttpClient,
    @Inject('environment') environment: Record<string, unknown>
  ) {
    this.environment = environment;
  }

  acceptInvite(notification: INotification): Observable<boolean> {
    const connectionId = notification.notifiable?.connection.id;
    const url = `${this.environment['baseUrl']}/api/v4/connections/${connectionId}/accept`;
    return this.http.post<boolean>(url, null);
  }

  declineInvite(notification: INotification): Observable<boolean> {
    const connectionId = notification.notifiable?.connection.id;
    const url = `${this.environment['baseUrl']}/api/v4/connections/${connectionId}/decline`;
    return this.http.post<boolean>(url, null);
  }

  clearNotifications(notifications: INotification[]): Observable<boolean> {
    const url = `${this.environment['baseUrl']}/api/v3/notifications/clear`;
    return this.http.post<boolean>(url, JSON.stringify({ notifications }));
  }

  deleteNotifications(id: number): Observable<any> {
    const url = `${this.environment['baseUrl']}/api/v3/notifications/${id}`;
    return this.http.delete(url);
  }
}
