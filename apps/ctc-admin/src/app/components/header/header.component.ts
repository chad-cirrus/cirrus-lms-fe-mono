import { Component } from '@angular/core';
import { ICirrusUser } from '@cirrus/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cirrusUser = JSON.parse(<string>localStorage.getItem('cirrus-user')) as ICirrusUser;

  ngOnInit(): void {

    if(!this.userIsCTCAdmin()) {
      // window.location.href = '/learning-catalog';
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
