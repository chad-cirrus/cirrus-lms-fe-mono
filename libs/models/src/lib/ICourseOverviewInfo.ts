export interface ICourseOverviewInfo {
  id: number;
  name: string;
  major_version: number;
  minor_version: number;
  completion_time?: string;
  minimum_flight_hours?: string;
  course_summary_counts: CourseSummaryCounts;
  agreement_body: string;
  overview: string;
  course_progress_stats: Courseprogressstats;
}

export interface Courseprogressstats {
  self_study: Selfstudy[];
  flight: Flight[];
  ground: Flight[];
  landings: Selfstudy[];
  assessment: Selfstudy[];
}

export interface Flight {
  type: string;
  completed: number;
  total: number | string;
  status: string;
}

export interface Selfstudy {
  type: string;
  completed: number;
  total: number;
  status: string;
}

export interface CourseSummaryCounts {
  lessons: number;
  videos: number;
  documents: number;
  assessments: number;
  quizzes: number;
}
