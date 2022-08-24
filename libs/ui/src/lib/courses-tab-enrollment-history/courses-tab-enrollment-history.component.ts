import { Component, Input } from '@angular/core';
import { IEnrollmentHistory } from '@cirrus/models';
import { UiDownloadService } from '../course-completion/ui-download.service';
import { Column } from '../generic-responsive-mat-table/generic-responsive-mat-table.component';
import { downloadPdf } from '../helpers/DownloadPdf';
import { formatCertificate, formatTranscript } from '../helpers/TableFormat';

@Component({
  selector: 'cirrus-courses-tab-enrollment-history',
  templateUrl: './courses-tab-enrollment-history.component.html',
  styleUrls: ['./courses-tab-enrollment-history.component.scss'],
})
export class CoursesTabEnrollmentHistoryComponent {
  @Input() enrollments!: IEnrollmentHistory[] | undefined;

  displayedColumns: string[] = [
    'enrollment_date',
    'course_version',
    'transcript_available',
    'user_certificate',
  ];

  columns: Column[] = [
    {
      name: 'Course Date',
      mat_col_name: 'enrollment_date',
    },
    {
      name: 'Version',
      mat_col_name: 'course_version',
    },

    {
      name: 'Transcript',
      mat_col_name: 'transcript_available',
      icon: 'courses/images/svg/download-arrow.svg',
      method: formatTranscript,
    },
    {
      name: 'Certificate',
      mat_col_name: 'user_certificate',
      icon: 'courses/images/svg/download-arrow.svg',
      method: formatCertificate,
    },
  ];

  constructor(private uiDownloadService: UiDownloadService) {}

  rowSelected(row: any) {
    console.log('event', row);
  }

  valueSelected(obj: any) {
    const { type, value } = obj;
    if (type.mat_col_name === 'user_certificate') {
      this.uiDownloadService
        .downloadCertificate(value.id)
        .subscribe((data: Blob) => {
          downloadPdf(data);
        });
    }
  }
}
