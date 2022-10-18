import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  errorSubject = new BehaviorSubject('');
  error$ = this.errorSubject.asObservable();
}
