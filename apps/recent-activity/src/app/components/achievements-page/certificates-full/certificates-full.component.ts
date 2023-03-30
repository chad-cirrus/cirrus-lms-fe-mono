import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Certificate } from '../../../models/IRecentActivity';
import { RecentActivityFacade } from '../../../recent-activity-facade.service';
import { downloadPdf, UiDownloadService } from '@cirrus/ui';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'cirrus-certificates-full',
  templateUrl: './certificates-full.component.html',
  styleUrls: ['./certificates-full.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class CertificatesFullComponent {
  certificateLoading$ = this.downloadService.certificateLoading$;
  user_certificate_id = 0;
  @Input() certificates: Certificate[] = [];

  searchParam = new UntypedFormControl('');
  filteredCertList$: Observable<Certificate[]> =
    this.searchParam.valueChanges.pipe(
      startWith(''),
      map((searchParam: string) =>
        this.certificates.filter(cert =>
          searchParam === ''
            ? this.certificates
            : cert.course_name
                .toLocaleLowerCase()
                .includes(searchParam.toLocaleLowerCase())
        )
      )
    );

  constructor(
    private facade: RecentActivityFacade,
    private downloadService: UiDownloadService
  ) {}

  download(cert: Certificate) {
    this.user_certificate_id = cert.id;
    this.facade.downloadCertificate(cert.id).subscribe(
      (data: Blob) => {
        downloadPdf(data, 'cert');
      },
      () => {
        // do nothing
      },
      () => {
        this.user_certificate_id = 0;
      }
    );
  }
}
