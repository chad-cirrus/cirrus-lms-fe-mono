import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameToInitials'
})
export class NameToInitialsPipe implements PipeTransform {
  transform(fullName: string): any {
    if (!fullName?.trim()) return '';

    const fullNameArray = fullName.trim().split(' ');
    const firstInitial = fullNameArray[0].charAt(0).toUpperCase();
  
    if (fullNameArray.length === 1) return firstInitial;
  
    const lastInitial = fullNameArray[fullNameArray.length - 1].charAt(0).toUpperCase();
  
    return `${firstInitial}${lastInitial}`;
  }
}