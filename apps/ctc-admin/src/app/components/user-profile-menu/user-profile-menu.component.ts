import { Component, OnInit } from '@angular/core';
import { ICirrusUser } from '@cirrus/models';

@Component({
  selector: 'app-user-profile-menu',
  templateUrl: './user-profile-menu.component.html',
  styleUrl: './user-profile-menu.component.scss',
})
export class UserProfileMenuComponent implements OnInit {
  cirrusUser = JSON.parse(<string>localStorage.getItem('cirrus-user')) as ICirrusUser;
  ngOnInit(): void {
    if (!this.userIsCTCAdmin()) {
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
