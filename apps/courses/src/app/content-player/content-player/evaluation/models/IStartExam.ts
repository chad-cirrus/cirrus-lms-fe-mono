import { IStartEvalAttempt } from "./IStartEvalAttempt";

/**
 * Interface for starting an evaluation (exam).
 * @interface
 */
export interface IStartExam {
  /**
   * The quiz attempt information.
   * @type {IStartEvalAttempt}
   */
  exam_attempt: IStartEvalAttempt;
}
