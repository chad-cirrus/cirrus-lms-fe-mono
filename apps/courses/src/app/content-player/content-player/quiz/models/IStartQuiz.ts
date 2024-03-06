import { IStartQuizAttempt } from "./IStartQuizAttempt";

/**
 * Interface for starting a quiz.
 * @interface
 */
export interface IStartQuiz {
  /**
   * The quiz attempt information.
   * @type {IStartQuizAttempt}
   */
  quiz_attempt: IStartQuizAttempt;
}
