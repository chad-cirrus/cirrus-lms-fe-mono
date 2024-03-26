import { IQuestionOption } from "./IQuestionOption";

/**
 * Interface for a quiz question.
 * @interface
 */
export interface IEvalQuestion {
  /**
   * The ID of the quiz question.
   * @type {number}
   */
  id: number;

  /**
   * The body of the quiz question.
   * @type {string}
   */
  body: string;

  /**
   * The description of the quiz question.
   * @type {string}
   */
  desc: string;

  /**
   * The correct option for the quiz question.
   * @type {IQuestionOption}
   */
  correct_option: IQuestionOption;
}
