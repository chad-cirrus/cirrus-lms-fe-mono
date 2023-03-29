import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFilter',
})
export class FormatFilterPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    if (value.indexOf('_') === -1) return value;
    return value.replace('_', ' ');
  }
}
