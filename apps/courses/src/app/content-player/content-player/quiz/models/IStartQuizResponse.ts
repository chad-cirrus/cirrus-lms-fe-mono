import { IQuizAttempt } from "./IQuizAttempt";

/**
 * Interface for the response of starting a quiz returned from the api.
 * @interface
 */
export interface IStartQuizResponse {
  /**
   * The quiz attempt information.
   * @type {IQuizAttempt}
   */
  quiz_attempt: IQuizAttempt;
}
