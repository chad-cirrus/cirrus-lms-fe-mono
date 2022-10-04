import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationTitleTypePipe } from '../notification-title-type.pipe';
import { NotificationsMenuComponent } from './notifications-menu/notifications-menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NotificationsMenuComponent, NotificationTitleTypePipe],
  exports: [NotificationsMenuComponent],
})
export class NotificationsMenuModule {}
