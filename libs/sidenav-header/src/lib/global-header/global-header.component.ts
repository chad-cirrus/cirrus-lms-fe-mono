import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ICirrusUser } from '@cirrus/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'cirrus-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class GlobalHeaderComponent {
  @Input() cirrusUser!: ICirrusUser;
  @Input() cirrusImpersonationReturnUser!: ICirrusUser;
  @Output() hamburgerMenu = new EventEmitter();
  isDisplayingDropdown!: boolean;
  @Input() notificationCount!: number;
  isDisplayingHamburger!: boolean;

  @Input() isScreenSmall = false;

  @Output() logout = new EventEmitter();
  @Output() impersonationLogout = new EventEmitter();

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
