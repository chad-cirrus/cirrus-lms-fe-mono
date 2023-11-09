import { Component, Input } from '@angular/core';
import { LogbookStat } from '../../../models/IRecentActivity';

@Component({
  selector: 'cirrus-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.scss'],
})
export class LogbookComponent {
  @Input() logbookStats!: LogbookStat[];

  public get logbookSubset(): LogbookStat[] {
    return this.logbookStats.slice(0, 5).map((logbookStat) => ({
      ...logbookStat,
      completed: typeof logbookStat.completed === 'number'
        ? Number(logbookStat.completed).toFixed(1)
        : logbookStat.completed,
    }));
  }
}
