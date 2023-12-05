import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonContentComponent } from '@cirrus/ui';
import { QuizService } from './quiz.service';
import { IAnswerResponse, IQuizRequest, IQuizTracker, IStartQuizAttempt } from './quiz.types';
import { CORRECT_RESPONSE_POPUP, INCORRECT_RESPONSE_POPUP_RETRY, INCORRECT_RESPONSE_POPUP_FINAL } from './quiz.constants';

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
  questionResultSubtitle = '';
  questionResultButtonText = '';

  /// Timed Quiz properties
  // TODO: implement the following timer logic correctly, placeholder for now
  isQuizTimed = false;
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
    const attemptCount = this.quizTracker.answers[this.quizTracker.current_question]?.attempt_count || 0;

    this.quizTracker.answers[this.quizTracker.current_question] = { question_id: questionId, answer: answerId, 
      attempt_count: attemptCount};
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
      if (this.checkAnswer()) {
        return true;
      } else {
        const attemptCount = this.quizTracker.answers[this.quizTracker.current_question]?.attempt_count || 0;

        return (this.isMultipleChoiceQuestion() && attemptCount > 1) || !this.isMultipleChoiceQuestion();
      }
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
    this.quizTracker.answers[this.quizTracker.current_question].attempt_count++;
    
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
    const answer = this.quizTracker.answers[this.quizTracker.current_question];
    const attemptCount = answer?.attempt_count || 0;

    this.quizTracker.responses[this.quizTracker.current_question] = response;
    if (this.checkAnswer()) {
      this.setPopupForCorrectResponse();
    } else {
      if ((this.isMultipleChoiceQuestion() && attemptCount > 1) || !this.isMultipleChoiceQuestion()) {
        this.setPopupForLastIncorrectResponse();
      } else {
        this.setPopupForFirstIncorrectResponse();
      }
    }
  }

  setPopupForCorrectResponse() {
    this.answeredQuestionResultClass = CORRECT_RESPONSE_POPUP.class;
    this.questionResultTitle = CORRECT_RESPONSE_POPUP.title;
    this.questionResultSubtitle = CORRECT_RESPONSE_POPUP.subtitle;
    this.questionResultButtonText = CORRECT_RESPONSE_POPUP.buttonText;
  }

  setPopupForFirstIncorrectResponse() {
    this.answeredQuestionResultClass = INCORRECT_RESPONSE_POPUP_RETRY.class;
    this.questionResultTitle = INCORRECT_RESPONSE_POPUP_RETRY.title;
    this.questionResultSubtitle = INCORRECT_RESPONSE_POPUP_RETRY.subtitle;
    this.questionResultButtonText = INCORRECT_RESPONSE_POPUP_RETRY.buttonText;
  }

  setPopupForLastIncorrectResponse() {
    this.answeredQuestionResultClass = INCORRECT_RESPONSE_POPUP_RETRY.class;
    this.questionResultTitle = INCORRECT_RESPONSE_POPUP_FINAL.title;
    this.questionResultSubtitle = INCORRECT_RESPONSE_POPUP_FINAL.subtitle;
    this.questionResultButtonText = INCORRECT_RESPONSE_POPUP_FINAL.buttonText; 
  }

  resetQuestionResultPopup() {
    this.answeredQuestionResultClass = '';
    this.questionResultTitle = '';
    this.questionResultSubtitle = '';
    this.questionResultButtonText = '';
  }

  isMultipleChoiceQuestion(): boolean {
    return this.quiz.quiz_questions[this.quizTracker.current_question].question_options.length > 2;
  }
  
  /**
   * Handles the click event for the popup button.
   * If a user has an incorrect answer, it should not navigate to the next question.
   */
  popupButtonClick() {
    if (this.checkAnswer()) {
      this.nextQuestion();
    } else {
      this.resetQuestionResultPopup();
    }
  }

  /**
   * Increments the current question index and resets the answered question result class and title.
   * If the quiz is completed, emits an event to show the previous and next buttons.
   */
  nextQuestion() {
    this.resetQuestionResultPopup();
    if (this.quizTracker.current_question < this.quiz.quiz_questions.length - 1) {
      this.quizTracker.current_question++;
    }

    if (this.isQuizCompleted()) {
      this.hidePrevAndNext.emit(false);
    }
  }

  /**
   * Determines whether the back button should be hidden.
   * @returns A boolean indicating whether the back button should be hidden.
   */
  shouldHideBackButton(): boolean {
    if (this.quizTracker.current_question <= 0) return false;
    return true;
  }
  
  /**
   * Determines whether the submit button should be hidden and the next button should be displayed.
   * @returns A boolean indicating whether the submit button should be hidden and the next button should be displayed.
   */
  shouldHideSubmitButton(): boolean {
    const answer = this.quizTracker.answers[this.quizTracker.current_question];
    const attemptCount = answer?.attempt_count || 0;
    const exhaustedMultipleChoiceAttempts = (this.isMultipleChoiceQuestion() && attemptCount > 1);
    const exhaustedSingleChoiceAttempts = (!this.isMultipleChoiceQuestion() && attemptCount > 0);

    return attemptCount > 0 && ( exhaustedMultipleChoiceAttempts || exhaustedSingleChoiceAttempts);
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

  /**
   * Determines whether to display the correct answer for a given question
   * @returns {boolean} True if user has exhausted attempts, otherwise false.
   */
  showCorrectAnswer(optionId: number): boolean {
    const attemptCount = this.quizTracker.answers[this.quizTracker.current_question]?.attempt_count || 0;
    const response = this.quizTracker.responses[this.quizTracker.current_question]?.quiz_attempt_response;
    const correctOptionId = response?.quiz_question.correct_option.id;

    if (this.isMultipleChoiceQuestion()) {
        return attemptCount > 1 && optionId === correctOptionId;
    } else {
        return attemptCount > 0 && optionId === correctOptionId;
    }
  }
  /**
   * Calculates and returns if the student passed the quiz/test or not.
   * @returns {boolean} True if passed, otherwise false.
   */
  studentHasPassed(): boolean {
    const correctAnswers = this.quizTracker.responses.filter(response => response.quiz_attempt_response.correct);
    const percentage = (correctAnswers.length / this.quiz.quiz_questions.length) * 100;
    return percentage >= this.quiz.pass_percentage;
  }

  /**
   * Returns the title for the quiz results screen.
   * @returns {string} The title text for the quiz results.
   */
  getResultsTitle(): string {
    let _titleText = 'Please finish the quiz to see your results.';
    if (this.isQuizCompleted()) {
      if (this.studentHasPassed()) {
        _titleText = 'Congratulations, you passed!';
      } else {
        _titleText = 'Nice try, but you did not pass.';
      }
    }
    return _titleText;
  }

  /** Returns the text for the primary button on the quiz results screen based on student's score.
   * @returns {string} The text for the primary button on the quiz results screen.
   */
  getResultsPrimaryButtonText(): string {
    let _buttonText = 'Retake';
    if (this.isQuizCompleted() && this.studentHasPassed()) {
      _buttonText = 'Continue';
    }
    return _buttonText;
  }

  /**
   * Returns the text for the secondary button on the quiz results screen based on student's score.
   * @returns {string} The text for the secondary button on the quiz results screen.
   */
  getResultsSecondaryButtonText(): string {
    let _buttonText = 'Skip';
    if (this.isQuizCompleted()) {
      _buttonText = 'Review';
    }
    return _buttonText;
  }

  /**
   * Returns the approximate duration of the quiz in minutes.
   * @returns {number} The approximate duration of the quiz in minutes.
   */
  getApproximateDuration(): number {
    let _approximte_duration = 0;
    if (this.quiz) {
      _approximte_duration = this.quiz.approximate_duration;
    }
    return _approximte_duration;
  }
}
