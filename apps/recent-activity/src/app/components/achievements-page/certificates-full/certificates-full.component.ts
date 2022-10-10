import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Certificate } from '../../../models/IRecentActivity';
import { RecentActivityFacade } from '../../../facade.service';
import { downloadPdf } from '@cirrus/ui';

@Component({
  selector: 'cirrus-certificates-full',
  templateUrl: './certificates-full.component.html',
  styleUrls: ['./certificates-full.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class CertificatesFullComponent {
  loading$ = this.facade.downloadLoading$;
  course_attempt_id = 0;
  @Input() certificates: Certificate[] = [];

  constructor(private facade: RecentActivityFacade) {}

  download(cert: Certificate) {
    console.log('download', cert);
    this.course_attempt_id = cert.course_attempt_id;
    this.facade.downloadCertificate(cert.course_attempt_id).subscribe(
      (data: Blob) => {
        downloadPdf(data);
      },
      () => {
        // do nothing
      },
      () => {
        this.course_attempt_id = 0;
      }
    );
  }
}
