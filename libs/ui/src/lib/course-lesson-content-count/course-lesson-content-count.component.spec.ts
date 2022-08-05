import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonContentCountComponent } from './course-lesson-content-count.component';

describe('CourseLessonContentCountComponent', () => {
  let component: CourseLessonContentCountComponent;
  let fixture: ComponentFixture<CourseLessonContentCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseLessonContentCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonContentCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
