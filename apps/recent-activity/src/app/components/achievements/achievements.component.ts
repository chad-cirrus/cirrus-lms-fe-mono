import { Component, Input } from '@angular/core';
import { Achievements } from '../../models/IRecentActivity';

@Component({
  selector: 'cirrus-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent {
  @Input() achievements: Achievements = {
    certificates: [],
    badges: [],
  };

  view() {
    console.log('veiw');
  }
}
