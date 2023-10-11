import { Component, Input } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BehaviorSubject } from 'rxjs';
import { ChartColors, CourseWorkChartColors, LogBookChartColors } from '../../models/ChartColors';
import { ChartData } from '../../models/ChartData';
import { OverallProgress } from '../../models/IRecentActivity';

@Component({
  selector: 'cirrus-overall-progress',
  templateUrl: './overall-progress.component.html',
  styleUrls: ['./overall-progress.component.scss'],
})
export class OverallProgressComponent {
  private _overallProgress!: OverallProgress;

  @Input()
  set overallProgress(value: OverallProgress) {
    if (value) {
      this._overallProgress = value;
      this.formatChartData();
    }
  }

  get overallProgress() {
    return this._overallProgress;
  }

  tabIndex = 0;
  chartColors!: ChartColors;
  private chartDataSubject = new BehaviorSubject<ChartData>({
    data: [],
    chartColors: { gradientFromColors: [], gradientToColors: [] },
    title: '',
    csvRightColumnTitle: '',
  });
  chartDataObservable$ = this.chartDataSubject.asObservable();

  tabChanged(e: MatTabChangeEvent) {
    this.tabIndex = e.index;
    this.formatChartData();
  }

  formatChartData() {
    if (
      !this.overallProgress.logbook_stats[5] ||
      !this._overallProgress.course_work_stats[5]
    ) {
      return;
    }
    const data: ChartData =
      this.tabIndex === 0
        ? {
            data: this.overallProgress.logbook_stats[5].calendar_completed,
            chartColors: LogBookChartColors,
            title: 'Flight Hours in the Last 12 Months',
            csvRightColumnTitle: 'Flight Hours',
          }
        : {
            data: this.overallProgress.course_work_stats[5].calendar_completed,
            chartColors: CourseWorkChartColors,
            title: 'Lessons Completed in the Last 12 Months',
            csvRightColumnTitle: 'Completed',
          };
    this.chartDataSubject.next(data);
  }
}
