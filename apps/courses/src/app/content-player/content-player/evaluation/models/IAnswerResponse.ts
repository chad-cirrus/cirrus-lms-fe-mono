import { IEvalAttemptQuestion } from "./IEvalAttemptQuestion";

/**
 * Interface for a quiz attempt response returned from the api.
 * @interface
 */
export interface IAnswerResponse {
  evaluation_attempt_question: IEvalAttemptQuestion;
}

