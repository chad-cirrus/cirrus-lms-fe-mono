import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseWorkChartColors } from '../../models/ChartColors';
import { ChartData } from '../../models/ChartData';
import { FlightLogStatsType } from '../../models/IRecentActivityInstructors';

import { FlightInstructionHoursComponent } from './flight-instruction-hours.component';

describe('FlightInstructionHoursComponent', () => {
  let component: FlightInstructionHoursComponent;
  let fixture: ComponentFixture<FlightInstructionHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightInstructionHoursComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightInstructionHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept an array of InstructorFlightLogStats as input', () => {
    const fixture = TestBed.createComponent(FlightInstructionHoursComponent);
    const component = fixture.componentInstance;
    const value = [
      {
        type: FlightLogStatsType.RollingCalendarFlightLogs,
        completed: [{ total: 50, month: 'APR', year: '2022' }],
      },
      {
        type: FlightLogStatsType.CalendarYearFlightLogs,
        completed: [{ total: 30, month: 'MAY', year: '2022' }],
      },
    ];

    component.flightInstructionsHours = value;
    fixture.detectChanges();

    expect(component.flightHours).toEqual(value);
  });

  it('should emit ChartData on chartDataObservable$', () => {
    const fixture = TestBed.createComponent(FlightInstructionHoursComponent);
    const component = fixture.componentInstance;
    const value: ChartData = {
      data: [
        { total: 50, month: 'JAN', year: '2023' },
        { total: 50, month: 'FEB', year: '2023' },
        { total: 50, month: 'MAR', year: '2023' },
        { total: 50, month: 'APR', year: '2023' },
        { total: 50, month: 'MAY', year: '2023' },
        { total: 50, month: 'JUN', year: '2023' },
        { total: 50, month: 'JUL', year: '2023' },
        { total: 50, month: 'AUG', year: '2023' },
        { total: 50, month: 'SEP', year: '2023' },
        { total: 50, month: 'OCT', year: '2023' },
        { total: 50, month: 'NOV', year: '2023' },
        { total: 50, month: 'DEC', year: '2023' },
      ],
      chartColors: CourseWorkChartColors,
      title: 'Flight Hours',
      csvRightColumnTitle: 'Flight Hours',
    };

    component['chartDataSubject'].next(value);
    fixture.detectChanges();

    component.chartDataObservable$.subscribe(data => {
      expect(data).toEqual(value);
    });
  });

  it('Should return a number abbreviation from a 3 letter string abbreviation', () => {
    const fixture = TestBed.createComponent(FlightInstructionHoursComponent);
    const component = fixture.componentInstance;
    const newFormattedDate = component.dateMapper('MAR');
    expect(newFormattedDate).toEqual('03');
  });
});
