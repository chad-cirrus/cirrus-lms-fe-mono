import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ICirrusUser } from '@cirrus/models';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ctc-admin';
  cirrusUser = JSON.parse(<string>localStorage.getItem('cirrus-user')) as ICirrusUser;
  userIsCTCAdmin(): boolean {
    return this.cirrusUser && this.cirrusUser.ctc_admin;
  }
  ngOnInit(): void {
    if (!this.userIsCTCAdmin()) {
      window.location.href = '/learning-catalog';
    }
  }
}
