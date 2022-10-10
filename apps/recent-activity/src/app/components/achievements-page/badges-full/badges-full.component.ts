import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Badge } from '../../../models/IRecentActivity';

@Component({
  selector: 'cirrus-badges-full',
  templateUrl: './badges-full.component.html',
  styleUrls: ['./badges-full.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class BadgesFullComponent {
  @Input() badges: Badge[] = [];
}
