import { Component, Input } from '@angular/core';
import { Badge } from '../../../models/IRecentActivity';

@Component({
  selector: 'cirrus-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss'],
})
export class BadgesComponent {
  @Input() badges: Badge[] = [];
}
