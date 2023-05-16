export interface ICoursesForRecentActivity {
  id: number;
  percent_complete: number;
  lessons_completed: number;
  lessons_total: number;
  name: string;
  title: string;
  status: string;
  thumbnail_image_url: string | null;
  next_lesson: {
    stage_id: number;
    lesson_id: number;
  } | null;
}
