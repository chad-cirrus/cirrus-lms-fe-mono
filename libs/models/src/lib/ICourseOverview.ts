import { IProgress } from './IProgress';
import { IEnrollmentHistory } from './IEnrollmentHistory';
import { IHoursAndLandingsStat } from './IHoursAndLandingsStats';
import { IContent } from './IContent';

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
  certificate_stats: ICertificatestats;
  summary_counts: ContentCounts;
  stages: ICourseOverviewStage[];
  progress: IProgress;
  enrollments?: IEnrollmentHistory[];
  next_lesson: Partial<ICourseOverviewLesson>;
  badge: IBadge;
  course_overview_video?: IContent;
  sales_desc?: string;
  awarded_certificates?: ICertificate[];
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

/**
 * Represents a certificate.
 */
export interface ICertificate {
  /**
   * Certificate ID.
   */
  id?: number;
  /**
   * Explanation of the certificate expiration.
   */
  expiration: string | null;
  /**
   * Certificate type: stage, course, or other.
   */
  certifiable_type?: string;
  /**
   * Name of the certificate.
   */
  certifiable_name?: string;
  /**
   * Date the certificate was issued.
   */
  certified_on?: string;
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
  student_intro_video?: any;
  contents?: IContent[];
}

export interface ContentCounts {
  lessons?: number;
  assessments?: number;
  videos?: number;
  quizzes?: number;
  documents?: number;
}

export interface ICertificatestats {
  completed: number;
  total: number;
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

export const isCourseFree = (course: ICourseOverview) => {
  return course.list_price === undefined || course.list_price < 1;
};
