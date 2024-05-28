import { Component, OnInit } from '@angular/core';
import { ICirrusUser } from '@cirrus/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'ctc-admin';
  cirrusUser = JSON.parse(<string>localStorage.getItem('cirrus-user')) as ICirrusUser;

  ngOnInit(): void {

    if(!this.userIsCTCAdmin()) {
      // window.location.href = '/learning-catalog';
    }
  }
  userIsCTCAdmin(): boolean {
    return this.cirrusUser && this.cirrusUser.ctc_admin;
  }
}
