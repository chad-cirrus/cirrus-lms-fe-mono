import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayInitials',
})
export class DisplayInitialsPipe implements PipeTransform {
  transform(value: string): string {
    const space = value.indexOf(' ');
    return value[0].toUpperCase() + value[space + 1].toUpperCase();
  }
}
