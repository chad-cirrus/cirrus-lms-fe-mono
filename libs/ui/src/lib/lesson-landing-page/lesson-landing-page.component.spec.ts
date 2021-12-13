import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonLandingPageComponent } from './lesson-landing-page.component';

import { testData } from '../../testing/testData';
import { ProgressCardComponent } from '../progress-card/progress-card.component';
import { CirrusMaterialModule } from '@cirrus/ui';
import { LessonContentItemComponent } from '../lesson-content-item/lesson-content-item.component';

describe('LessonLandingPageComponent', () => {
  let component: LessonLandingPageComponent;
  let fixture: ComponentFixture<LessonLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirrusMaterialModule],
      declarations: [
        LessonLandingPageComponent,
        ProgressCardComponent,
        LessonContentItemComponent,
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
