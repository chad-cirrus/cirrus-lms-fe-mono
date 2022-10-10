import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorNotificationService {
  errorSubject = new BehaviorSubject('');
  error$ = this.errorSubject.asObservable();
}
