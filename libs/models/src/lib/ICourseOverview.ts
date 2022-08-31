import { ProgressStat } from './ILesson';
import { IProgress } from './IProgress';
import { IEnrollmentHistory } from './IEnrollmentHistory';

export interface ICourseOveview {
  id: number;
  name: string;
  major_version: number;
  minor_version: number;
  title: string;
  subtitle: string;
  has_agreement: boolean;
  certificate: ICertificate;
  agreement_body: string;
  overview?: string;
  completion_time?: string;
  minimum_flight_hours: number;
  desktop_hero_image_url: string;
  mobile_hero_image_url: string;
  can_reenroll: boolean;
  lessons_stats: ILessonsstats;
  progress_stats: ProgressStat[];
  summary_counts: ContentCounts;
  stages: ICourseOverviewStage[];
  progress: IProgress;
  enrollments: IEnrollmentHistory[];
  next_lesson: Partial<ICourseOverviewLesson>;
}

export interface ICourseOverviewStage {
  id: number;
  title: string;
  desc?: string;
  overview: string;
  order: number;
  lessons_are_linear: boolean;
  lessons: ICourseOverviewLesson[];
  progress: IProgress;
}

export interface ICertificate {
  expiration: string | null;
}

export interface ICourseOverviewLesson {
  id: number;
  title: string;
  subtitle?: string;
  order: number;
  index: string;
  thumbnail_image_url: string;
  lesson_type: number;
  completion_time?: string;
  content_counts: ContentCounts;
  progress: IProgress;
}

export interface ContentCounts {
  lessons?: number;
  assessments?: number;
  videos?: number;
  quizzes?: number;
  documents?: number;
}

export interface ILessonsstats {
  completed: number;
  total: number;
}

export interface IEnrollment {
  id: number;
  course_version: string;
  enrollment_date: string;
  transcript_available: boolean;
  progress: IProgress;
  user_certificate?: UserCertificate | null;
}

export interface UserCertificate {
  id: number;
  expires_on: string;
}
