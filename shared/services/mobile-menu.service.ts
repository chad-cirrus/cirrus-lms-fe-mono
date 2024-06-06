import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileMenuService {
  private mobileMenuActiveSource = new Subject<boolean>();
  mobileMenuActive$ = this.mobileMenuActiveSource.asObservable();

  toggleMobileMenu(active: boolean) {
    this.mobileMenuActiveSource.next(active);
  }
}