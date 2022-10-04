import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INotification, NotificationType } from '@cirrus/models';
import { BehaviorSubject } from 'rxjs';
import { NotificationTitleTypePipe } from '../../notification-title-type.pipe';

@Component({
  selector: 'cirrus-notifications-menu',
  templateUrl: './notifications-menu.component.html',
  styleUrls: ['./notifications-menu.component.scss'],
})
export class NotificationsMenuComponent {
  @Input() notifications: INotification[] = [];
  @Output() dismissMenu = new EventEmitter<any>();

  dismiss() {
    this.dismissMenu.emit();
  }
}
