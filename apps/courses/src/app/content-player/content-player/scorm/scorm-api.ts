import { IProgress, PROGRESS_STATUS } from '@cirrus/models';
import { EventEmitter } from '@angular/core';

export class ScormAPI {
  data: {} = {
    'cmi.core.lesson_status': 'not attempted',
  };
  grade = 0;
  progress: IProgress;
  updateProgress: EventEmitter<IProgress>;
  hideNavigation: EventEmitter<boolean>;

  constructor(progress: IProgress, updateProgress: EventEmitter<IProgress>, hideNavigation: EventEmitter<boolean>) {
    this.progress = progress;
    this.updateProgress = updateProgress;
    this.hideNavigation = hideNavigation;
  }

  get isPassed() {
    return ['completed', 'passed'].includes(this.lessonStatus)
  }

  get lessonStatus() {
    return this.data['cmi.core.lesson_status'];
  }

  LMSInitialize() {
    this.hideNavigation.emit(true);
    return 'true';
  }

  LMSCommit() {
    const status = this.isPassed ? PROGRESS_STATUS.completed : PROGRESS_STATUS.in_progress;
    const payload = { id: this.progress.id, status, scorm: { pass: this.isPassed, grade: this.grade }};
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
    if (key === 'cmi.core.score.raw') {
      this.grade = +value;
    }
    return 'true';
  }
}
