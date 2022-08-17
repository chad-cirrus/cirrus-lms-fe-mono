import { PROGRESS_STATUS } from './PROGRESS_STATUS';

export interface IEnrollmentHistory {
  id: number;
  course_version: string;
  enrollment_date: string;
  transcript_available: boolean;
  progress: {
    id: number;
    status: PROGRESS_STATUS.completed | PROGRESS_STATUS.in_progress;
  };
  user_certificate: {
    id: number;
    expires_on: string | null;
  } | null;
}
