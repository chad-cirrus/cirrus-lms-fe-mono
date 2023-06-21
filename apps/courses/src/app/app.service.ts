import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { IOrder } from '@cirrus/models';
import { Observable, of, Subject } from 'rxjs';
import { environment } from '../environments/environment';

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

  scrollTrigger$ = new Subject();
  getTrigger() {
    return this.scrollTrigger$.asObservable();
  }

  getMyOrders() {
    return this.http.get<IOrder>(
      `${environment.baseUrl}/api/v3/orders/my-orders`
    );
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
}
