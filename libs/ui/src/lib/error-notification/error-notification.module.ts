import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorNotificationComponent } from './error-notification.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ErrorNotificationComponent],
  exports: [ErrorNotificationComponent],
})
export class ErrorNotificationModule {}
