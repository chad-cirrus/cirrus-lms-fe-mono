import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirrusHorizontalChartComponent } from './horizontal-chart.component';

describe('HorizontalChartComponent', () => {
  let component: CirrusHorizontalChartComponent;
  let fixture: ComponentFixture<CirrusHorizontalChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CirrusHorizontalChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirrusHorizontalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
