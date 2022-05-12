/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IContent {
  id: number;
  order: number;
  title: string;
  subtitle: string;
  status: string;
  score: number;
  url: string;
  meta_tags: string[];
  content_tasks: any[];
  estimated_time: string;
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
  created_at: string;
  updated_at: string;
  link_id: string;
  version: number;
  quiz: any;
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
}

export interface ITaskCategory {
  id: number;
  name: string;
  desc: string;
  created_at: string;
  updated_at: string;
}



