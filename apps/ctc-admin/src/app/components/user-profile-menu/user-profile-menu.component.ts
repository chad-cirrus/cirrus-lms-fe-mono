import { Component, OnInit } from '@angular/core';
import { ICirrusUser } from '@cirrus/models';
import { ITrainingCenter } from '../../models/ITrainingCenter';
import { CtcAdminService } from '../../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile-menu',
  templateUrl: './user-profile-menu.component.html',
  styleUrl: './user-profile-menu.component.scss',
})
export class UserProfileMenuComponent implements OnInit {
  cirrusUser = JSON.parse(<string>localStorage.getItem('cirrus-user')) as ICirrusUser;
  trainingCenter: ITrainingCenter = {} as ITrainingCenter;
  private subscription: Subscription = new Subscription();

  constructor(private ctcAdminService: CtcAdminService) {}

  ngoOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    if (!this.userIsCTCAdmin()) {
      window.location.href = '/learning-catalog';
    }
    this.subscription = this.ctcAdminService.currentTrainingCenter.subscribe(data => {
      this.trainingCenter = data;
    });
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

  getCtcName(): string {
    return this.trainingCenter.name;
  }
}
