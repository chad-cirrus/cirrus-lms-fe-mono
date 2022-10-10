import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { ErrorNotificationService } from '../error-notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorNotificationService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage: any;

        if (error.error instanceof ErrorEvent) {
          console.log('client side error', error);
          // client-side error
          errorMessage = error.error;
        } else {
          console.log('server side error', error);
          errorMessage = error.error;
        }
        this.errorService.errorSubject.next(errorMessage);

        return throwError(errorMessage);
      })
    );
  }
}
