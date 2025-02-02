/**
 * Interface for starting a exam attempt sent to the api.
 * @interface
 */
export interface IStartExamAttempt {
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
  exam_id: number;
}
