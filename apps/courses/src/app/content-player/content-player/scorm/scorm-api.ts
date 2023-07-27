import { IContent, IProgress, PROGRESS_STATUS } from '@cirrus/models';
import { EventEmitter } from '@angular/core';
import { MediaServerService } from '../../../media.service';
import { BehaviorSubject } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { CoursesFacadeService } from '../../../courses-facade.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';

export class ScormAPI {
  data: {} = {
    'cmi.core.lesson_status': 'not attempted',
  };
  grade = 0;
  progress: IProgress;
  updateProgress: EventEmitter<IProgress>;
  hideNavigation: EventEmitter<boolean>;
  scormProgress = new BehaviorSubject<string>('');
  // lesson_title: string;

  constructor(
    progress: IProgress,
    updateProgress: EventEmitter<IProgress>,
    hideNavigation: EventEmitter<boolean>,
    private mediaService: MediaServerService,
    private facadeService: CoursesFacadeService,
    private lessonTitle: string,
    private courseTitle: string,
    private content: IContent
  ) {
    this.progress = progress;
    this.updateProgress = updateProgress;
    this.hideNavigation = hideNavigation;
    console.log(this.lessonTitle);
    console.log(this.courseTitle);
    console.log(this.content.title);
  }

  get isPassed() {
    return ['completed', 'passed'].includes(this.lessonStatus);
  }

  get lessonStatus() {
    return this.data['cmi.core.lesson_status'];
  }

  LMSInitialize() {
    console.log("INITIALIZE", this.data);

    const status = PROGRESS_STATUS.in_progress;
    const payload = {
      id: this.progress.id,
      status,
      scorm: { pass: this.isPassed, grade: this.grade },
    };
    this.data['cmi.suspend_data'] = this.progress.scorm_progress;
    this.updateProgress.emit(payload);
    this.hideNavigation.emit(true);
    this.scormProgress
      .pipe(
        exhaustMap(scormProgress =>
          this.mediaService.updateScormProgress(this.progress.id, scormProgress)
        )
      )
      .subscribe();
    return 'true';
  }

  LMSCommit() {
    const status = this.isPassed
      ? PROGRESS_STATUS.completed
      : PROGRESS_STATUS.in_progress;
    const payload = {
      id: this.progress.id,
      status,
      scorm: { pass: this.isPassed, grade: this.data['cmi.core.score.raw'] },
    };
    console.log("COMMIT PAYLOAD", this.data);
    this.scormProgress.next(this.data['cmi.suspend_data']);
    this.updateProgress.emit(payload);
    this.hideNavigation.emit(!this.isPassed);
    return 'true';
  }

  LMSGetLastError() {
    return 0;
  }
  LMSGetErrorString() {
    return 'Fake error string.';
  }

  LMSGetDiagnostic() {
    return 'Fake diagnostic information.';
  }

  LMSFinish() {
    return 'true';
  }

  LMSGetValue(key: any) {
    return this.data[key];
  }

  LMSSetValue(key: any, value: any) {
    this.data[key] = value;
    console.log('VALUE', this.data);

    const eventName = this.data['cmi.interactions.undefined.objectives.0.id'] ? 
      'quizQuestion' : 'interactiveQuestion';

    const quizQuestionProperties = {
      courseTitle: this.courseTitle,
      lessonTitle: this.lessonTitle,
      contentTitle: this.content.title,
      quizId: this.data['cmi.interactions.undefined.objectives.0.id'],
      quizQuestionId: this.data['cmi.interactions.undefined.id'],
      correctAnswer: this.data['cmi.interactions.undefined.correct_responses.0.pattern'],
      answerResult: this.data['cmi.interactions.undefined.result'],
      userAnswer: this.data['cmi.interactions.undefined.student_response'],
    }

    const interactiveQuestionProperties = {
      courseTitle: this.courseTitle,
      lessonTitle: this.lessonTitle,
      contentTitle: this.content.title,
    }

    const eventProperties = eventName === 'quizQuestion' ? quizQuestionProperties : interactiveQuestionProperties;

    console.log(eventName, eventProperties);
    
    this.facadeService.fullstoryEvent(eventName, eventProperties);
    return 'true';
  }
}
