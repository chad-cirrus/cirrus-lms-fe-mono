import { IEvalAttempt } from "./IEvalAttempt";

/**
 * Interface for the response of starting a quiz returned from the api.
 * @interface
 */
export interface IStartEvalResponse {
  /**
   * The quiz attempt information.
   * @type {IEvalAttempt}
   */
  evaluation_attempt: IEvalAttempt;
}
