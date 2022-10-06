import { Component, Input } from '@angular/core';
import { Badge } from '../../../models/IRecentActivity';

@Component({
  selector: 'cirrus-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss'],
})
export class BadgesComponent {
  private _badges: Badge[] = [];

  @Input()
  set badges(value: Badge[]) {
    this._badges = value;
  }

  get badges() {
    return this._badges.filter(b => b.achieved_on !== null).slice(0, 4);
  }
}
