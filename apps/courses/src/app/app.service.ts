import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  courseId$: Observable<string | null> = this.router.events.pipe(
    filter((event: Event) => event instanceof NavigationEnd),
    map(() => this.route.root.firstChild),
    switchMap(firstChild =>
      firstChild
        ? firstChild.paramMap.pipe(map(paramMap => paramMap.get('courseId')))
        : of(null)
    )
  );

  constructor(private router: Router, private route: ActivatedRoute) {}
}
