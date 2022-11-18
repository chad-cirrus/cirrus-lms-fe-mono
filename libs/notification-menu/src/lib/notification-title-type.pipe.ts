import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationTitleType',
})
export class NotificationTitleTypePipe implements PipeTransform {
  transform(value: string, ...args: any): string {
    if (value.includes('invite')) {
      return `Pending Connection: ${args[0].sender.contact.name}`;
    }
    return '';
  }
}
