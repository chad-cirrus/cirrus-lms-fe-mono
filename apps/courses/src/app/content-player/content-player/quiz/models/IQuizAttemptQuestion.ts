import { IQuestionOption } from "./IQuestionOption";

/**
 * Represents a quiz attempt question.
 */
export interface IQuizAttemptQuestion {
  /**
   * The ID of the quiz attempt question.
   * @type {number}
   */
  id: number;

  /**
   * The description of the quiz attempt question.
   * @type {string | undefined}
   */
  desc?: string;

  /**
   * The ID of the quiz attempt.
   * @type {number}
   */
  quiz_attempt_id: number;

  /**
   * The ID of the question.
   * @type {number}
   */
  quiz_question_id: number;

  /**
   * The ID of the question option.
   * @type {number}
   */
  question_option_id: number;

  /**
   * The ID of the correct question option.
   * @type {number}
   */
  correct_option_id: number;

  /**
   * Indicates whether the answer is correct.
   * @type {boolean}
   */
  correct: boolean;

  /**
   * The body of the quiz attempt question.
   * @type {string}
   */
  body: string;

  /**
   * The options available for the quiz attempt question.
   * @type {IQuestionOption[]}
   */
  options: IQuestionOption[];

  /**
   * The URL of the image associated with the question.
   * @type {string}
   */
  image_url: string;

  /**
   * The title of the image associated with the question.
   * @type {string}
   */
  image_title: string;

  /**
   * The date and time when the question was responded to.
   * @type {string | null}
   */
  responded_at: string | null;

  /**
   * The date and time when the question record was created for this quiz attempt.
   * @type {string | undefined}
   */
  created_at?: string;
}
