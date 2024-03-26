import { IQuestionOption } from "./IQuestionOption";
import { IEvalAttemptResponse } from "./IEvalAttemptResponse";

/**
 * Interface for a question.
 * @interface
 */
export interface IQuestion {
  /**
   * The ID of the question.
   * @type {number}
   */
  id: number;

  /**
   * The body of the question.
   * @type {string}
   */
  body: string;

  /**
   * The description of the question.
   * @type {string}
   */
  desc: string;

  /**
   * The options for the question.
   * @type {IQuestionOption[]}
   */
  question_options: IQuestionOption[];

  /**
   * The correct option for the question.
   * @type {IQuestionOption}
   */
  correct_option: IQuestionOption;

  quiz_attempt_question?: IEvalAttemptResponse;

  /**
   * Image URL for the uploded quiz question image
   * @type {string}
   */
  image_url: string;

  /**
   * The image Title for the uploaded quiz question image
   * @type {string}
   */
  image_title: string;
}
