import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LESSON_COMPLETION_CTA } from '../completion-dialog/LessonCompletionCtas';
import { downloadPdf } from '../helpers/DownloadPdf';
import { UiDownloadService } from './ui-download.service';
import { PdfDownloadFile } from '@cirrus/models';
import { IDownloadableDocument } from '../download-documents/IDownloadbleDocument';
import { DOWNLOADABLE_DOCUMENT_TYPE } from '../download-documents/DOWNLOADABLE_DOCUMENT_TYPE';

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
    private uiDownloadService: UiDownloadService,
  ) {}

  certificateList: IDownloadableDocument[] | undefined;
  courseTranscript: IDownloadableDocument | undefined;
  courseCertificate: IDownloadableDocument | undefined;

  /**
   * The current document being downloaded, undefined if no document is being downloaded.
   * @type {IDownloadableDocument | undefined}
   * @memberof DownloadDocumentsComponent
   * @public
   * @default undefined
    */
  currentDocument: IDownloadableDocument | undefined;

  /**
   * Gets the lesson completion call-to-action.
   *
   * @returns The lesson completion call-to-action.
   */
  get lessonCompletionCta() {
    return LESSON_COMPLETION_CTA;
  }

  ngOnInit(): void {
    this.courseTranscript = {
      documentType: DOWNLOADABLE_DOCUMENT_TYPE.transcript,
      displayText: 'Course Transcript',
      id: 0,
      uuid: '',
    };
    this.loadDocumentList(this.data.course_id);
  }

  /**
   * Loads the list of downloadable documents.
   * @private
   * @memberof DownloadDocumentsComponent
   * @returns {void}
   * @default undefined
   */
  loadDocumentList(id:number) {
    this.uiDownloadService.getCourse(id).subscribe(course => {
      this.courseTranscript = {
        id: course.certificate.id ? course.certificate.id : -1,
        documentType: DOWNLOADABLE_DOCUMENT_TYPE.transcript,
        displayText: 'Course Transcript',
        uuid: self.crypto.randomUUID(),
      };

      if (course.certificate && course.certificate.id) {
        this.courseCertificate = {
          id: course.certificate.id,
          documentType: DOWNLOADABLE_DOCUMENT_TYPE.courseCertificate,
          displayText: 'Course Certificate',
          uuid: self.crypto.randomUUID(),
        };
      }
      if (course.awarded_certificates && course.awarded_certificates?.length > 0) {
        this.certificateList = course.awarded_certificates.map(cert => {
          return {
            id: cert.id ? cert.id : -1,
            documentType: DOWNLOADABLE_DOCUMENT_TYPE.stageCertificate,
            name: cert.certifiable_name,
            displayText: cert.certifiable_name,
            uuid : self.crypto.randomUUID(),
          } as IDownloadableDocument;
        });
      }
    });
  }

  /**
   * Handles the download button click event.
   * @param {IDownloadableDocument} document The document to download.
   * @memberof DownloadDocumentsComponent
   * @returns {void}
   * @default undefined
   */
  downloadClicked(document: IDownloadableDocument): void {
    this.currentDocument = document;
    if (document.documentType === DOWNLOADABLE_DOCUMENT_TYPE.transcript) {
      this.uiDownloadService.downloadTranscript(this.data.course_id, 0).subscribe((data: PdfDownloadFile) => {
        downloadPdf(data);
        this.currentDocument = undefined;
      });
    } else {
      this.uiDownloadService.downloadCertificate(document.id).subscribe((data: PdfDownloadFile) => {
        downloadPdf(data);
        this.currentDocument = undefined;
      });
    }
  }
}
