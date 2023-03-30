import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogbookComponent } from './logbook.component';
import { LogbookStat } from '../../../models/IRecentActivity';

describe('LogbookComponent', () => {
  let component: LogbookComponent;
  let fixture: ComponentFixture<LogbookComponent>;
  let logbookStats: LogbookStat[] = []

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogbookComponent ],
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
});
