import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICirrusUser } from '@cirrus/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'cirrus-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() cirrusUser!: ICirrusUser;
  @Input() isScreenSmall: any;
  @Output() hamburgerMenu = new EventEmitter();
  isDisplayingDropdown!: boolean;
  isDisplayingHamburger!: boolean;


  toggleDropdownDisplay(e: Observable<any>) {
    e.subscribe(data => this.isDisplayingDropdown = data)
  }


  toggleHamburgerDisplay(e: Observable<any>) {
      e.subscribe(data => this.isDisplayingHamburger = data)
    }


  menuItems = ['Dashboard', 'Edit Profile', 'Purchase History', 'Learn to Fly', 'Flight Fix', 'Logout']


  openHamburgerMenu() {
    this.hamburgerMenu.emit('dksjfkajsf');
  }

}
