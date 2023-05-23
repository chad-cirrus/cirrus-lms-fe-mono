import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCourseOverview } from './store/selectors/course.selector';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  allowUserAccess$: Observable<boolean> = this.store
    .select(selectCourseOverview)
    .pipe(map(course => course.course_attempt.id > 0));

  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.allowUserAccess$;
  }
}
