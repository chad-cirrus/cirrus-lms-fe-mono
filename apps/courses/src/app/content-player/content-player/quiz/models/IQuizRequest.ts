import { IQuizAttempt } from "./IQuizAttempt";
import { IQuizAttemptQuestion } from "./IQuizAttemptQuestion";

/**
 * Interface representing the quiz object returned from the api
 * endpoint api/v4/quizzes/{quiz id}?course_attempt_id={course attempt id}

 * @export
 * @interface IQuizRequest
 *
 * @property {number} id - The id of the quiz request
 * @property {string} name - The name of the quiz request
 * @property {string} desc - The description of the quiz request
 * @property {IQuestion[]} quiz_questions - An array of questions for the quiz request
 * @property {string[]} [subjects] - An optional array of subjects for the quiz request
 */
export interface IQuizRequest {
  /**
   * Unique quiz identifier
   * @type {number}
   * @memberof IQuizRequest
   */
  id: number;
  /**
   * Name of the quiz
   * @type {string}
   * @memberof IQuizRequest
   */
  name: string;
  /**
   * Quiz detailed description
   * @type {string}
   * @memberof IQuizRequest
   */
  desc: string;
  /**
   * Questions for this quiz
   * @type {IQuestion[]}
   * @memberof IQuizRequest
   */
  quiz_questions: IQuizAttemptQuestion[];
  /**
   * Subjects for this quiz
   * @type {string[]}
   * @memberof IQuizRequest
   */
  subjects?: string[];
  /**
   * Percentage of correct answers needed to pass this quiz
   * @type {number}
   * @memberof IQuizRequest
   */
  pass_percentage: number;
  /**
   * Estimated duration of this quiz in minutes
   * @type {number}
   * @memberof IQuizRequest
   */
  approximate_duration: number;

  /**
   * The quiz attempt information.
   * @type {IQuizAttempt}
   */
  quiz_attempt?: IQuizAttempt;

  /**
   * The time limit the student has to take the quiz.
   * @type {number}
   */
  time_limit_in_minutes?: number | 0;

  /**
   * The count of questions in this quiz.
   * @type {number}
   */
  quiz_question_count?: number;
}
