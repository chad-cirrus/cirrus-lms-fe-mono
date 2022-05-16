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
  student_intro_video: string;
  instructor_intro_video: string;
  instructor_contents: IContent[];
  progress: IProgress;
  course_id: number;
  course_attempt_id: number;
  stage_id: number;
}

export enum LessonProgress {
  Unknown,
  NotStarted,
  InProgress,
  Complete,
  NotRequired,
}
