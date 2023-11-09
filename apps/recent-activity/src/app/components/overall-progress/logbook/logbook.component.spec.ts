import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogbookComponent } from './logbook.component';
import { LogbookStat } from '../../../models/IRecentActivity';
import { ImageFormatterPipe } from '../../../image-formatter.pipe';
import { FormatLogbookTypePipe } from './format-logbook-type.pipe';

describe('LogbookComponent', () => {
  let component: LogbookComponent;
  let fixture: ComponentFixture<LogbookComponent>;
  let logbookStats: LogbookStat[] = []

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogbookComponent, ImageFormatterPipe, FormatLogbookTypePipe ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookComponent);
    component = fixture.componentInstance;
    component.logbookStats = logbookStats;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly format the logbook stats', () => {
    component.logbookStats = mockLogBookStats();
    fixture.detectChanges();
    const logbookElement = fixture.debugElement.nativeElement;
    const logbookStatsElement = logbookElement.querySelectorAll('.total');
    expect(logbookStatsElement[0].textContent).toEqual('279.0');
    expect(logbookStatsElement[1].textContent).toEqual('94.5');
    expect(logbookStatsElement[2].textContent).toEqual('42.0');
    expect(logbookStatsElement[3].textContent).toEqual('254.5');
    expect(logbookStatsElement[4].textContent).toEqual('6.0');
  });

  it('should not display stats when logbookStats is empty', () => {
    component.logbookStats = [];
    fixture.detectChanges();
    const logbookElement = fixture.debugElement.nativeElement;
    const logbookStatsElement = logbookElement.querySelectorAll('.total');
    expect(logbookStatsElement[0]).toBeFalsy();
  });
});

function mockLogBookStats(): LogbookStat[] {
  return [
    { type: 'completed_total_hours', completed: 279, calendar_completed: []},
    { type: 'completed_sim_hours', completed: 94.55, calendar_completed: []},
    { type: 'completed_actual_instrument_hours', completed: 42, calendar_completed: []},
    { type: 'completed_ground_instruction_hours', completed: 254.5, calendar_completed: []},
    { type: 'completed_cross_country_hours', completed: 6, calendar_completed: []},
    { type: 'rolling_calendar_flight_logs', completed: 0, calendar_completed: [
      { total: 0, month: 'DEC', year: '2022'},
      { total: 0, month: 'JAN', year: '2023'},
      { total: 0, month: 'FEB', year: '2023'}
    ]}
  ];
}
