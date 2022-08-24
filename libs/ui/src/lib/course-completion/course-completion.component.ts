import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LESSON_COMPLETION_CTA } from '../completion-dialog/LessonCompletionCtas';
import { downloadPdf } from '../helpers/DownloadPdf';
import { UiDownloadService } from './ui-download.service';

export interface ICourseCompletionData {
  badge: string;
  student: string;
  course: string;
  course_attempt_id: number;
}

@Component({
  selector: 'cirrus-course-completion',
  templateUrl: './course-completion.component.html',
  styleUrls: ['./course-completion.component.scss'],
})
export class CourseCompletionComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ICourseCompletionData,
    private uiDownloadService: UiDownloadService
  ) {}

  get lessonCompletionCta() {
    return LESSON_COMPLETION_CTA;
  }

  downloadCert() {
    this.uiDownloadService
      .downloadCertificate(this.data.course_attempt_id)
      .subscribe((data: Blob) => {
        downloadPdf(data);
      });
  }
}
