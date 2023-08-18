import { Injectable } from '@angular/core';
import { FeatureFlagService } from '@cirrus/ui';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SidenavHeaderService {
  private _showNotifications = new BehaviorSubject<boolean>(false);
  showNotifications$ = this._showNotifications.asObservable();

  constructor(private featureFlagService: FeatureFlagService) {}

  toggleShowNotifications() {
    this._showNotifications.next(!this._showNotifications.value);
  }

  setShowNotifications(value: boolean): void {
    this._showNotifications.next(value);
  }

  getShowNotifications(): boolean {
    return this._showNotifications.value;
  }

  isFeatureFlagEnabled(featureName: string): Observable<boolean> {
    return this.featureFlagService.isFeatureEnabled(featureName);
  }
}
