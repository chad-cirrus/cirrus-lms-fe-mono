import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonContentComponent } from '@cirrus/ui';
import {
  IQuizRequest,
  QuizService,
  IQuizTracker,
  Answer,
  IStartQuizAttempt,
  IStartQuizResponse,
  IAnswerResponse,
} from './quiz.service';
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
  };

  /// TODO: replace next line when api returns actual value
  approximateDuration = '3 million minutes';

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
    });
    this.quizTracker.current_question = 0;
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
    return this.quizTracker.responses[this.quizTracker.current_question].quiz_attempt_response.correct;
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
      this.quizTracker.answers &&
      this.quizTracker.answers.length > 0 &&
      this.quizTracker.answers.length === this.quiz.quiz_questions.length
    ) {
      return true;
    }
    return false;
  }

  /**
   * Submits the selected answer for the current question and increments the currentQuestion index.
   * If the current question is the last question in the quiz, the quizCompleted boolean is set to true.
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
        this.quizTracker.responses[this.quizTracker.current_question] = response;
      });

    if (this.checkAnswer()) console.log('Correct answer!');
    else console.log('Wrong answer!');

    this.quizTracker.current_question++;
    this.quizTracker.answers[this.quizTracker.current_question] = new Answer();
    this.quizTracker.responses[this.quizTracker.current_question] = {} as IAnswerResponse;

    if (this.isQuizCompleted()) {
      console.log(this.getScore());
    }
    if (this.isQuizCompleted()) {
      this.hidePrevAndNext.emit(false);
    }
  }

  /**
   * Calculates the score of a quiz attempt.
   * @returns {string} The score of the quiz attempt in the form of "correctAnswers out of totalQuestions correct. (percentage%)"
   */
  getScore(): string {
    const _correctAnswers = 10;
    let _percentage = 100.0;
    /*     for (let i = 0; i < this.quiz.quiz_questions.length; i++) {
      if (this.quizTracker.answers[i].answer === this.quiz.quiz_questions[i].correct_option.id) _correctAnswers++;
    }
 */ _percentage = (_correctAnswers / this.quiz.quiz_questions.length) * 100;
    return `10 out of ${this.quiz.quiz_questions.length} correct. (${_percentage.toFixed(2)}%)`;
  }
}
