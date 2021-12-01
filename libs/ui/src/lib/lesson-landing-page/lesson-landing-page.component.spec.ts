import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonLandingPageComponent } from './lesson-landing-page.component';

describe('LessonLandingPageComponent', () => {
  let component: LessonLandingPageComponent;
  let fixture: ComponentFixture<LessonLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
