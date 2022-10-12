import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCourseworkType',
})
export class FormatCourseworkTypePipe implements PipeTransform {
  transform(value: string) {
    const myMap = new Map<string, string>([
      ['lesson', 'Lessons Completed'],
      ['course', 'Courses Completed'],
      ['flight_assessment', 'Flight Assessments'],
      ['ground_assessment', 'Ground Assessments'],
      ['scorm', 'Quizzes'],
    ]);

    return myMap.get(value);
  }
}
