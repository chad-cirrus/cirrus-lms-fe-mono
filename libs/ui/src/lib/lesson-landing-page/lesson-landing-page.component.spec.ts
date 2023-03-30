import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonLandingPageComponent } from './lesson-landing-page.component';
import { courseOverview, testData } from '@cirrus/models';
import { MockComponent } from 'ng-mocks';
import { LessonContentsComponent } from '../lesson-contents/lesson-contents.component';
import { LessonProgressComponent } from '../lesson-progress/lesson-progress.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EncodeUriPipe } from '../encode-uri.pipe';
import { LessonProgressStatsComponent } from '../lesson-progress-stats/lesson-progress-stats.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatIcon } from '@angular/material/icon';
import { CtaButtonComponent } from '@cirrus/ui';

describe('LessonLandingPageComponent', () => {
  let component: LessonLandingPageComponent;
  let fixture: ComponentFixture<LessonLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexLayoutModule, MatDialogModule, MatDividerModule, MatIconTestingModule],
      declarations: [
        MatIcon,
        LessonLandingPageComponent,
        MockComponent(LessonContentsComponent),
        MockComponent(LessonProgressComponent),
        EncodeUriPipe,
        MockComponent(LessonProgressStatsComponent),
        MockComponent(CtaButtonComponent),
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
    component.courseOverview = courseOverview;

    fixture.detectChanges();
    const titleElement = fixture.debugElement.nativeElement;

    expect(titleElement.querySelector('h1').textContent).toContain('Systems');
    expect(titleElement.querySelector('p.large').textContent).toContain(
      'SR Series Systems Self Study Lesson - Flight Training Courses'
    );
  });
});
