import { IQuizQuestion } from "./IQuizQuestion";

/**
 * Interface for a quiz attempt response.
 * @interface
 */
export interface IQuizAttemptResponse {
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
   * @type {IQuizQuestion}
   */
  quiz_question?: IQuizQuestion;
}
