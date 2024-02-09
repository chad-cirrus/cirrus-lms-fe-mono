import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IDownloadableDocument } from './IDownloadbleDocument';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { PdfDownloadFile } from '@cirrus/models';

/**
 * Displays a list of downloadable documents.
 * Types: course transcript, course certificate, and stage certificates.
 */
@Component({
  selector: 'cirrus-ui-download-documents',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './download-documents.component.html',
  styleUrls: ['./download-documents.component.scss'],
})
export class DownloadDocumentsComponent {
  /**
   * List of downloadable certificates.
   */
  @Input() certificateList: IDownloadableDocument[] | undefined;

  /**
   * Downloadable transcript.
   */
  @Input() transcript: IDownloadableDocument | undefined;

  /**
   * Downloadable course certificate.
   */
  @Input() courseCertificate: IDownloadableDocument | undefined;

  /**
   * Event emitted when a button is clicked.
   */
  @Output() downloadClicked = new EventEmitter<IDownloadableDocument>();

  private certificateLoadingSubject = new BehaviorSubject(false);
  certificateLoading$ = this.certificateLoadingSubject.asObservable();

  private transcriptLoadingSubject = new BehaviorSubject(false);
  transcriptLoading$ = this.transcriptLoadingSubject.asObservable();

  downloadPdf(pdf: PdfDownloadFile): Observable<void> {
    return new Observable(observer => {
      const file = new Blob([pdf.file], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = fileURL;
      a.target = '_blank';
      a.download = pdf.filename;
      document.body.appendChild(a);
      a.click();

      // Notify the observer that the download has started
      observer.next();

      // Notify the observer that the download is complete
      a.addEventListener('click', () => {
        observer.complete();
      });

      // Handle any errors
      a.addEventListener('error', err => {
        observer.error(err);
      });
    });
  }

  onDownloadClicked(document: IDownloadableDocument) {
    this.downloadClicked.emit(document);
  }
}
