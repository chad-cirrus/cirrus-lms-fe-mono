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

export interface IQuizAttempt {
  id: number;
  course_attempt_id: number;
  stage_id: number;
  lesson_id: number;
  content_id: number;
  quiz_id: number;
  snapshot: any;
  score: number;
  created_at: string;
  updated_at: string;
  graded_at: string;
}

export interface IQuizData {
  quiz_attempt: IQuizAttempt;
}

export interface IQuizTracker {
  answers: Answer[];
  quiz_data: IQuizData;
  current_question: number;
}

/**
 * Represents a student's answer to a quiz question
 * @export
 * @class Answer
 */
export class Answer {
  /**
   * ID of the quiz
   * @type {number}
   * @memberof Answer
   */
  quiz_id!: number;
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
  answer!: number;
  /**
   * The timestamp of the Answer
   * @type {Date}
   * @memberof Answer
   */
  timestamp!: Date;
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

  startQuiz(attempt: IQuizData): Observable<IQuizData> {
    return this.http
      .post<IQuizData>(`${environment.baseUrl}/api/v5/quiz_attempts`, attempt)
      .pipe(map(response => response));
  }
}
