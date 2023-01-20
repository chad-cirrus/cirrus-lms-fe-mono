import { Component, Input } from '@angular/core';

@Component({
  selector: 'cirrus-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  @Input() badgeNumber!: any;
}
