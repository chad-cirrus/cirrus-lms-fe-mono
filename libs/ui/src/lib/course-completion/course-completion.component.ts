import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LESSON_COMPLETION_CTA } from '../completion-dialog/LessonCompletionCtas';
import { downloadPdf } from '../helpers/DownloadPdf';
import { UiDownloadService } from './ui-download.service';
import { PdfDownloadFile } from '@cirrus/models';

export interface ICourseCompletionData {
  badge: string;
  student: string;
  course: string;
  course_id: number;
  course_attempt_id: number;
  user_certificate_id: number;
}

@Component({
  selector: 'cirrus-course-completion',
  templateUrl: './course-completion.component.html',
  styleUrls: ['./course-completion.component.scss'],
})
export class CourseCompletionComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ICourseCompletionData,
    private uiDownloadService: UiDownloadService
  ) {}

  certificateLoading$ = this.uiDownloadService.certificateLoading$;
  transcriptLoading$ = this.uiDownloadService.transcriptloading$;
  courseCertificateId = 0;

  get lessonCompletionCta() {
    return LESSON_COMPLETION_CTA;
  }

  ngOnInit(): void {
    this.getCourseUserCertificateId();
  }

  getCourseUserCertificateId() {
    this.uiDownloadService.getCourse(this.data.course_id).subscribe(course => {
      if (course.certificate && course.certificate.id) {
        this.courseCertificateId = course.certificate.id;
      }
    });
  }

  downloadCert() {
    this.uiDownloadService
      .downloadCertificate(this.courseCertificateId)
      .subscribe((data: PdfDownloadFile) => {
        downloadPdf(data);
      });
  }

  downloadTranscript() {
    this.uiDownloadService
      .downloadTranscript(this.data.course_id, 0)
      .subscribe((data: PdfDownloadFile) => {
        downloadPdf(data);
      });
  }
}
