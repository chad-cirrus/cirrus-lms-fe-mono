import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonContentComponent } from '@cirrus/ui';
import { QuizService } from './quiz.service';
import { IAnswerResponse, IQuizRequest, IQuizTracker, IStartQuizAttempt } from './quiz.types';

import { AppState } from '../../../store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILesson } from '@cirrus/models';
import { selectLesson } from '../../../store/selectors/lessons.selector';

/**
 * Component for displaying a quiz
 */
@Component({
  selector: 'cirrus-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['quiz.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class QuizComponent extends LessonContentComponent implements OnInit {
  /**
   * Constructor for the QuizComponent
   * @param quizService Injects the QuizService to get the quiz
   */
  constructor(private quizService: QuizService, private renderer: Renderer2, private store: Store<AppState>) {
    super();
  }

  lessonOverview$: Observable<ILesson> = this.store.select(selectLesson);

  quiz!: IQuizRequest;

  quizTracker: IQuizTracker = {
    current_question: -1,
    answers: [],
    responses: [],
    attempt_id: -1,
    started_at: new Date('01-01-1970'),
  };

  answeredQuestionResultClass = '';
  questionResultTitle = '';

  /// Timed Quiz properties
  // TODO: implement the following timer logic correctly, placeholder for now
  isQuizTimed = true;
  quizTimeUsed = 0;

  /**
   * This method is part of the Angular Component Lifecycle. It is called after the constructor and is used to initialize data and other components.
   *
   * @ngOnInit
   *
   * This method overrides the ngOnInit method of the parent component. It emits an event with a boolean value of false to hide the previous and next buttons on the content player.
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.quizService.getQuiz(this.content.quiz_id || -1).subscribe(response => {
      this.quiz = response;
    });
    this.quizTracker.current_question = -1;
    this.hidePrevAndNext.emit(false);
  }

  menuToggle(event: MouseEvent) {
    this.renderer.addClass(event.target, '--selected');
  }

  /**
   * getQuestionCount()
   *
   * Returns the number of questions in a quiz
   *
   * @returns {number} The number of questions in the quiz
   */
  getQuestionCount(): number {
    return !this.quiz || !this.quiz.quiz_questions ? 0 : this.quiz.quiz_questions.length;
  }

  /**
   * getSubjectList
   *
   * Gets a list of subjects from a quiz object
   *
   * @returns {string[]} An array of strings representing the subjects in the quiz
   */
  getSubjectList(): string[] {
    // TODO: remove the next line once the api endpoint correctly populates this array
    return ['#FakeSubject1', '#fakeSubject2', '#fakeSubject3'];
    // TODO: uncomment the next line once the api endpoint correctly populates this array
    //return !this.quiz || !this.quiz.subjects ? [] : this.quiz.subjects;
  }

  /**
   * startQuiz
   *
   * Starts a quiz by setting the inProcess flag to true and setting the currentQuestion to 0.
   * It also emits an event to hide the previous and next buttons on the content player.
   *
   * @returns {void}
   */
  startQuiz(): void {
    this.hidePrevAndNext.emit(true);
    const attempt: IStartQuizAttempt = {
      quiz_id: this.quiz.id,
      course_attempt_id: 0,
      stage_id: 0,
      lesson_id: 0,
      content_id: this.content.id,
    };

    this.lessonOverview$.subscribe(lesson => {
      attempt.course_attempt_id = lesson.course_attempt_id;
      attempt.stage_id = lesson.stage_id;
      attempt.lesson_id = lesson.id;
    });
    this.quizService.startQuiz(attempt).subscribe(response => {
      this.quizTracker.attempt_id = response.quiz_attempt.id;
      this.quizTracker.started_at = new Date();
      this.quizTracker.current_question = 0;
    });
  }

  /**
   * goBack()
   *
   * Moves the student back a question in the quiz, or resets to overview if on first question.
   *
   * @returns void
   */
  goBack() {
    this.quizTracker.current_question--;
    if (this.quizTracker.current_question === -1) this.hidePrevAndNext.emit(false);
  }

  /**
   * Select an answer for a given question
   * @param {number} questionId - The id of the question
   * @param {number} answerId - The id of the answer
   */
  selectAnswer(questionId: number, answerId: number) {
    this.quizTracker.answers[this.quizTracker.current_question] = { question_id: questionId, answer: answerId };
  }

  /**
   * Checks if the selected answer is correct
   * @returns {boolean} - true if the selected answer is correct, false otherwise
   */
  checkAnswer(): boolean {
    if (
      this.quizTracker.responses[this.quizTracker.current_question] &&
      this.quizTracker.responses[this.quizTracker.current_question].quiz_attempt_response
    ) {
      return this.quizTracker.responses[this.quizTracker.current_question].quiz_attempt_response.correct;
    }
    return false;
  }

  /**
   * Checks if a quiz is in progress
   * @returns {boolean} - true if a quiz is in progress, false otherwise
   */
  isQuizInProcess(): boolean {
    return this.quizTracker.current_question > -1;
  }

  /**
   * Checks if a quiz has been completed
   *
   * @returns {boolean} true if the quiz has been completed, false otherwise
   */
  isQuizCompleted(): boolean {
    if (
      this.quizTracker.responses &&
      this.quizTracker.responses.length > 0 &&
      this.quizTracker.responses.length === this.quiz.quiz_questions.length
    ) {
      return true;
    }
    return false;
  }

  /**
   * Returns the ID of the currently selected answer for the current question in the quiz.
   * If no answer is selected, returns -1.
   * @returns The ID of the currently selected answer, or -1 if no answer is selected.
   */
  getSelectedAnswerId(): number {
    if (
      this.quizTracker.answers &&
      this.quizTracker.answers[this.quizTracker.current_question] &&
      typeof this.quizTracker.answers[this.quizTracker.current_question].answer !== 'undefined'
    ) {
      return this.quizTracker.answers[this.quizTracker.current_question].answer as number;
    }
    return -1;
  }

  /**
   * Submits the selected answer for the current question to the api.
   */
  submitAnswer() {
    // initialize arrays if this is the first time through
    if (!this.quizTracker.answers) {
      this.quizTracker.answers = [];
    }
    if (!this.quizTracker.responses) {
      this.quizTracker.responses = [];
    }

    this.quizService
      .submitAnswer(this.quizTracker.attempt_id, this.quizTracker.answers[this.quizTracker.current_question])
      .subscribe(response => {
        this.processResponse(response);
      });
  }

  /**
   * Processs the response from the api for the answered question.
   * If the current question is the last question in the quiz, the quizCompleted boolean is set to true.
   */
  processResponse(response: IAnswerResponse) {
    this.quizTracker.responses[this.quizTracker.current_question] = response;
    if (this.checkAnswer()) {
      this.answeredQuestionResultClass = ' --correct';
      this.questionResultTitle = 'Correct!';
    } else {
      this.answeredQuestionResultClass = ' --incorrect';
    }
  }

  /**
   * Increments the current question index and resets the answered question result class and title.
   * If the quiz is completed, emits an event to show the previous and next buttons.
   */
  nextQuestion() {
    this.answeredQuestionResultClass = '';
    this.questionResultTitle = '';
    this.quizTracker.current_question++;
    if (this.isQuizCompleted()) {
/*       this.quizService.gradeQuiz(this.quizTracker.attempt_id).subscribe(response => {
      });
 */
      this.hidePrevAndNext.emit(false);
    }
  }

  /**
   * Determines whether the back button should be hidden.
   * @returns A boolean indicating whether the back button should be hidden.
   */
  shouldHideBackButton(): boolean {
    if(this.quizTracker.current_question <=0) return false;
    return true;
  }

  /**
   * Calculates the score of a quiz attempt.
   * @returns {string} The score of the quiz attempt in the form of "correctAnswers out of totalQuestions correct. (percentage%)"
   */
  getScore(): string {
    let _correctAnswers = 0;
    let _percentage = 0.0;
    for (let i = 0; i < this.quiz.quiz_questions.length; i++) {
      if (this.quizTracker.responses[i].quiz_attempt_response.correct) _correctAnswers++;
    }
    _percentage = (_correctAnswers / this.quiz.quiz_questions.length) * 100;
    return `${_correctAnswers} out of ${this.quiz.quiz_questions.length} correct. (${_percentage.toFixed(2)}%)`;
  }

  /**
   * Calculates and returns the elapsed time since the quiz started.
   * The time is returned as a string in the format "mm:ss".
   * @returns {string} The elapsed time in the format "mm:ss".
   */
  getElapsedTime() {
    const dateObj = new Date(this.quizTracker.started_at);
    const now = new Date();

    const diffInMs = now.getTime() - dateObj.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const seconds = diffInSeconds % 60;

    return `${minutes}:${seconds}`;
  }
}
