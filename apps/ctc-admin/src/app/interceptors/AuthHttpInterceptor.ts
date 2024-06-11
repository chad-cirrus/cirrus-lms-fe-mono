import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('cirrus-token');
    console.log('AuthHttpInterceptor localStorage:', localStorage);
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    console.log('AuthHttpInterceptor req:', req);
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
          }

          console.log('AuthHttpInterceptor response:', val);
        }
      }),
    );
  }
}
