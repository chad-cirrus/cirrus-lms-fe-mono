import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentActivityStudentComponent } from './recent-activity-student.component';

describe('RecentActivityComponent', () => {
  let component: RecentActivityStudentComponent;
  let fixture: ComponentFixture<RecentActivityStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentActivityStudentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentActivityStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
