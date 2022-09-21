import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightHoursChartComponent } from './flight-hours-chart.component';

describe('FlightHoursChartComponent', () => {
  let component: FlightHoursChartComponent;
  let fixture: ComponentFixture<FlightHoursChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightHoursChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightHoursChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
