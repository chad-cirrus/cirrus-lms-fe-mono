import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  initialRecentyActivity,
  IRecentActivity,
} from '../models/IRecentActivity';
import { INotification } from '../models/Notification';

@Injectable({
  providedIn: 'root',
})
export class RecentActivityService {
  private _recentActivityNotifications = new BehaviorSubject<
    [IRecentActivity, INotification[]]
  >([initialRecentyActivity, []]);
  recentActivityNotifcations$ =
    this._recentActivityNotifications.asObservable();
  constructor(private http: HttpClient) {}
  getRecentActivity(): Observable<IRecentActivity> {
    const url = `${environment.baseUrl}/api/v4/courses/recent_activity`;
    return this.http.get<IRecentActivity>(url);
  }

  getNotifications() {
    const url = `${environment.baseUrl}/api/v3/notifications/my-notifications`;
    return this.http.get<INotification[]>(url);
  }

  getRecentActivityAndNotifications() {
    forkJoin([this.getRecentActivity(), this.getNotifications()]).subscribe(
      response => this._recentActivityNotifications.next(response)
    );
  }
}
