import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalFlightHoursComponent } from './total-flight-hours.component';

describe('TotalFlightHoursComponent', () => {
  let component: TotalFlightHoursComponent;
  let fixture: ComponentFixture<TotalFlightHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalFlightHoursComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalFlightHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
