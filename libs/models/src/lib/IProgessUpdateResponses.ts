import { ProgressStat } from './ILesson';

export interface IProgressUpdateResponses {
  progresses: IProgressUpdateResponse[];
  progress_stats: ProgressStat[];
}

export interface IProgressUpdateResponse {
  id: number;
  progressable_type: string;
  course_attempt_id: number;
  stage_id?: number;
  lesson_id?: number;
  item_id: number;
  status: string;
  user_id: number;
  course_id: number;
  progress_type: string;
  score?: any;
  created_at: string;
  updated_at: string;
  scorm_progress?: any;
  is_force_completed?: any;
  ios_uuid?: any;
}
