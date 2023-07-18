import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { selectCourseOverview } from './store/selectors/course.selector';
import { map } from 'rxjs/operators';
import { FeatureFlagService } from '@cirrus/ui';
import { selectCirrusUser } from './store/selectors/cirrus-user.selector';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FeatureGuard implements CanActivate {
  constructor(
    private store: Store,
    private featureFlagService: FeatureFlagService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const feature = route.data.feature; // Extract the feature from route data

    const activate$ = this.featureFlagService.isFeatureEnabled(feature)
      .pipe(map((isFeatureEnabled) => {
        if (isFeatureEnabled) {
          return true;
        } else {
          // return to course catalog if not logged in
           this.router.navigate(['/course-catalog']);
           return false
          }
      }))
      return activate$
  }
}
