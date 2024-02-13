import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IDownloadableDocument } from './IDownloadbleDocument';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
   * The current document being downloaded, undefined if no document is being downloaded.
   */
  @Input() currentDocument :IDownloadableDocument | undefined;

  /**
   * Event emitted when a button is clicked.
   */
  @Output() downloadClicked = new EventEmitter<IDownloadableDocument>();

  /**
   * The loading state of the certificate.
   * @type {BehaviorSubject<boolean>}
   * @memberof DownloadDocumentsComponent
   * @public
   * @default new BehaviorSubject(false)
   * @readonly
   */
  onDownloadClicked(document: IDownloadableDocument) {
    this.downloadClicked.emit(document);
    this.currentDocument = document;
  }

}
