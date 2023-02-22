import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentActivityInstructorComponent } from './recent-activity-instructor.component';

describe('RecentActivityInstructorComponent', () => {
  let component: RecentActivityInstructorComponent;
  let fixture: ComponentFixture<RecentActivityInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentActivityInstructorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentActivityInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
