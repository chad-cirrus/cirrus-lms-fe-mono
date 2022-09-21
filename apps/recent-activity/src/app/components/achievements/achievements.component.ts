import { Component, Input, OnInit } from '@angular/core';
import { Achievements } from '../../models/IRecentActivity';

@Component({
  selector: 'cirrus-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent {
  @Input() achievments!: Achievements;
}
