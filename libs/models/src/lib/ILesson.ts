/* eslint-disable @typescript-eslint/no-explicit-any */
import { ASSESSMENT_TYPE } from '..';
import { IContent } from './IContent';

export interface ILesson {
  id: number;
  system_desc: string;
  created_at: string;
  updated_at: string;
  system_name: string;
  lesson_type: number;
  order: any;
  title: string;
  overview: string;
  is_archived: boolean;
  contents_are_linear: boolean;
  is_preview: boolean;
  major_version: number;
  minor_version: number;
  contents: IContent[];
  lesson_progress: LessonProgress;
  self_study_progress: LessonProgress;
  assessment_progress: LessonProgress;
  assessment: ASSESSMENT_TYPE;
  self_study: boolean;
  overview_image_url: string;
  student_intro_video: string;
  instructor_intro_video: string;
  estimated_time: string;
}

export enum LessonProgress {
  Unknown,
  NotStarted,
  InProgress,
  Complete,
  NotRequired,
}
