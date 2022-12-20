import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INotification } from '@cirrus/models';

@Component({
  selector: 'cirrus-notifications-section',
  templateUrl: './notifications-section.component.html',
  styleUrls: ['./notifications-section.component.scss'],
})
export class NotificationsSectionComponent {
  bellUrl = 'recent-activity/images/svg/Bell.svg';
  @Input() notifications: INotification[] = [];
  @Output() viewAllNotifications = new EventEmitter();

  emitViewAllNotifications() {
    this.viewAllNotifications.emit();
  }
}
