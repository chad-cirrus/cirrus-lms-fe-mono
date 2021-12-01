import { ProgressType } from '..';

export interface IProgress {
  type: ProgressType;
  completedCourses: number;
  totalCourses: number;
}
