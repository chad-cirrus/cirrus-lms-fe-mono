import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonProgressStatsComponent } from './lesson-progress-stats.component';

describe('LessonProgressStatsComponent', () => {
  let component: LessonProgressStatsComponent;
  let fixture: ComponentFixture<LessonProgressStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonProgressStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonProgressStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
