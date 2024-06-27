import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  transform(fullName: string): string {
    if (!fullName) {
      return '';
    }

    const names = fullName.trim().split(' ');
    const initials = [names[0].charAt(0).toUpperCase(), names[names.length - 1].charAt(0).toUpperCase()];

    return initials.join('');
  }
}
