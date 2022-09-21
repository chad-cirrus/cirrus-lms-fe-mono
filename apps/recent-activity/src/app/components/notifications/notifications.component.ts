import { Component, Input, OnInit } from '@angular/core';
import { INotification } from '../../models/Notification';

@Component({
  selector: 'cirrus-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  @Input() notifications: INotification[] = [];

  ngOnInit(): void {
    console.log(this.notifications);
  }
}
