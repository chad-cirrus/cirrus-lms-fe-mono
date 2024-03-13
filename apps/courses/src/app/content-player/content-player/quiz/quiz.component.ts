import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullStoryEvent, FullStoryEventData, FullstoryService, LessonContentComponent } from '@cirrus/ui';
import { QuizService } from './quiz.service';
import { IAnswerResponse } from './models/IAnswerResponse';
import { IQuizAttempt } from './models/IQuizAttempt';
import { QuizStatusEnum } from './models/QuizStatusEnum';
import { IStartQuizAttempt } from './models/IStartQuizAttempt';
import {
  CORRECT_RESPONSE_POPUP,
  INCORRECT_RESPONSE_POPUP_RETRY,
  INCORRECT_RESPONSE_POPUP_FINAL,
} from './quiz.constants';

import { MatDialog } from '@angular/material/dialog';
import { FullScreenImageDialogComponent } from '../../../full-screen-image-dialog/full-screen-image-dialog.component';

import { AppState } from '../../../store/reducers';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ILesson, PROGRESS_STATUS } from '@cirrus/models';
import { selectLesson } from '../../../store/selectors/lessons.selector';
import { QqbOutOfTimeComponent } from './qqb-out-of-time/qqbOutOfTime.component';
import { completeProgress } from '../../../store/actions';
import { QuizClass } from './models/Quiz';
import { QuizGradeEnum } from './models/QuizGradeEnum';
import { CoursesService } from '../../../course/course.service';

/**
 * Component for displaying a quiz
 */
@Component({
  selector: 'cirrus-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['quiz.component.scss'],
  standalone: true,
  imports: [CommonModule, QqbOutOfTimeComponent],
})
export class QuizComponent extends LessonContentComponent implements OnInit, OnDestroy {
  /**
   * Constructor for the QuizComponent
   * @param quizService Injects the QuizService to get the quiz
   */
  constructor(
    private dialog: MatDialog,
    private quizService: QuizService,
    private renderer: Renderer2,
    private store: Store<AppState>,
    private coursesService: CoursesService,
    private fullstoryService: FullstoryService
  ) {
    super();
  }
  lesson!: ILesson;
  lessonOverview$: Observable<ILesson> = this.store.select(selectLesson);

  QuizStatusEnum = QuizStatusEnum;
  QuizGradeEnum = QuizGradeEnum;

  quiz = new QuizClass();

  quiz_attempt?: IQuizAttempt = undefined;

  courseTitle = '';
  course_attempt_id = 0;
  answeredQuestionResultClass = '';
  questionResultTitle = '';
  questionResultSubtitle = '';
  questionResultButtonText = '';

  /// Timed Quiz properties
  quizEnd$ = new Subject();
  timerSubscription?: Subscription;
  quizTimer?: Observable<number>;
  showOutOfTimePopup = false;

  /**
   * This method is part of the Angular Component Lifecycle. It is called after the constructor and is used to initialize data and other components.
   *
   * @ngOnInit
   *
   * This method overrides the ngOnInit method of the parent component. It emits an event with a boolean value of false to hide the previous and next buttons on the content player.
   */
  ngOnInit(): void {
    super.ngOnInit();
    this.getQuiz();
    this.hidePrevAndNext.emit(false);
    this.getCourseInfo();
    this.fullStoryInit();
  }

  /**
   * Retrieves the quiz data from the server and loads it into the quiz component.
   */
  getQuiz() {
    this.lessonOverview$.subscribe(lesson => {
      this.lesson = lesson;
      this.course_attempt_id = lesson.course_attempt_id;

      this.quizService
        .getQuiz(this.content.quiz_id || -1, this.course_attempt_id, lesson.id, lesson.stage_id)
        .subscribe(response => {
          this.quiz.loadQuiz(response);
        });
    });
  }

  /**
   * Lifecycle hook that is called when the component is about to be destroyed.
   * It is responsible for cleaning up any resources or subscriptions.
   */
  ngOnDestroy(): void {
    this.hidePrevAndNext.next(false);
    if (this.quiz.status === QuizStatusEnum.Complete) {
      const _progress = {
        id: this.content.progress.id,
        status: PROGRESS_STATUS.completed,
      };
      this.updateProgress.emit(_progress);
      this.store.dispatch(
        completeProgress({
          id: this.content.progress.id,
          courseId: this.lesson.course_id,
          stageId: this.lesson.stage_id,
          lessonId: this.lesson.id,
          progress: _progress,
          assessment: false,
        }),
      );
    }
  }

  /**
   * Toggles the menu and adds the '--selected' class to the target element.
   *
   * @param event - The mouse event that triggered the menu toggle.
   */
  menuToggle(event: MouseEvent) {
    this.renderer.addClass(event.target, '--selected');
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
   * Starts the quiz timer.
   */
  startQuizTimer(): void {
    this.quizTimer = timer(0, 1000);
    this.timerSubscription = this.quizTimer.pipe(takeUntil(this.quizEnd$)).subscribe(() => {
      this.quiz.incrementTimeElapsed();

      if (this.quiz.status === QuizStatusEnum.TimedOut) {
        this.nextQuestion();
        this.showOutOfTimePopup = true;
      }
    });
  }

  /**
   * startQuiz
   *
   * Starts a quiz, fired by user clicking start quiz button.
   * It call startQuiz() on the quiz object and also emits an event to hide the previous and next buttons on the content player.
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

    if (this.quiz.status === QuizStatusEnum.NotStarted) {
      this.quizService.startQuiz(attempt).subscribe(response => {
        this.quiz.startQuiz(response);
      });
    }
    if (this.quiz.timeLimit > 0) {
      this.startQuizTimer();
    }
  }

  /**
   * goBack()
   *
   * Moves the student back a question in the quiz, or resets to overview if on first question.
   *
   * @returns void
   */
  goBack() {
    this.resetQuestionResultPopup();

    this.quiz.previousQuestion();


    if (this.quiz.currentQuestionIndex === 0) {
      this.hidePrevAndNext.emit(false);
    }
  }

  /**
   * Submits the selected answer for the current question to the api.
   */
  submitAnswer() {
    this.quizService
      .submitAnswer(
        this.quiz.attempt?.id ?? 0,
        this.quiz.questions[this.quiz.currentQuestionIndex].id,
        this.quiz.selectedOptionId,
      )
      .subscribe(response => {
        this.processResponse(response);
      });
  }

  /**
   * Processs the response from the api for the answered question.
    */
  processResponse(response: IAnswerResponse) {
    const fullStoryData = {
      answer_result: 'null',
      answer_given: this.quiz.selectedOptionId,
      content_item_title: this.content.title,
      quiz_question: this.quiz.questions[this.quiz.currentQuestionIndex].desc,
      question_id: this.quiz.questions[this.quiz.currentQuestionIndex].id,
    };

    this.quiz.processAnswer(response);
    const isMultipleChoiceQuestion = this.quiz.questions[this.quiz.currentQuestionIndex].options.length > 2;
    if (response.quiz_attempt_question.correct == true) {
      fullStoryData.answer_result = 'correct';
      this.setPopupForCorrectResponse();
    } else {
      fullStoryData.answer_result = 'incorrect';
      if ((isMultipleChoiceQuestion && this.quiz.currentAttemptCount > 1) || !isMultipleChoiceQuestion) {
        this.setPopupForLastIncorrectResponse();
      } else {
        this.setPopupForFirstIncorrectResponse();
      }
    }

    const fullstoryEvent = new FullStoryEvent(this.courseTitle, this.lesson.title, this.content.title, fullStoryData);
    this.fullstoryService.event('Quiz Question', fullstoryEvent);
  }

  /*
   * Sets the popup properties for a student's correct question response.
   */
  setPopupForCorrectResponse() {
    this.answeredQuestionResultClass = CORRECT_RESPONSE_POPUP.class;
    this.questionResultTitle = CORRECT_RESPONSE_POPUP.title;
    this.questionResultSubtitle = CORRECT_RESPONSE_POPUP.subtitle;
    this.questionResultButtonText = CORRECT_RESPONSE_POPUP.buttonText;
  }

  /** Sets the popup properties for a student's incorrect question response. *
   * @returns void
   * */
  setPopupForFirstIncorrectResponse() {
    this.answeredQuestionResultClass = INCORRECT_RESPONSE_POPUP_RETRY.class;
    this.questionResultTitle = INCORRECT_RESPONSE_POPUP_RETRY.title;
    this.questionResultSubtitle = INCORRECT_RESPONSE_POPUP_RETRY.subtitle;
    this.questionResultButtonText = INCORRECT_RESPONSE_POPUP_RETRY.buttonText;
  }

  /** Sets the popup properties for a student's incorrect question response. *
   * @returns void
   * */
  setPopupForLastIncorrectResponse() {
    this.answeredQuestionResultClass = INCORRECT_RESPONSE_POPUP_RETRY.class;
    this.questionResultTitle = INCORRECT_RESPONSE_POPUP_FINAL.title;
    this.questionResultSubtitle = INCORRECT_RESPONSE_POPUP_FINAL.subtitle;
    this.questionResultButtonText = INCORRECT_RESPONSE_POPUP_FINAL.buttonText;
  }

  /**
   * Resets the properties for the answered question result popup.
   * @returns void
   */
  resetQuestionResultPopup() {
    this.answeredQuestionResultClass = '';
    this.questionResultTitle = '';
    this.questionResultSubtitle = '';
    this.questionResultButtonText = '';
  }

  /**
   * Handles the click event for the popup button.
   * If a user has an incorrect answer, it should not navigate to the next question.
   */
  popupButtonClick() {
    if (this.quiz.questions[this.quiz.currentQuestionIndex].correct) {
      this.nextQuestion();
    } else {
      this.resetQuestionResultPopup();
    }
  }

  /**
   * Ends the quiz.
   */
  endQuiz(): void {
    // Signal that the quiz has ended
    this.quizEnd$.next();

    this.hidePrevAndNext.emit(false);

    // Grade the quiz
    this.quizService.gradeQuiz(this.quiz.attempt?.id ?? 0).subscribe(response => {
      this.quiz.endQuiz(response);
    });

    // Stop the timer
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  /**
   * Increments the current question index and resets the answered question result class and title.
   * If the quiz is completed, emits an event to show the previous and next content buttons.
   */
  nextQuestion() {
    this.resetQuestionResultPopup();

    this.quiz.nextQuestion();
    if (this.quiz.status === QuizStatusEnum.Complete || this.quiz.status === QuizStatusEnum.TimedOut) {
      this.endQuiz();
    }
  }

  /**
   * Calculates and returns the text for the start button based on the student's progress.
   * @returns {string} The text for the start button.
   * */
  getStartButtonText(): string {
    let _buttonText = 'Start';
    if (this.quiz.status === QuizStatusEnum.InProgress) {
      _buttonText = 'Resume';
    }
    if (this.quiz.grade === QuizGradeEnum.Failed) {
      _buttonText = 'Retake';
    }
    return _buttonText + ' Quiz';
  }

  /**
   * Returns the title for the quiz results screen.
   * @returns {string} The title text for the quiz results.
   */
  getResultsTitle(): string {
    let _titleText = 'Please finish the quiz to see your results.';
    if (this.quiz.status === QuizStatusEnum.Submitted || this.quiz.status === QuizStatusEnum.TimedOut) {
      if (this.quiz.grade === QuizGradeEnum.Passed) {
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
    if (this.quiz.status === QuizStatusEnum.Complete) {
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
    if (this.quiz.status === QuizStatusEnum.Complete) {
      _buttonText = 'Review';
    }
    return _buttonText;
  }

  /**
   * Allows users to reattempt a failed quiz, resets quiz data to start over
   * Resets quiz tracker and puts user back to the start quiz screen
   */
  retakeQuiz(): void {
    this.showOutOfTimePopup = false;

    this.quiz.resetQuiz();
    this.getQuiz();
    this.startQuiz();
  }

  /**
   * Open Full Screen Image Dialog
   *
   * Open an image in full screen viewing mode via a dialog
   *
   */
  openFullScreenImage() {
    const imgUrl = this.quiz.questions[this.quiz.currentQuestionIndex].image_url ?? '';
    const imgTitle = this.quiz.questions[this.quiz.currentQuestionIndex].image_url ?? '';
    this.dialog.open(FullScreenImageDialogComponent, {
      panelClass: 'full-screen-image-dialog',
      height: '100%',
      width: '100%',
      maxWidth: '100%',
      data: {
        imgUrl: imgUrl,
        imgTitle: imgTitle,
      },
    });
  }

  getCourseInfo() {
    this.coursesService.getCourseOverview(this.lesson.course_id).subscribe(
      response => {
        this.courseTitle = response.title;
      }, 
    )
  }

  fullStoryInit() {
    this.fullstoryService.init();
  }

  fullstoryEvent(eventName: string, eventProperties: FullStoryEventData) {
    this.fullstoryService.event(eventName, eventProperties);
  }
}
