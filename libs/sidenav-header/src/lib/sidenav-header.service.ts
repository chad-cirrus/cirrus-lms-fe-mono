import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SidenavHeaderService {
  private _showNotifications = new BehaviorSubject<boolean>(false);
  showNotifications$ = this._showNotifications.asObservable();

  toggleShowNotifications() {
    this._showNotifications.next(!this._showNotifications.value);
  }

  setShowNotifications(value: boolean): void {
    this._showNotifications.next(value);
  }

  getShowNotifications(): boolean {
    return this._showNotifications.value;
  }
}
