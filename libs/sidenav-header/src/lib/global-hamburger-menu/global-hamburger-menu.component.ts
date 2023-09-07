import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ICirrusUser } from '@cirrus/models';

@Component({
  selector: 'cirrus-global-hamburger-menu',
  templateUrl: './global-hamburger-menu.component.html',
  styleUrls: ['./global-hamburger-menu.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class GlobalHamburgerMenuComponent {
  @Input() cirrusUser!: ICirrusUser;
  @Input() isLoggedIn!: boolean | null;
  @Output() displayHamburger = new EventEmitter<any>();
  @Input() notificationCount!: number;
  @Output() toggleNotificationsMenu = new EventEmitter();

  @Input() deployUrl = '';
  hamburgerIcon = true;

  showHamburgerIcon(icon: boolean) {
    this.hamburgerIcon = icon;
  }

  showNotifications() {
    this.toggleNotificationsMenu.emit();
  }
}
