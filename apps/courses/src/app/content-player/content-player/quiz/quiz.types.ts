/**
 * Interface for a question option
 * @export
 * @interface IQuestionOption
 */
export interface IQuestionOption {
  /**
   * Unique identifier for the option
   * @type {number}
   * @memberof IQuestionOption
   */
  id: number;
  description: string;
}

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

  quiz_attempt_response?: IQuizAttemptResponse;

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

/**
 * Interface representing the quiz object returned from the api
 * endpoint api/v4/quizzes/{quiz id}?course_attempt_id={course attempt id}

 * @export
 * @interface IQuizRequest
 *
 * @property {number} id - The id of the quiz request
 * @property {string} name - The name of the quiz request
 * @property {string} desc - The description of the quiz request
 * @property {IQuestion[]} quiz_questions - An array of questions for the quiz request
 * @property {string[]} [subjects] - An optional array of subjects for the quiz request
 */
export interface IQuizRequest {
  /**
   * Unique quiz identifier
   * @type {number}
   * @memberof IQuizRequest
   */
  id: number;
  /**
   * Name of the quiz
   * @type {string}
   * @memberof IQuizRequest
   */
  name: string;
  /**
   * Quiz detailed description
   * @type {string}
   * @memberof IQuizRequest
   */
  desc: string;
  /**
   * Questions for this quiz
   * @type {IQuestion[]}
   * @memberof IQuizRequest
   */
  quiz_questions: IQuestion[];
  /**
   * Subjects for this quiz
   * @type {string[]}
   * @memberof IQuizRequest
   */
  subjects?: string[];
  /**
   * Category Id of this quiz
   * @type {number}
   * @memberof IQuizRequest
   */
  quiz_category_id: number;
  /**
   * Number of questions in this quiz
   * @type {number}
   * @memberof IQuizRequest
   */
  quiz_questions_count: number;
  /**
   * Percentage of correct answers needed to pass this quiz
   * @type {number}
   * @memberof IQuizRequest
   */
  pass_percentage: number;
  /**
   * Estimated duration of this quiz in minutes
   * @type {number}
   * @memberof IQuizRequest
   */
  approximate_duration: number;

  /**
   * The quiz attempt information.
   * @type {IQuizAttempt}
   */
  quiz_attempt?: IQuizAttempt;
}

/**
 * Interface for starting a quiz attempt sent to the api.
 * @interface
 */
export interface IStartQuizAttempt {
  /**
   * The ID of the course attempt.
   * @type {number}
   */
  course_attempt_id: number;

  /**
   * The ID of the stage.
   * @type {number}
   */
  stage_id: number;

  /**
   * The ID of the lesson.
   * @type {number}
   */
  lesson_id: number;

  /**
   * The ID of the content.
   * @type {number}
   */
  content_id: number;

  /**
   * The ID of the quiz.
   * @type {number}
   */
  quiz_id: number;
}

/**
 * Interface for the response of starting a quiz returned from the api.
 * @interface
 */
export interface IStartQuizResponse {
  /**
   * The quiz attempt information.
   * @type {IQuizAttempt}
   */
  quiz_attempt: IQuizAttempt;
}

/**
 * Interface for a quiz attempt.
 * @interface
 */
export interface IQuizAttempt {
  /**
   * The ID of the quiz attempt.
   * @type {number}
   */
  id: number;

  /**
   * The ID of the course attempt.
   * @type {number}
   */
  course_attempt_id: number;

  /**
   * The ID of the stage.
   * @type {number}
   */
  stage_id: number;

  /**
   * The ID of the lesson.
   * @type {number}
   */
  lesson_id: number;

  /**
   * The ID of the content.
   * @type {number}
   */
  content_id: number;

  /**
   * The ID of the quiz.
   * @type {number}
   */
  quiz_id: number;

  /**
   * The snapshot of the quiz attempt.
   * @type {string}
   */
  snapshot: string;

  /**
   * The score of the quiz attempt.
   * @type {number}
   */
  score: number;

  /**
   * The creation date and time of the quiz attempt.
   * @type {string}
   */
  created_at: string;

  /**
   * The last update date and time of the quiz attempt.
   * @type {string}
   */
  updated_at: string;

  /**
   * The grading date and time of the quiz attempt.
   * @type {string}
   */
  graded_at: string;
}

/**
 * Interface for starting a quiz.
 * @interface
 */
export interface IStartQuiz {
  /**
   * The quiz attempt information.
   * @type {IStartQuizAttempt}
   */
  quiz_attempt: IStartQuizAttempt;
}

/**
 * Interface for tracking a quiz.
 * @interface
 */
export interface IQuizTracker {
  /**
   * The answers for the quiz.
   * @type {Answer[]}
   */
  answers: Answer[];

  /**
   * The responses for the quiz.
   * @type {IAnswerResponse[]}
   */
  responses: IAnswerResponse[];

  /**
   * The ID of the quiz attempt.
   * @type {number}
   */
  attempt_id: number;

  /**
   * The current question number in the quiz.
   * @type {number}
   */
  current_question: number;

  /**
   * The timestamped date and time the quiz was started.
   * @type {Date}
   */
  started_at: Date;

  /**
   * The quiz attempt information.
   * @type {IQuizAttempt}
   */
  attempt?: IQuizAttempt;
}

/**
 * Interface for a quiz question.
 * @interface
 */
export interface IQuizQuestion {
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

/**
 * Interface for a quiz attempt response returned from the api.
 * @interface
 */
export interface IAnswerResponse {
  quiz_attempt_response: IQuizAttemptResponse;
}

/**
 * Represents a student's answer to a quiz question
 * @export
 * @class Answer
 */
export class Answer {
  /**
   * quiz question id being answered
   * @type {number}
   * @memberof Answer
   */
  question_id!: number;
  /**
   * id of answer the user selected
   * @type {number}
   * @memberof Answer
   */
  answer: number | undefined;

  /**
   * number of times the user has attempted to answer this question
   * @type {number}
   * @memberof Answer
   */
  attempt_count = 0;
}
