import { Component, Input } from '@angular/core';
import { LogbookStat } from '../../../models/IRecentActivity';

@Component({
  selector: 'cirrus-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.scss'],
})
export class LogbookComponent {
  @Input() logbookStats!: LogbookStat[];
}
