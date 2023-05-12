import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextLessonRedirectComponent } from './next-lesson-redirect.component';

describe('NextLessonRedirectComponent', () => {
  let component: NextLessonRedirectComponent;
  let fixture: ComponentFixture<NextLessonRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextLessonRedirectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NextLessonRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
