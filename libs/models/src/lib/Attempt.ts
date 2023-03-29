

export interface Attempt {
  attempt_type: string;
  content_id: number;
  course_attempt_id: number;
  course_id: number;
  created_at: string;
  id: number;
  instructor_name: string;
  lesson_id: number;
  failed: boolean | null;
  success: boolean;
  perfect: boolean | null;
  stage_id: number;
  standards_missed: [];
  task_id: number;
  user_id: number;
  task_name: string;
}
