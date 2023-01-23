import { ICoursesForRecentActivity } from '@cirrus/models';

export interface LogbookStat {
  type: string;
  completed: [];
}

export interface CourseWorkStat {
  type: string;
  completed: boolean;
}

export interface IacraStat {
  type: string;
  completed: boolean;
}

export interface OverallProgress {
  logbook_stats: LogbookStat[];
  course_work_stats: CourseWorkStat[];
  iacra_stats: IacraStat[];
}

export interface Certificate {
  course_name: string;
  course_attempt_id: number;
  id: number;
  enrollment_date: string;
}

export interface Badge {
  course_name: string;
  badge_image: string;
  achieved_on: string | null;
}

export interface Achievements {
  certificates: Certificate[];
  badges: Badge[];
}

export interface IRecentActivity {
  overall_progress: OverallProgress;
  achievements: Achievements;
  courses: ICoursesForRecentActivity[];
}

export const initialRecentActivity: IRecentActivity = {
  overall_progress: {
    logbook_stats: [],
    course_work_stats: [],
    iacra_stats: [],
  },
  courses: [],
  achievements: {
    certificates: [],
    badges: [],
  },
};
