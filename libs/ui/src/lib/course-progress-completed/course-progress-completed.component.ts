import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cirrus-course-progress-completed',
  templateUrl: './course-progress-completed.component.html',
  styleUrls: ['./course-progress-completed.component.scss'],
})
export class CourseProgressCompletedComponent {
  @Input() completeDate = '';
  @Input() certificate = false;
  @Output() downloadCert = new EventEmitter();
  @Output() downloadTranscript = new EventEmitter();

  downloadArrowIcon = '/courses/images/svg/download-arrow.svg';
  completeCheckIcon = '/courses/images/svg/course-progress-complete-icon.svg';

  emitDownloadCert() {
    this.downloadCert.next();
  }

  emitDownloadTranscript() {
    this.downloadTranscript.next();
  }
}
