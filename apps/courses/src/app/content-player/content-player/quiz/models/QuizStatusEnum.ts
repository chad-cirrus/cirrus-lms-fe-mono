/**
 * Represents the status of a quiz.
 */
export enum QuizStatusEnum {
  NotStarted = "not started",
  /**
   * The quiz has been started, but not all questions have been answered.
   * */
  InProgress = "in progress",

  TimedOut = "timed out",
  /**
   * The quiz has been completed, all questions have been answered.
   */
  Complete = "complete",
  /**
   * The quiz has been submitted, but not all questions have been answered.
   */
  Submitted = "submitted",
}
