import { IEvalAttempt } from "./IEvalAttempt";
import { IEvalAttemptQuestion } from "./IEvalAttemptQuestion";

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
export interface IEvalRequest {
  /**
   * Unique eval identifier
   * @type {number}
   * @memberof IEvalRequest
   */
  id: number;
  /**
   * Name of the quiz
   * @type {string}
   * @memberof IEvalRequest
   */
  name: string;
  /**
   * Quiz detailed description
   * @type {string}
   * @memberof IEvalRequest
   */
  desc: string;
  /**
   * Questions for this quiz
   * @type {IQuestion[]}
   * @memberof IEvalRequest
   */
  quiz_questions: IEvalAttemptQuestion[];
  /**
   * Subjects for this quiz
   * @type {string[]}
   * @memberof IEvalRequest
   */
  subjects?: string[];
  /**
   * Percentage of correct answers needed to pass this evaluation (quiz or exam)
   * @type {number}
   * @memberof IEvalRequest
   */
  pass_percentage: number;
  /**
   * Estimated duration of this evaluation in minutes
   * @type {number}
   * @memberof IEvalRequest
   */
  approximate_duration: number;

  /**
   * The quiz attempt information.
   * @type {IEvalAttempt}
   */
  quiz_attempt?: IEvalAttempt;

  /**
   * The time limit the student has to take the evaluation(quiz or exam).
   * @type {number}
   */
  time_limit_in_minutes?: number | 0;

  /**
   * The count of questions in this evaluation.
   * @type {number}
   */
  quiz_question_count?: number;
}
