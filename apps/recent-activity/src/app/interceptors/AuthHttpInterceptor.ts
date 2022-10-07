import {
  HttpInterceptor,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
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
        }
      })
    );
  }
}
