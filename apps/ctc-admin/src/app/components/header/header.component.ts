import { Component, OnInit } from '@angular/core';
import { ICirrusUser } from '@cirrus/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  cirrusUser = JSON.parse(<string>localStorage.getItem('cirrus-user')) as ICirrusUser;

  ngOnInit(): void {
    if (!this.userIsCTCAdmin()) {
      window.location.href = '/learning-catalog';
    }
  }
  userIsCTCAdmin(): boolean {
    return this.cirrusUser && this.cirrusUser.ctc_admin;
  }
}
