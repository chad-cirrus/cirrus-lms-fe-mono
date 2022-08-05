import { IProgress } from './IProgress';

export interface ICourseOverviewLessons {
  id: number;
  progress: IProgress;
  name: string;
  stages: Stage[];
}

export interface Stage {
  id: number;
  order: number;
  title: string;
  progress: IProgress;
  lessons: CourseOverviewLesson[];
  overview?: string;
}

export interface CourseOverviewLesson {
  id: number;
  title: string;
  order: number;
  progress: IProgress;
  stage_lesson_index: string;
  thumbnail_image_url?: string;
  lesson_type: number;
  completion_time?: Date;
  content_counts: ContentCounts;
  description?: string;
}

export interface ContentCounts {
  documents?: number;
  videos?: number;
  assessments?: number;
  quizzes?: number;
}
