import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallProgressComponent } from './overall-progress.component';
import { OverallProgress } from '../../models/IRecentActivity';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { LogbookComponent } from './logbook/logbook.component';
import { CourseworkComponent } from './coursework/coursework.component';
import { IACRAComponent } from './iacra/iacra.component';
import { CirrusChartComponent } from '../chart/chart.component';

describe('OverallProgressComponent', () => {
  let component: OverallProgressComponent;
  let fixture: ComponentFixture<OverallProgressComponent>;
  let overallProgress: OverallProgress = { course_work_stats: [], flight_hours: [], iacra_stats: [], logbook_stats: [] };

  beforeEach(async () => {
    // @ts-ignore
    await TestBed.configureTestingModule({
      declarations: [
        OverallProgressComponent,
        MockComponent(LogbookComponent),
        MockComponent(CirrusChartComponent),
        MockComponent(CourseworkComponent),
        MockComponent(IACRAComponent),
      ],
      imports: [MatTabsModule, NoopAnimationsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallProgressComponent);
    component = fixture.componentInstance;
    component.overallProgress = overallProgress;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
