import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ICirrusUser } from '@cirrus/models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
selector: 'cirrus-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class GlobalHeaderComponent {
  @Input() cirrusUser!: ICirrusUser;
  @Input() isLoggedIn!: boolean | null;
  @Input() deployUrl = '';
  @Input() cirrusImpersonationReturnUser!: ICirrusUser;
  @Input() isScreenSmall = false;
  @Input() notificationCount!: number;
  @Input() orderCount!: number;

  @Output() hamburgerMenu = new EventEmitter();
  @Output() logout = new EventEmitter();
  @Output() impersonationLogout = new EventEmitter();
  @Output() toggleNotificationsMenu = new EventEmitter();

  isDisplayingDropdown!: boolean;
  isDisplayingHamburger!: boolean;

  toggleDropdownDisplay(e: Observable<any>) {
    e.subscribe(data => (this.isDisplayingDropdown = data));
  }

  toggleHamburgerDisplay(e: Observable<any>) {
    e.subscribe(data => (this.isDisplayingHamburger = data));
  }

  openHamburgerMenu() {
    this.hamburgerMenu.emit('dksjfkajsf');
  }

  constructor(private router: Router) { }
  isRecentActivityPage(): boolean {
    return this.router.url.includes('/recent-activity');
  }

  checkoutState() {
    const checkoutStateString = JSON.parse(<string>(localStorage.getItem('checkout-state')));
    if (checkoutStateString !== null) {
      const { order } = checkoutStateString;
      return order['order_line_items'].length;
    }
    return 0;
  }

  emitImpersonationLogout() {
    this.impersonationLogout.emit();
  }

  emitLogout() {
    this.logout.emit();
  }

  emitToggleNotifications() {
    this.toggleNotificationsMenu.emit();
  }
}
