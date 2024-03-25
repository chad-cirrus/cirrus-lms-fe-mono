import { IEvalQuestion } from "./IEvalQuestion";

/**
 * Interface for a quiz attempt response.
 * @interface
 */
export interface IEvalAttemptResponse {
  /**
   * The ID of the quiz attempt response.
   * @type {number}
   */
  id: number;

  /**
   * The ID of the quiz attempt.
   * @type {number}
   */
  quiz_attempt_id: number;

  /**
   * The ID of the question option.
   * @type {number}
   */
  question_option_id: number;

  /**
   * Indicates whether the answer is correct.
   * @type {boolean}
   */
  correct: boolean;

  /**
   * The quiz question related to the response.
   * @type {IEvalQuestion}
   */
  quiz_question?: IEvalQuestion;
}
