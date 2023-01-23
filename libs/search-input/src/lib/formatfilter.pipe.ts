import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFilter',
})
export class FormatFilterPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('_', ' ');
  }
}
