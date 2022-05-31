/* eslint-disable @typescript-eslint/no-explicit-any */
import { IContent } from './IContent';
import { IProgress } from './IProgress';

export interface ILesson {
  id: number;
  system_name: string;
  lesson_type: number;
  order: number;
  title: string;
  system_desc: string;
  overview: string;
  is_archived: boolean;
  is_preview: boolean;
  instructor_overview: string;
  contents_are_linear: boolean;
  major_version: number;
  minor_version: number;
  updated_at: string;
  contents: IContent[];
  overview_image_url: string;
  student_intro_video: StudentIntroVideo;
  instructor_intro_video?: InstructorIntroVideo;
  instructor_contents: IContent[];
  progress: IProgress;
  course_id: number;
  course_attempt_id: number;
  stage_id: number;
  lesson_stats: LessonStats
}


export interface LessonStats {
  content_completed: number;
  content_total: number;
  ground_hours_completed :number;
  flight_hours_completed: number;
  landings_completed: number;
  assessmennt_tasks_total: number;
  assessment_tasks_completed: number;
}

export interface StudentIntroVideo {
  content: IContent;
  content_id: number;
  created_at: string;
  hidden: boolean;
  required: boolean;
  id: number;
  title: string;
  updated_at: string;
}

export interface InstructorIntroVideo {
  content_id: number;
  created_at: string;
  hidden: boolean;
  required: boolean;
  id: number;
  title: string;
  updated_at: string;
}

export enum LessonProgress {
  Unknown,
  NotStarted,
  InProgress,
  Complete,
  NotRequired,
}
