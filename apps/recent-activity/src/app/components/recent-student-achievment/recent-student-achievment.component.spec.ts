import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentStudentAchievmentComponent } from './recent-student-achievment.component';

describe('RecentStudentAchievmentComponent', () => {
  let component: RecentStudentAchievmentComponent;
  let fixture: ComponentFixture<RecentStudentAchievmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentStudentAchievmentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentStudentAchievmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
