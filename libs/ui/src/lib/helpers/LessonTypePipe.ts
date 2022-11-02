import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'lessonTypePipe' })
export class LessonTypePipe implements PipeTransform {
  transform(lessonType: number): string {
    const dictionary: { [key: number]: string } = {
      [0]: 'Self Study',
      [1]: 'Ground',
      [2]: 'Flight',
      [3]: 'Simulator',
    };

    return dictionary[lessonType];
  }
}
