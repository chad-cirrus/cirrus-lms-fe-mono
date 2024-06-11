import { Component, OnInit } from '@angular/core';
import { ICirrusUser } from '@cirrus/models';
import { CtcAdminService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ctc-admin';
  cirrusUser = JSON.parse(<string>localStorage.getItem('cirrus-user')) as ICirrusUser;

  constructor(private ctcAdminService: CtcAdminService) {
        this.ctcAdminService.getUsersTrainingCenter().subscribe(trainingCenter => {
          this.ctcAdminService.updateTrainingCenter(trainingCenter);
        });

  }

  ngOnInit(): void {
    if (!this.userIsCTCAdmin()) {
      window.location.href = '/learning-catalog';
    }
  }

  userIsCTCAdmin(): boolean {
    return this.cirrusUser && this.cirrusUser.ctc_admin;
  }
}
