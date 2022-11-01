import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICirrusUser } from '@cirrus/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/reducers';

@Component({
  selector: 'cirrus-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() cirrusUser!: ICirrusUser;
  @Input() cirrusImpersonationReturnUser!: ICirrusUser;
  @Output() hamburgerMenu = new EventEmitter();
  isDisplayingDropdown!: boolean;
  @Input() notificationCount!: number;
  isDisplayingHamburger!: boolean;

  @Input() isScreenSmall = false;

  @Output() logout = new EventEmitter();
  @Output() impersonationLogout = new EventEmitter();

  constructor(private store: Store<AppState>) {}

  toggleDropdownDisplay(e: Observable<any>) {
    e.subscribe(data => (this.isDisplayingDropdown = data));
  }

  toggleHamburgerDisplay(e: Observable<any>) {
    e.subscribe(data => (this.isDisplayingHamburger = data));
  }

  openHamburgerMenu() {
    this.hamburgerMenu.emit('dksjfkajsf');
  }

  emitImpersonationLogout() {
    this.impersonationLogout.emit();
  }

  emitLogout() {
    this.logout.emit();
  }
}
