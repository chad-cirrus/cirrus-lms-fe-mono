import { IProgress } from './IProgress';
import { IEnrollmentHistory } from './IEnrollmentHistory';
import { IHoursAndLandingsStat } from './IHoursAndLandingsStats';

export interface ICourseOverview {
  id: number;
  name: string;
  major_version: number;
  minor_version: number;
  title: string;
  subtitle: string;
  has_agreement: boolean;
  certificate: ICertificate;
  completed_at: string;
  course_content_stats: ICourseContentStat[];
  agreement_body: string;
  started_at: string;
  overview?: string;
  list_price?: number;
  completion_time?: string;
  course_attempt: { id: number; user_course: UserCourse };
  minimum_flight_hours: number;
  desktop_hero_image_url: string;
  mobile_hero_image_url: string;
  thumbnail_image_url: string;
  can_reenroll: boolean;
  hours_and_landings_stats: IHoursAndLandingsStat[];
  lessons_stats: ILessonsstats;
  summary_counts: ContentCounts;
  stages: ICourseOverviewStage[];
  progress: IProgress;
  enrollments?: IEnrollmentHistory[];
  next_lesson: Partial<ICourseOverviewLesson>;
  badge: IBadge;
}

export interface UserCourse {
  accepted_agreement?: boolean;
  accepted_agreement_at?: string;
  id: number;
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

export interface IBadge {
  id: number;
  name: string;
  desc: string;
  badge_image: string;
  progress: number;
  isActive: boolean;
}

export interface ICertificate {
  id?: number;
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
  stage_id: number;
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

export interface ICourseContentStat {
  type: string;
  completed: number;
  total: number;
}
