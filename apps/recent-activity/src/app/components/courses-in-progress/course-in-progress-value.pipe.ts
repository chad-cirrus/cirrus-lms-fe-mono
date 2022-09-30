import { Pipe, PipeTransform } from '@angular/core';
import { InProgressCourses } from '../../models/IRecentActivity';

@Pipe({
  name: 'courseInProgressValue',
})
export class CourseInProgressValuePipe implements PipeTransform {
  transform(value: InProgressCourses): number {
    const { lessons_total, lessons_completed } = value;
    const returnValue = Math.round((lessons_completed / lessons_total) * 100);
    return returnValue;
  }
}
