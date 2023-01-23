import { Pipe, PipeTransform } from '@angular/core';
import { ICoursesForRecentActivity } from '@cirrus/models';

@Pipe({
  name: 'courseInProgressValue',
})
export class CourseInProgressValuePipe implements PipeTransform {
  transform(value: ICoursesForRecentActivity): number {
    const { lessons_total, lessons_completed } = value;
    const returnValue = Math.round((lessons_completed / lessons_total) * 100);
    return returnValue;
  }
}
