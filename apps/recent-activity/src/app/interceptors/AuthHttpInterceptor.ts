import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from '../store/reducers';
import { Store } from '@ngrx/store';
import { setCirrusUser } from '../store/actions/cirrus-user.actions';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('cirrus-token');
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(req).pipe(
      tap(val => {
        if (val.type === HttpEventType.Response) {
          const accessToken = val.headers.get('Access-Token');
          if (accessToken !== null) {
            localStorage.setItem('cirrus-token', accessToken);
          }

          const cirrusUser = val.headers.get('user');

          if (cirrusUser !== null) {
            localStorage.setItem('cirrus-user', cirrusUser);
            this.store.dispatch(
              setCirrusUser({ cirrusUser: JSON.parse(cirrusUser) })
            );
          }
        }
      })
    );
  }
}
