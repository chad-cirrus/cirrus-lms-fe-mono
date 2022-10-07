import { Component, Input, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  ChartColors,
  CourseWorkChartColors,
  LogBookChartColors,
} from '../../models/ChartColors';
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
    hours: [],
    chartColors: [],
    title: '',
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

    const data =
      this.tabIndex === 0
        ? {
            hours: this.overallProgress.logbook_stats[5].completed,
            chartColors: LogBookChartColors,
            title: 'Flight Hours in the Last 12 Months',
          }
        : {
            hours: this.overallProgress.course_work_stats[5].completed,
            chartColors: CourseWorkChartColors,
            title: 'Lessons Completed in the Last 12 Months',
          };
    this.chartDataSubject.next(data);
  }
}
