import { Component, Input, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BehaviorSubject } from 'rxjs';
import {
  ChartColors,
  StudentTaskPerformanceColors,
} from '../../models/ChartColors';
import { ChartData, HorizontalChartData } from '../../models/ChartData';
import {
  StudentTaskPerformance,
  MostMissedTask,
  MostPassedTask,
} from '../../models/IRecentActivityInstructors';
import { RecentActivityService } from '../../services/recent-activity.service';

@Component({
  selector: 'cirrus-student-task-performance',
  templateUrl: './student-task-performance.component.html',
  styleUrls: ['./student-task-performance.component.scss'],
})
export class StudentTaskPerformanceComponent implements OnInit {
  tabIndex = 0;

  selected = '';

  missedTasks: MostMissedTask[] = [];
  passedTasks: MostPassedTask[] = [];

  chartColors!: ChartColors;
  private chartDataSubject = new BehaviorSubject<HorizontalChartData>({
    data: [],
    chartColors: { gradientFromColors: [], gradientToColors: [] },
    title: '',
    csvRightColumnTitle: '',
  });
  chartDataObservable$ = this.chartDataSubject.asObservable();

  constructor(private recentActivityService: RecentActivityService) {}

  ngOnInit(): void {
    this.recentActivityService
      .getStudentTaskPerformance(this.selected)
      .subscribe(data => {
        this.assignData(data);
      });
  }

  filterChanged() {
    this.recentActivityService
      .getStudentTaskPerformance(this.selected)
      .subscribe(data => {
        this.assignData(data);
      });
  }

  assignData(data: StudentTaskPerformance) {
    this.passedTasks = data.top_passed_tasks;
    this.missedTasks = data.top_missed_tasks;
    this.formatChartData();
  }

  tabChanged(e: MatTabChangeEvent) {
    this.tabIndex = e.index;
    this.formatChartData();
  }

  formatChartData() {
    const data: HorizontalChartData =
      this.tabIndex === 0
        ? {
            data: this.passedTasks,
            chartColors: StudentTaskPerformanceColors,
            title: '',
            csvRightColumnTitle: 'Top Passed Tasks',
          }
        : {
            data: this.missedTasks,
            chartColors: StudentTaskPerformanceColors,
            title: '',
            csvRightColumnTitle: 'Top Missed Tasks',
          };
    this.chartDataSubject.next(data);
  }
}
