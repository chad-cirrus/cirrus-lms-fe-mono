import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentStudentsComponent } from './recent-students.component';

describe('RecentStudentsComponent', () => {
  let component: RecentStudentsComponent;
  let fixture: ComponentFixture<RecentStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentStudentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
