import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProgressComponent } from './course-progress.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

describe('CourseProgressComponent', () => {
  let component: CourseProgressComponent;
  let fixture: ComponentFixture<CourseProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatProgressBarModule],
      declarations: [ CourseProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
