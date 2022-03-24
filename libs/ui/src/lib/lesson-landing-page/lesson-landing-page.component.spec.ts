import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonLandingPageComponent } from './lesson-landing-page.component';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CirrusMaterialModule } from '@cirrus/ui';
import { testData } from '@cirrus/models';

import { MockComponent } from 'ng-mocks';
import { LessonContentsComponent } from '../lesson-contents/lesson-contents.component';
import { LessonProgressComponent } from '../lesson-progress/lesson-progress.component';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('LessonLandingPageComponent', () => {
  let component: LessonLandingPageComponent;
  let fixture: ComponentFixture<LessonLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirrusMaterialModule, FlexLayoutModule],
      declarations: [
        LessonLandingPageComponent,
        MockComponent(LessonContentsComponent),
        MockComponent(LessonProgressComponent),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', () => {
    component.lesson = testData;

    fixture.detectChanges();
    const titleElement = fixture.debugElement.nativeElement;

    expect(titleElement.querySelector('h1').textContent).toContain('Systems');
    expect(titleElement.querySelector('h4').textContent).toContain(
      'SR Series Systems Self Study Lesson - Flight Training Courses'
    );
  });
});
