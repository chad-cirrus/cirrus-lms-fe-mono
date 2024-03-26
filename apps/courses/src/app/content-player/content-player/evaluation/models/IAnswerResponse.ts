import { IEvalAttemptQuestion } from "./IEvalAttemptQuestion";

/**
 * Interface for a quiz attempt response returned from the api.
 * @interface
 */
export interface IAnswerResponse {
  quiz_attempt_question: IEvalAttemptQuestion;
}

