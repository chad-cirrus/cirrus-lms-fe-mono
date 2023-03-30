import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOverviewLessonProgressBarComponent } from './course-overview-lesson-progress-bar.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';

describe('CourseOverviewLessonProgressBarComponent', () => {
  let component: CourseOverviewLessonProgressBarComponent;
  let fixture: ComponentFixture<CourseOverviewLessonProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, MatIconTestingModule, MatProgressBarModule],
      declarations: [CourseOverviewLessonProgressBarComponent, MatIcon]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOverviewLessonProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
