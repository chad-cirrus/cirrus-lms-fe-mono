import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INotification } from '@cirrus/models';
import { ConnectionsService } from '../../lib-services/connections/connections.service';

@Component({
  selector: 'cirrus-notifications-menu',
  templateUrl: './notifications-menu.component.html',
  styleUrls: ['./notifications-menu.component.scss'],
})
export class NotificationsMenuComponent {
  @Input() notifications: INotification[] = [];
  @Output() dismissMenu = new EventEmitter<any>();
  @Output() acceptInvitationEmit = new EventEmitter<INotification>();
  @Output() declineInvitationEmit = new EventEmitter<INotification>();
  @Output() clearNotficationsEmit = new EventEmitter<INotification[]>();
  @Output() deleteNotificationEmit = new EventEmitter<number>();

  constructor(private connectionsService: ConnectionsService) {}

  dismiss() {
    this.dismissMenu.emit();
  }

  declineInvitation(notification: INotification) {
    this.declineInvitationEmit.emit(notification);
  }

  acceptInvitation(notification: INotification) {
    this.acceptInvitationEmit.emit(notification);
  }

  clearNotifications() {
    this.clearNotficationsEmit.emit(this.notifications);
  }

  deleteNotification(id: number) {
    this.deleteNotificationEmit.emit(id);
  }

  get formatBadge() {
    if (this.notifications.length) {
      return this.notifications.length > 99 ? '99+' : this.notifications.length;
    }
    return '';
  }
}
