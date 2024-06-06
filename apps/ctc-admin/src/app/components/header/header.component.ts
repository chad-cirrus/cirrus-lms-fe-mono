import { Component, OnInit } from '@angular/core';
import { ICirrusUser } from '@cirrus/models';
import { MobileMenuService } from '../../../../../../shared/services/mobile-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  cirrusUser = JSON.parse(<string>localStorage.getItem('cirrus-user')) as ICirrusUser;
  isMobileMenuActive!: boolean;

  ngOnInit(): void {
    if (!this.userIsCTCAdmin()) {
      window.location.href = '/learning-catalog';
    }
  }

  userIsCTCAdmin(): boolean {
    return this.cirrusUser && this.cirrusUser.ctc_admin;
  }

  constructor(private mobileMenuService: MobileMenuService) {}

  toggleMobileMenu() {
    this.isMobileMenuActive = !this.isMobileMenuActive;
    this.mobileMenuService.toggleMobileMenu(this.isMobileMenuActive);
  }
}
