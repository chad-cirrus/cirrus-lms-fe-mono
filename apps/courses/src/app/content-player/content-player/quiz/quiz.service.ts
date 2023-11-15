import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
 * Interface for a question object
 *
 * @export
 * @interface IQuestion
 */
/**
 * Represents a quiz question.
 *
 * @interface IQuestion
 */
export interface IQuestion {
  /**
   * Unique ID of the question
   *
   * @type {number}
   * @memberof IQuestion
   */
  id: number;
  body: string;
  desc: string;

  question_options: IQuestionOption[];
  correct_option: IQuestionOption;
}

/**
 * Interface representing the quiz object returned from the api
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
}

export interface IStartQuizAttempt {
  course_attempt_id: number;
  stage_id: number;
  lesson_id: number;
  content_id: number;
  quiz_id: number;
}

export interface IStartQuizResponse {
  quiz_attempt: IQuizAttempt;
}

export interface IQuizAttempt {
  id: number;
  course_attempt_id: number;
  stage_id: number;
  lesson_id: number;
  content_id: number;
  quiz_id: number;
  snapshot: unknown;
  score: number;
  created_at: string;
  updated_at: string;
  graded_at: string;
}

export interface IStartQuiz {
  quiz_attempt: IStartQuizAttempt;
}

export interface IQuizTracker {
  answers: Answer[];
  responses: IAnswerResponse[];
  attempt_id: number;
  current_question: number;
}

export interface IQuizQuestion {
  id: number;
  body: string;
  desc: string;
  correct_option: IQuestionOption;
}

export interface IQuizAttemptResponse {
  id: number;
  quiz_attempt_id: number;
  question_option_id: number;
  correct: boolean;
  quiz_question: IQuizQuestion;
}

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
}

@Injectable({
  providedIn: 'root',
})
/**
 *
 * @class QuizService
 * @description A service for getting quiz data from a server
 * @param {HttpClient} http - The HttpClient used for making requests
 */
export class QuizService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @method getQuiz
   * @description Makes a request to the server to get quiz data
   * @param {number} id - The id of the quiz to get data for
   * @returns {Observable<IQuizRequest>} An observable containing the quiz data
   */
  getQuiz(id: number): Observable<IQuizRequest> {
    return this.http
      .get<IQuizRequest>(`${environment.baseUrl}/api/v4/quizzes/${id}`)
      .pipe(map(response => response['quiz']));
  }

  /**
   * Starts a new quiz attempt.
   * @param attempt The quiz attempt data.
   * @returns An observable of the start quiz response.
   */
  startQuiz(attempt: IStartQuizAttempt): Observable<IStartQuizResponse> {
    const attemptData: IStartQuiz = { quiz_attempt: attempt };
    return this.http
      .post<IStartQuizResponse>(`${environment.baseUrl}/api/v5/quiz_attempts`, attemptData)
      .pipe(map(response => response));
  }

  /**
   *
   * @method submitAnswer
   * @description Submits a student's answer to a quiz question
   * @param {Answer} answer - The answer to submit
   * @returns {Observable<IAnswerResponse>} An observable containing the response from the server
   */
  submitAnswer(attempt_id: number, answer: Answer): Observable<IAnswerResponse> {
    const _data = {
      quiz_attempt_response: {
        question_option_id: answer.answer,
      },
    };
    return this.http
      .post<IAnswerResponse>(
        `${environment.baseUrl}/api/v5/quiz_attempts/${attempt_id}/quiz_questions/${answer.question_id}/quiz_attempt_responses`,
        _data,
      )
      .pipe(map(response => response));
  }
}
