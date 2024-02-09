import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IDownloadableDocument } from './IDownloadbleDocument';
import { MatIconModule, } from '@angular/material/icon';
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
   * Event emitted when a button is clicked.
   */
  @Output() buttonClicked = new EventEmitter<IDownloadableDocument>();
}
