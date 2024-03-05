import { IQuizAttemptQuestion } from "./IQuizAttemptQuestion";

/**
 * Interface for a quiz attempt.
 * @interface
 */
export interface IQuizAttempt {
  /**
   * The ID of the quiz attempt.
   * @type {number}
   */
  id: number;

  /**
   * The ID of the course attempt.
   * @type {number}
   */
  course_attempt_id: number;

  /**
   * The ID of the stage.
   * @type {number}
   */
  stage_id: number;

  /**
   * The ID of the lesson.
   * @type {number}
   */
  lesson_id: number;

  /**
   * The ID of the content.
   * @type {number}
   */
  content_id: number;

  /**
   * The ID of the quiz.
   * @type {number}
   */
  quiz_id: number;

  /**
   * The snapshot of the quiz attempt.
   * @type {string}
   */
  snapshot: string;

  /**
   * The score of the quiz attempt.
   * @type {number}
   */
  score: number;

  /**
   * The creation date and time of the quiz attempt.
   * @type {string}
   */
  created_at: string;

  /**
   * The last update date and time of the quiz attempt.
   * @type {string}
   */
  updated_at: string;

  /**
   * The grading date and time of the quiz attempt.
   * @type {string}
   */
  graded_at: string;

  /**
   * The array of quiz_attempt_questions of the quiz attempt.
   * @type {Array}
   */
  quiz_attempt_questions: IQuizAttemptQuestion[];
}
