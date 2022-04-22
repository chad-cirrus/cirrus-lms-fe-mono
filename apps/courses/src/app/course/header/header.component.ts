import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICirrusUser } from '@cirrus/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/reducers';
import { selectIsScreenSmall } from '../../store/selectors/view.selector';

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
  isScreenSmall$ = this.store.pipe(select(selectIsScreenSmall));

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
}
