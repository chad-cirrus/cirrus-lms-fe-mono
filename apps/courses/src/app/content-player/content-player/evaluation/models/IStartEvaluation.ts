import { IStartEvalAttempt } from "./IStartEvalAttempt";

/**
 * Interface for starting an evaluation (quiz or exam).
 * @interface
 */
export interface IStartEvaluation {
  /**
   * The quiz attempt information.
   * @type {IStartEvalAttempt}
   */
  evaluation_attempt: IStartEvalAttempt;
}
