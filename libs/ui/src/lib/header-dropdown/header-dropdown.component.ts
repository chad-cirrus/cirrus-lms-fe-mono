import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ICirrusUser, ROLE } from '@cirrus/models';
import { Observable } from 'rxjs';


@Component({
  selector: 'cirrus-header-dropdown',
  templateUrl: './header-dropdown.component.html',
  styleUrls: ['./header-dropdown.component.scss'],
})
export class HeaderDropdownComponent {
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  @Output() hamburgerMenu = new EventEmitter();
  private _cirrusUser!: ICirrusUser;
  @Input() isScreenSmall!: boolean | null;
  showDashboard = false;
  student = true;
  ctc = false;
  lms = false;
  instructor = false;
  isMenuOpened!: boolean;
  currentWidth!: number;

  get cirrusUser() {
    return this._cirrusUser;
  }

  @Input()
  set cirrusUser(cirrusUser: ICirrusUser) {
    this._cirrusUser = cirrusUser;
    this.student = cirrusUser.role === ROLE.pilot;
    this.ctc = cirrusUser.ctc_admin;
    this.lms = cirrusUser.role === ROLE.admin;
    this.instructor = cirrusUser.role === ROLE.instructor;
  }

  menuToggle() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  openMenu() {
    this.showDashboard = false;
    this.menuTrigger.openMenu();
  }

  toggleDashboard() {
    this.showDashboard = !this.showDashboard;
  }

  openHamburgerMenu() {
    this.hamburgerMenu.emit('dksjfkajsf');
  }

}
