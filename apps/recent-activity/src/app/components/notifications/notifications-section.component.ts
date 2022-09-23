import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INotification } from '../../models/Notification';

@Component({
  selector: 'cirrus-notifications-section',
  templateUrl: './notifications-section.component.html',
  styleUrls: ['./notifications-section.component.scss'],
})
export class NotificationsSectionComponent implements OnInit {
  bellUrl = 'images/svg/Bell.svg';
  @Input() notifications: INotification[] = [];
  @Output() viewAllNotifications = new EventEmitter();

  ngOnInit(): void {
    console.log(this.notifications);
  }

  emitViewAllNotifications() {
    console.log('view all notifications');
    this.viewAllNotifications.emit();
  }
}
