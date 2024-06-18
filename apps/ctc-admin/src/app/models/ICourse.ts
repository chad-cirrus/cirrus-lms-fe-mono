import { ICourseCategory } from "./ICourseCategory";

/**
 * Represents a course.
 */
export interface ICourse {
  /**
   * The ID of the course.
   */
  id: number;

  /**
   * The name of the course.
   */
  name: string;

  /**
   * The description of the course.
   */
  desc: string;

  /**
   * The list price of the course.
   */
  list_price: number | null;

  /**
   * The categories associated with the course.
   */
  course_categories: ICourseCategory[];
}
