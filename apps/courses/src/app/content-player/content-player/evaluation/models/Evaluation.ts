import { IAnswerResponse } from './IAnswerResponse';
import { IEvalAttempt } from './IEvalAttempt';
import { IEvalAttemptQuestion } from './IEvalAttemptQuestion';
import { IEvalRequest } from './IEvalRequest';
import { IStartEvalResponse } from './IStartEvalResponse';
import { EvaluationGradeEnum } from './EvaluationGradeEnum';
import { EvaluationStatusEnum } from './EvaluationStatusEnum';
import { CONTENT_TYPE, IContent } from '@cirrus/models';

export class EvaluationClass {
  id = -1;
  status = EvaluationStatusEnum.NotStarted;
  grade = EvaluationGradeEnum.NotGraded;
  currentQuestionIndex = -1;
  questionCount = -1;
  evaluationType = CONTENT_TYPE.quiz;

  /**
   * The questions for this evaluation
   * @type {IEvalAttemptQuestion[]}
   * @memberof EvaluationClass
   * @default []
   * */
  questions: IEvalAttemptQuestion[] = [];

  /**
   * Aproximately how long this evaluation will take in minutes
   *
   * @type {number}
   * @memberof EvaluationClass
   * @default 0
   * */
  approximateDuration = 0;

  /**
   * The evaluation attempt information.
   * @type {IEvalAttempt}
   * */
  attempt: IEvalAttempt | undefined;

  /**
   * The time limit for this evaluation in minutes
   */
  timeLimit = 0;

  /**
   * The time elapsed in seconds for a timed evaluation once started
   */
  elapsedSeconds = -1;

  /**
   * The ID of the selected option for the current question
   */
  selectedOptionId = -1;

  currentAttemptCount = -1;

  passPercentage = -1;

  loadFromContent(content: IContent): void {
    const _object: IEvalRequest = content.evaluation as IEvalRequest;
    this.id = _object.id;
    this.questionCount = _object.number_of_questions != undefined ? _object.number_of_questions : -1;
    this.approximateDuration = _object.approximate_duration;

  }

  /** Loads the evaluation from the api on initialization. *
   * @returns void
   * */
  loadEvaluation(_request: IEvalRequest): void {
    this.id = _request.id;
    this.passPercentage = _request.pass_percentage;
    this.questionCount = _request.number_of_questions || 0;

    if (_request.approximate_duration) {
      this.approximateDuration = _request.approximate_duration;
    }
    if (_request.time_limit_in_minutes) {
      this.timeLimit = _request.time_limit_in_minutes;
    }
    if (_request.quiz_questions) {
      this.questions = _request.quiz_questions;
      this.questionCount = _request.quiz_questions.length;
    }
    if (_request.evaluation_attempt !== null && _request.evaluation_attempt !== undefined) {
      this.attempt = _request.evaluation_attempt;
      if (this.attempt.evaluation_attempt_questions) {
        this.questions = this.attempt.evaluation_attempt_questions;
      }
      if (this.attempt.score !== null && this.attempt.score !== undefined) {
        this.endEvaluation(this.attempt);
      }
    }
  }

  /**
   * Checks if the evaluation has a time limit.
   * @returns {boolean} True if the evaluation has a time limit, false otherwise.
   */
  isEvaluationTimed(): boolean {
    return this.timeLimit > 0;
  }

  hasAttempts(): boolean {
    return this.attempt !== undefined;
  }

  /**
   * Increments the time elapsed for the evaluation.
   * If the evaluation is not already in progress, it sets the status to evaluationStatusEnum.InProgress.
   * If the elapsed time exceeds the time limit, it sets the status to evaluationStatusEnum.TimedOut.
   */
  incrementTimeElapsed(): void {
    this.elapsedSeconds++;
    if (this.elapsedSeconds >= this.timeLimit * 60) {
      this.status = EvaluationStatusEnum.TimedOut;
    }
  }

  /**
   * Starts the evaluation with the provided response.
   * @param response - The response containing the evaluation attempt information.
   */
  startEvaluation(response: IStartEvalResponse): void {
    this.status = EvaluationStatusEnum.InProgress;
    this.attempt = response.evaluation_attempt;
    this.currentQuestionIndex = 0;
    this.questions = (this.attempt?.evaluation_attempt_questions as IEvalAttemptQuestion[]) || [];
    this.questionCount = this.questions.length;

    this.elapsedSeconds = 0;
  }

  /**
   * Calculates and returns the time remaining for the student to take the evaluation.
   * The time is returned as a string in the format "mm:ss".
   * @returns {string} The elapsed time in the format "mm:ss".
   */
  getTimeRemaining() {
    const timeLimit = this.timeLimit * 60;
    const totalSeconds = timeLimit - this.elapsedSeconds;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Pad the seconds with a leading zero if they are less than 10
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${paddedSeconds}`;
  }

  /**
   * Selects an answer option for the evaluation.
   * @param optionId - The ID of the selected answer option.
   * @returns void
   */
  selectAnswer(optionId: number): void {
    this.selectedOptionId = optionId;
  }

  /**
   * Checks if the given option ID is the correct option ID for the current question.
   * @param optionId - The ID of the option to check.
   * @returns `true` if the given option ID is the correct option ID, `false` otherwise.
   */
  isCorrectOptionId(optionId: number): boolean {
    return this.questions[this.currentQuestionIndex].correct_option_id === optionId;
  }

  /**
   * Checks if the current question has an image.
   * @returns {boolean} Returns true if the current question has an image, otherwise false.
   */
  questionHasImage(): boolean {
    let _result = false;
    if (
      this.currentQuestionIndex >= 0 &&
      this.currentQuestionIndex < this.questions.length &&
      typeof this.questions[this.currentQuestionIndex].image_url !== undefined &&
      this.questions[this.currentQuestionIndex].image_url !== null &&
      this.questions[this.currentQuestionIndex].image_url.length > 0
    ) {
      _result = true;
    }
    return _result;
  }

  /**
   * Checks if the current question has been answered.
   *
   * @returns A boolean indicating whether the current question has been answered.
   */
  questionHasBeenAnswered(): boolean {
    let _result = false;
    if (
      this.currentQuestionIndex >= 0 &&
      this.currentQuestionIndex < this.questions.length &&
      this.questions[this.currentQuestionIndex].responded_at !== null
    ) {
      _result = true;
    }
    return _result;
  }

  /**
   * Checks if the attempt count for the question has exceeded the maximum allowed attempts.
   * @returns A boolean value indicating whether the attempt count has exceeded the maximum allowed attempts.
   */
  questionAttemptCountExceeded(): boolean {
    if (this.isMultipleChoice()) {
      return this.currentAttemptCount >= 2;
    }
    if (this.isTrueFalse()) {
      return this.currentAttemptCount >= 1;
    }

    return false;
  }

  /**
   * Checks if the current question is a multiple-choice question.
   *
   * @returns {boolean} Returns true if the current question is a multiple-choice question, otherwise returns false.
   */
  isMultipleChoice(): boolean {
    let _result = false;
    if (
      this.currentQuestionIndex >= 0 &&
      this.currentQuestionIndex < this.questions?.length &&
      this.questions[this.currentQuestionIndex].options &&
      this.questions[this.currentQuestionIndex].options.length > 2
    ) {
      _result = true;
    }
    return _result;
  }

  isTrueFalse(): boolean {
    let _result = false;
    if (
      this.currentQuestionIndex >= 0 &&
      this.currentQuestionIndex < this.questions?.length &&
      this.questions[this.currentQuestionIndex].options &&
      this.questions[this.currentQuestionIndex].options.length === 2
    ) {
      _result = true;
    }
    return _result;
  }

  /**
   * Processes an answer submitted to the api for the current question in the evaluation.
   * @param response The answer response containing the user's answer.
   * @returns void
   */
  processAnswer(response: IAnswerResponse): void {
    this.questions[this.currentQuestionIndex] = response.evaluation_attempt_question;
    if (!response.evaluation_attempt_question.correct) {
      this.currentAttemptCount = this.currentAttemptCount === -1 ? 1 : this.currentAttemptCount + 1;
    } else {
      this.currentAttemptCount = 0;
    }
  }

  /**
   * Moves to the next question in the evaluation.
   */
  previousQuestion(): void {
    this.currentQuestionIndex--;
    this.selectedOptionId = -1;
    this.currentAttemptCount = -1;
  }

  /**
   * Moves to the next question in the evaluation.
   */
  nextQuestion(): void {
    this.currentQuestionIndex++;
    this.selectedOptionId = -1;
    this.currentAttemptCount = -1;
    if (this.currentQuestionIndex >= this.questionCount) {
      this.status = EvaluationStatusEnum.Complete;
    }
  }

  /**
   * Ends the evaluation and updates the evaluation status.
   * @param response - The evaluation attempt response.
   * @returns void
   */
  endEvaluation(response: IEvalAttempt): void {
    this.attempt = response;
    if (response.score >= this.passPercentage) {
      this.grade = EvaluationGradeEnum.Passed;
    } else {
      this.grade = EvaluationGradeEnum.Failed;
    }
    this.currentQuestionIndex = -1;
    this.status = EvaluationStatusEnum.Submitted;
  }

  /**
   * Resets the evaluation to its initial state.
   */
  resetEvaluation(): void {
    this.status = EvaluationStatusEnum.NotStarted;
    this.currentQuestionIndex = -1;
    this.elapsedSeconds = -1;
    this.selectedOptionId = -1;
    this.currentAttemptCount = -1;
    this.grade = EvaluationGradeEnum.NotGraded;
    this.passPercentage = -1;
    this.questionCount = -1;
  }
}
export type IEvaluation = EvaluationClass;
