import { IProgress, PROGRESS_STATUS } from '@cirrus/models';
import { EventEmitter } from '@angular/core';
import { MediaServerService } from '../../../media.service';
import { BehaviorSubject } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

export class ScormAPI {
  data: {} = {
    'cmi.core.lesson_status': 'not attempted',
  };
  grade = 0;
  progress: IProgress;
  updateProgress: EventEmitter<IProgress>;
  hideNavigation: EventEmitter<boolean>;
  scormProgress = new BehaviorSubject<string>('');

  constructor(
    progress: IProgress,
    updateProgress: EventEmitter<IProgress>,
    hideNavigation: EventEmitter<boolean>,
    private mediaService: MediaServerService
  ) {
    this.progress = progress;
    this.updateProgress = updateProgress;
    this.hideNavigation = hideNavigation;
  }

  get isPassed() {
    return ['completed', 'passed'].includes(this.lessonStatus);
  }

  get lessonStatus() {
    return this.data['cmi.core.lesson_status'];
  }

  LMSInitialize() {
    const status = PROGRESS_STATUS.in_progress;
    const payload = {
      id: this.progress.id,
      status,
      scorm: { pass: this.isPassed, grade: this.grade },
    };
    this.data['cmi.suspend_data'] = this.progress.scorm_progress;
    this.updateProgress.emit(payload);
    this.hideNavigation.emit(true);
    this.scormProgress.pipe(
      exhaustMap((scormProgress) =>
        this.mediaService.updateScormProgress(this.progress.id, scormProgress)),
    )
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
    return 'true';
  }
}
