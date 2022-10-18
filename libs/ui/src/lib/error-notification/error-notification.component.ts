import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cirrus-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss'],
})
export class ErrorNotificationComponent {
  @Output() emitClose = new EventEmitter<any>();
  @Input() calledFromWhatMfe!: string;

  close() {
    this.emitClose.emit();
  }
}
