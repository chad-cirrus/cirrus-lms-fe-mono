import { Component, Input } from '@angular/core';
import { OverallProgress } from '../../models/IRecentActivity';

@Component({
  selector: 'cirrus-overall-progress',
  templateUrl: './overall-progress.component.html',
  styleUrls: ['./overall-progress.component.scss'],
})
export class OverallProgressComponent {
  @Input() overallProgress!: OverallProgress;
}
