import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  initialRecentActivity,
  IRecentActivity,
} from '../models/IRecentActivity';
import { map, tap } from 'rxjs/operators';
import { IRecentActivityNotifications } from '../models/IRecentActivityNotifications';
import { INotification } from '@cirrus/models';

export interface IRecentActivityTotal {
  notifications: INotification[];
  recent_activity: IRecentActivity;
}

@Injectable({
  providedIn: 'root',
})
export class RecentActivityService {
  private _recentActivityNotifications =
    new BehaviorSubject<IRecentActivityNotifications>({
      recentActivity: initialRecentActivity,
      notifications: [],
    });

  private _recentActivityNotificationsInstructors =
    new BehaviorSubject<IRecentActivityNotifications>({
      recentActivity: initialRecentActivity,
      notifications: [],
    });

  recentActivityNotifications$ =
    this._recentActivityNotifications.asObservable();

  recentActivityNotificationsInstructors$ =
    this._recentActivityNotificationsInstructors.asObservable();

  displayComponentSubject: Subject<string> = new Subject();
  display$: Observable<string> = this.displayComponentSubject.asObservable();

  constructor(private http: HttpClient) {}
  getRecentActivity(): Observable<IRecentActivity> {
    const url = `${environment.baseUrl}/api/v4/recent_activity`;
    return this.http.get<IRecentActivity>(url);
  }

  getNotifications() {
    const url = `${environment.baseUrl}/api/v3/notifications/my-notifications`;
    return this.http.get<INotification[]>(url);
  }

  getRecentActivityAndNotifications(): void {
    forkJoin([this.getRecentActivity(), this.getNotifications()])
      .pipe(
        map(([recentActivity, notifications]) => ({
          recentActivity,
          notifications,
        }))
      )
      .subscribe(response => this._recentActivityNotifications.next(response));
  }

  getRecentActivityAndNotificationsInstructor(): void {
    forkJoin([of(initialRecentActivity), this.getNotifications()])
      .pipe(
        map(([recentActivity, notifications]) => ({
          recentActivity,
          notifications,
        }))
      )
      .subscribe(response =>
        this._recentActivityNotificationsInstructors.next(response)
      );
  }
}
