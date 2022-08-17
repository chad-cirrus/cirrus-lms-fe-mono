import { ProgressStat } from './ILesson';
import { IProgress } from './IProgress';

export interface ICourseOveview {
  id: number;
  name: string;
  major_version: number;
  minor_version: number;
  title: string;
  subtitle: string;
  has_agreement: boolean;
  agreement_body: string;
  completion_time?: Date;
  minimum_flight_hours: number;
  desktop_hero_image_url: string;
  mobile_hero_image_url: string;
  can_reenroll: boolean;
  lessons_stats: ILessonsstats;
  progress_stats: ProgressStat[];
  stages: ICourseOverviewStage[];
  progress: IProgress;
}

export interface ICourseOverviewStage {
  id: number;
  title: string;
  overview: string;
  order: number;
  lessons_are_linear: boolean;
  lessons: ICourseOverviewLesson[];
  progress: IProgress;
}

export interface ICourseOverviewLesson {
  id: number;
  title: string;
  order: number;
  index: string;
  thumbnail_image_url: string;
  lesson_type: number;
  completion_time?: Date;
  content_counts: Contentcounts;
  progress: IProgress;
}

interface Contentcounts {
  documents?: number;
  videos?: number;
  assessments?: number;
}

export interface ILessonsstats {
  completed: number;
  total: number;
}
