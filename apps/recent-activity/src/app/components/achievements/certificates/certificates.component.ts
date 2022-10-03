import { Component, Input } from '@angular/core';
import { Certificate } from '../../../models/IRecentActivity';

@Component({
  selector: 'cirrus-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent {
  @Input() certificates: Certificate[] = [];

  view() {
    console.log('view');
  }
}
