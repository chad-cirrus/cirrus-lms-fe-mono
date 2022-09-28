import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirrusChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: CirrusChartComponent;
  let fixture: ComponentFixture<CirrusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CirrusChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirrusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
