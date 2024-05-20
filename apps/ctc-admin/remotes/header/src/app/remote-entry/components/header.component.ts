import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileMenuComponent } from './user-profile-menu/user-profile-menu.component';
import { ICirrusUser } from '@cirrus/models';

@Component({
  selector: 'ctc-admin-header',
  standalone: true,
  imports: [CommonModule, UserProfileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{
  cirrusUser = JSON.parse(<string>localStorage.getItem('cirrus-user')) as ICirrusUser;

  ngOnInit(): void {

    if(!this.userIsCTCAdmin()) {
      window.location.href = '/learning-catalog';
    }
  }
  userIsCTCAdmin(): boolean {
    return this.cirrusUser && this.cirrusUser.ctc_admin;
  }

  getUserInitials(): string {
    return this.cirrusUser.firstname[0] + this.cirrusUser.lastname[0];
  }

  getDisplayName(): string {
    return this.cirrusUser.firstname + ' ' + this.cirrusUser.lastname;
  }
}
