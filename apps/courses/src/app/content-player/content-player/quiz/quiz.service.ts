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

/**
 * Class representing a student's quiz attempt
 * @export
 * @class QuizAttempt
 */
export class QuizAttempt {
  /**
   * ID of the quiz
   */
  quiz_id!: number;
  /**
   * Marks the moment a student started a quiz
   * @type {Date}
   * @memberof Answer
   */
  quiz_start_time: Date | undefined;
  /**
   * The zero based index of which question is being presented
   * -1 is the default and represents the quiz is still on the overview page
   * @type {number}
   * @memberof Answer
   */
  current_question = -1;
  answers!: Answer[];
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
}
