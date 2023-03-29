import { Component, Input, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ChartColors,
  CourseWorkChartColors,
  FlightInstructionColors,
} from '../../models/ChartColors';
import { ChartData } from '../../models/ChartData';
import {
  FlightInstructionHour,
  FlightLogStatsType,
  InstructorFlightLogStats,
} from '../../models/IRecentActivityInstructors';

@Component({
  selector: 'cirrus-flight-instruction-hours',
  templateUrl: './flight-instruction-hours.component.html',
  styleUrls: ['./flight-instruction-hours.component.scss'],
})
export class FlightInstructionHoursComponent {
  private _flightInstructionsHours!: InstructorFlightLogStats[];
  flightHours!: InstructorFlightLogStats[];
  displayDateRange!: string;
  displayTotalHours!: number;

  @Input()
  set flightInstructionsHours(value: InstructorFlightLogStats[]) {
    if (value) {
      this.flightHours = value;
      this.formatChartData(value[0]);
    }
  }

  get flightInstructorHours() {
    return this._flightInstructionsHours;
  }

  selected: FlightLogStatsType = FlightLogStatsType.RollingCalendarFlightLogs;
  chartColors!: ChartColors;
  private chartDataSubject = new BehaviorSubject<ChartData>({
    data: [],
    chartColors: { gradientFromColors: [], gradientToColors: [] },
    title: '',
    csvRightColumnTitle: '',
  });
  chartDataObservable$ = this.chartDataSubject.asObservable();

  private togglePanel = new BehaviorSubject(false);
  togglePanel$ = this.togglePanel.asObservable();

  toggleMenu() {
    this.togglePanel.next(!this.togglePanel.value);
  }

  dateMapper(abbr: string | undefined): string | void {
    const obj: Record<string, string> = {
      JAN: '01',
      FEB: '02',
      MAR: '03',
      APR: '04',
      MAY: '05',
      JUN: '06',
      JUL: '07',
      AUG: '08',
      SEP: '09',
      OCT: '10',
      NOV: '11',
      DEC: '12',
    };
    if (abbr) {
      return obj[abbr];
    }
  }

  getTime(
    selected: FlightLogStatsType,
    flightHours: InstructorFlightLogStats[]
  ): InstructorFlightLogStats {
    const time = {
      rolling_calendar_flight_logs: flightHours[0],
      calendar_year_flight_logs: flightHours[1],
      weekly_flight_logs: flightHours[2],
    };

    return time[selected];
  }

  filterChanged(): void {
    const selectedFlightLogStats = this.getTime(
      this.selected,
      this.flightHours
    );
    this.formatChartData(selectedFlightLogStats);
  }

  formatDisplayDates(value: InstructorFlightLogStats): void {
    const firstCompleted = value.completed[0];
    const lastCompleted = value.completed[value.completed.length - 1];

    const firstAndLastWeek = `${firstCompleted.range} to ${lastCompleted.range}`;

    const firstAndLastMonth = (this.displayDateRange = `${this.dateMapper(
      firstCompleted.month
    )}/${firstCompleted.year} to ${this.dateMapper(lastCompleted.month)}/${
      lastCompleted.year
    }`);

    this.displayDateRange = value.completed[0].range
      ? firstAndLastWeek
      : firstAndLastMonth;
  }

  formatChartData(value: InstructorFlightLogStats) {
    if (!value) {
      return;
    }

    this.displayTotalHours = value.completed.reduce(
      (partialSum, num) => partialSum + num.total,
      0
    );

    this.formatDisplayDates(value);

    const data: ChartData = {
      data: value.completed,
      chartColors: FlightInstructionColors,
      title: '',
      csvRightColumnTitle: 'Flight Hours',
    };

    this.chartDataSubject.next(data);
  }
}
