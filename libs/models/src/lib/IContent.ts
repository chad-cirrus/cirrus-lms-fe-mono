import { IProgress } from './IProgress';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IContent {
  id: number;
  order: number;
  title: string;
  subtitle: string;
  progress: IProgress;
  score: number;
  url: string;
  meta_tags: string[];
  content_tasks: IContentTask[];
  quiz: any;
  content_type: number;
  desc: string;
  content_file: string;
  placeholder_image: string;
  jet_scoring: boolean;
  content_html: string;
  created_by: string;
  upload_image: string;
  content_filename: string;
  starter_file: string;
  blob_directory: string;
  show_comments: boolean;
}

export enum CONTENT_STATUS {
  NotStarted = 'not_started',
  InProgress = 'in_progress',
  Completed = 'completed',
  Failed = 'failed',
}

export interface IContentTask {
  id: number;
  task: ITask;
  content_id: number;
  required_successful_attempts: number;
  order: number;
  task_id: number;
  task_type: string;
}

export interface ITask {
  id: number;
  name: string;
  standards: string[];
  task_category: ITaskCategory;
  is_archived: boolean;
  task_type: string;
  required_successful_attempts: number;
  passed_count: number;
  missed_count: number;
  status: string;
  task_attempts: [];
}

export interface ITaskCategory {
  id: number;
  name: string;
  desc: string;
  created_at: string;
  updated_at: string;
}
export interface IAssessment {
  assessment_progress: object;
  assessment_tasks: IAssessmentTasks;
  overview: object;
}
export interface IAssessmentTasks {
  tasklist: ITask[]
}




