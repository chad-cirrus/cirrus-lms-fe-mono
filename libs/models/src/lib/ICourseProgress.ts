import { ProgressType } from '..';

export interface ICourseProgress {
  type: ProgressType;
  completedCourses: number;
  totalCourses?: number;
}
