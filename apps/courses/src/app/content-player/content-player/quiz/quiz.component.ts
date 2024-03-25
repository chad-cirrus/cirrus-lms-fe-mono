import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CompletionDialogComponent, CourseCompletionComponent, FullStoryEvent, FullStoryEventData, FullstoryService, LESSON_COMPLETION_CTA, LessonContentComponent } from '@cirrus/ui';
import { EvaluationService } from './evaluation.service';
import { IAnswerResponse } from './models/IAnswerResponse';
import { IEvalAttempt } from './models/IEvalAttempt';
import { EvaluationStatusEnum } from './models/EvaluationStatusEnum';
import { IStartEvalAttempt } from './models/IStartEvalAttempt';
import {
  CORRECT_RESPONSE_POPUP,
  INCORRECT_RESPONSE_POPUP_RETRY,
  INCORRECT_RESPONSE_POPUP_FINAL,
} from './evaluation.constants';

import { MatDialog } from '@angular/material/dialog';
import { FullScreenImageDialogComponent } from '../../../full-screen-image-dialog/full-screen-image-dialog.component';

import { AppState } from '../../../store/reducers';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { CONTENT_TYPE, ICourseOverview, ILesson, PROGRESS_STATUS } from '@cirrus/models';
import { selectLesson } from '../../../store/selectors/lessons.selector';
import { EqbOutOfTimeComponent } from './evaluation-out-of-time/eqbOutOfTime.component';
import { completeProgress } from '../../../store/actions';
import { EvalClass } from './models/Evaluation';
import { EvaluationGradeEnum } from './models/EvaluationGradeEnum';
import { CoursesService } from '../../../course/course.service';
import { selectCourseOverview } from '../../../store/selectors/course.selector';
import { selectCirrusUser } from '../../../store/selectors/cirrus-user.selector';
import { nextLesson, nextLessonUrlSegments } from '../../../shared/helpers/next-lesson';

/**
 * Component for displaying an evaluation (quiz or exam)
 */
@Component({
  selector: 'cirrus-quiz',
  templateUrl: './evaluation.component.html',
  styleUrls: ['evaluation.component.scss'],
  standalone: true,
  imports: [CommonModule, EqbOutOfTimeComponent],
})
export class EvaluationComponent extends LessonContentComponent implements OnInit, OnDestroy {
  private _lesson!: ILesson;
  private _courseOverview!: ICourseOverview;

  /**
   * Constructor for the EvaluationComponent
   * @param evaluationService Injects the EvaluationService to get the quiz
   */
  constructor(
    private dialog: MatDialog,
    private evaluationService: EvaluationService,
    private renderer: Renderer2,
    private store: Store<AppState>,
    private coursesService: CoursesService,
    private router: Router,
    private fullstoryService: FullstoryService,
  ) {
    super();
  }
  lesson!: ILesson;
  lessonOverview$: Observable<ILesson> = this.store.select(selectLesson);
  lessonCompleted$!: Observable<string>;
  lessonSubscription = new Subscription();
  lesson$: Observable<ILesson> = this.store.select(selectLesson).pipe(
    tap(lesson => {
      this._lesson = lesson;
    }),
  );

  EvaluationStatusEnum = EvaluationStatusEnum;
  EvaluationGradeEnum = EvaluationGradeEnum;

  eval = new EvalClass();

  quiz_attempt?: IEvalAttempt = undefined;

  courseTitle = '';
  course_attempt_id = 0;
  courseOverview$ = this.store.select(selectCourseOverview);
  user$ = this.store.select(selectCirrusUser);
  answeredQuestionResultClass = '';
  questionResultTitle = '';
  questionResultSubtitle = '';
  questionResultButtonText = '';

  /// Timed properties
  evaluationEnd$ = new Subject();
  timerSubscription?: Subscription;
  evaluationTimer?: Observable<number>;
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
    this.getEvaluation();
    this.hidePrevAndNext.emit(false);
    this.getCourseInfo();
    this.fullStoryInit();
  }

  /**
   * Retrieves the evaluation data from the server and loads it into the component.
   */
  getEvaluation() {
    this.lessonOverview$.subscribe(lesson => {
      this.lesson = lesson;
      this.course_attempt_id = lesson.course_attempt_id;
      if (this.content.content_type == CONTENT_TYPE.quiz) {
        this.evaluationService
          .getQuiz(this.content.quiz_id || -1, this.course_attempt_id, lesson.id, lesson.stage_id)
          .subscribe(response => {
            this.eval.loadQuiz(response);
          });
      } else {
        this.evaluationService
          .getExam(this.content.exam_id || -1, this.course_attempt_id, lesson.id, lesson.stage_id)
          .subscribe(response => {
            this.eval.loadQuiz(response);
          });
      }
    });
  }

  /**
   * Lifecycle hook that is called when the component is about to be destroyed.
   * It is responsible for cleaning up any resources or subscriptions.
   */
  ngOnDestroy(): void {
    this.hidePrevAndNext.next(false);

    this.courseOverview$.subscribe(event => {
      this._courseOverview = event;
    });

    //Check if quiz is complete
    if (this.eval.status === EvaluationStatusEnum.Complete) {
      //Check if lesson is complete
      this.lessonCompleted$ = this.coursesService.lessonComplete$;

      if (this.lesson.progress.status == 'completed') {
        let progress_type = 'lesson';

        const component: ComponentType<CompletionDialogComponent | CourseCompletionComponent> =
          progress_type === 'lesson' ? CompletionDialogComponent : CourseCompletionComponent;
        const data =
          progress_type === 'lesson'
            ? {
                lesson: this.lesson.title,
                course: this._courseOverview,
                stageId: this.lesson.stage_id,
              }
            : {
                badge: this._courseOverview?.badge?.badge_image
                  ? this._courseOverview?.badge.badge_image
                  : 'courses/images/default_badge.png',
                course: this._courseOverview.name,
                course_id: this._courseOverview.id,
                student: 'user.name',
                course_attempt_id: this._lesson.course_attempt_id,
              };

        const nextLesson$ = this.courseOverview$.pipe(map(courseOverview => nextLesson(courseOverview, this.lesson)));

        this.dialog
          .open(component, {
            data,
            panelClass: 'fullscreen-dialog',
            height: '100%',
            width: '100%',
          })
          .afterClosed()
          .pipe(withLatestFrom(nextLesson$))
          .subscribe(([response, nextLesson]) => {
            if (response === LESSON_COMPLETION_CTA.nextLesson) {
              this.router.navigate(nextLessonUrlSegments(nextLesson));
            } else {
              console.log('none of the above');
            }
            this.dialog.closeAll();
          });
      }

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
    this.evaluationTimer = timer(0, 1000);
    this.timerSubscription = this.evaluationTimer.pipe(takeUntil(this.evaluationEnd$)).subscribe(() => {
      this.eval.incrementTimeElapsed();

      if (this.eval.status === EvaluationStatusEnum.TimedOut) {
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

    const attempt: IStartEvalAttempt = {
      quiz_id: this.eval.id,
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

    if (this.eval.status === EvaluationStatusEnum.NotStarted) {
      this.evaluationService.startQuiz(attempt).subscribe(response => {
        this.eval.startQuiz(response);
      });
    }
    if (this.eval.timeLimit > 0) {
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

    this.eval.previousQuestion();

    if (this.eval.currentQuestionIndex === 0) {
      this.hidePrevAndNext.emit(false);
    }
  }

  /**
   * Submits the selected answer for the current question to the api.
   */
  submitAnswer() {
    this.evaluationService
      .submitAnswer(
        this.eval.attempt?.id ?? 0,
        this.eval.questions[this.eval.currentQuestionIndex].id,
        this.eval.selectedOptionId,
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
      answer_given: this.eval.selectedOptionId,
      content_item_title: this.content.title,
      quiz_question: this.eval.questions[this.eval.currentQuestionIndex].desc,
      question_id: this.eval.questions[this.eval.currentQuestionIndex].id,
    };

    this.eval.processAnswer(response);
    const isMultipleChoiceQuestion = this.eval.questions[this.eval.currentQuestionIndex].options.length > 2;
    if (response.quiz_attempt_question.correct == true) {
      fullStoryData.answer_result = 'correct';
      this.setPopupForCorrectResponse();
    } else {
      fullStoryData.answer_result = 'incorrect';
      if ((isMultipleChoiceQuestion && this.eval.currentAttemptCount > 1) || !isMultipleChoiceQuestion) {
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
    if (this.eval.questions[this.eval.currentQuestionIndex].correct) {
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
    this.evaluationEnd$.next();

    this.hidePrevAndNext.emit(false);

    // Grade the quiz
    this.evaluationService.gradeQuiz(this.eval.attempt?.id ?? 0).subscribe(response => {
      this.eval.endQuiz(response);
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

    this.eval.nextQuestion();
    if (this.eval.status === EvaluationStatusEnum.Complete || this.eval.status === EvaluationStatusEnum.TimedOut) {
      this.endQuiz();
    }
  }

  /**
   * Calculates and returns the text for the start button based on the student's progress.
   * @returns {string} The text for the start button.
   * */
  getStartButtonText(): string {
    let _buttonText = 'Start';
    if (this.eval.status === EvaluationStatusEnum.InProgress) {
      _buttonText = 'Resume';
    }
    if (this.eval.grade === EvaluationGradeEnum.Failed) {
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
    if (this.eval.status === EvaluationStatusEnum.Submitted || this.eval.status === EvaluationStatusEnum.TimedOut) {
      if (this.eval.grade === EvaluationGradeEnum.Passed) {
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
    if (this.eval.status === EvaluationStatusEnum.Complete) {
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
    if (this.eval.status === EvaluationStatusEnum.Complete) {
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

    this.eval.resetQuiz();
    this.getEvaluation();
    this.startQuiz();
  }

  /**
   * Open Full Screen Image Dialog
   *
   * Open an image in full screen viewing mode via a dialog
   *
   */
  openFullScreenImage() {
    const imgUrl = this.eval.questions[this.eval.currentQuestionIndex].image_url ?? '';
    const imgTitle = this.eval.questions[this.eval.currentQuestionIndex].image_url ?? '';
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
    this.coursesService.getCourseOverview(this.lesson.course_id).subscribe(response => {
      this.courseTitle = response.title;
    });
  }

  fullStoryInit() {
    this.fullstoryService.init();
  }

  fullstoryEvent(eventName: string, eventProperties: FullStoryEventData) {
    this.fullstoryService.event(eventName, eventProperties);
  }
}
