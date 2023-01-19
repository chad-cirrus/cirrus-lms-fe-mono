import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BadgeModule } from '@cirrus/badge';
import { NotificationTitleTypePipe } from './notification-title-type.pipe';
import { NotificationsMenuComponent } from './notifications-menu.component';

@NgModule({
  imports: [CommonModule, BadgeModule],
  declarations: [NotificationsMenuComponent, NotificationTitleTypePipe],
  exports: [NotificationsMenuComponent],
})
export class NotificationsMenuModule {}
