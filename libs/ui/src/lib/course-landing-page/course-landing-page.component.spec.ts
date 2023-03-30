import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLandingPageComponent } from './course-landing-page.component';
import { CoursePlayerComponent, CourseProgressComponent, UiDownloadService } from '@cirrus/ui';
import { MatDialogModule } from '@angular/material/dialog';
import {
  ContentCounts,
  IBadge,
  ICertificate,
  ICourseOverview,
  ICourseOverviewLesson,
  ILessonsstats,
  IProgress,
} from '@cirrus/models';
import { MatDividerModule } from '@angular/material/divider';
import { MockComponent } from 'ng-mocks';

describe('CourseLandingPageComponent', () => {
  let component: CourseLandingPageComponent;
  let fixture: ComponentFixture<CourseLandingPageComponent>;
  let environment: Record<string, unknown> = {};
  let summaryCounts: ContentCounts = {};
  let progress: IProgress = { id: 0, status: '' };
  let lesson: Partial<ICourseOverviewLesson> = {};
  let lessonStats: ILessonsstats = { completed: 0, total: 0 };
  let certificate: ICertificate = { expiration: '' };
  let badge: IBadge = { badge_image: '', desc: '', id: 0, isActive: false, name: '', progress: 0 };
  let course: ICourseOverview = {
    agreement_body: '',
    badge: badge,
    can_reenroll: false,
    certificate: certificate,
    completed_at: '',
    course_attempt: { id: 0 },
    course_content_stats: [],
    desktop_hero_image_url: '',
    has_agreement: false,
    hours_and_landings_stats: [],
    id: 0,
    lessons_stats: lessonStats,
    major_version: 0,
    minimum_flight_hours: 0,
    minor_version: 0,
    mobile_hero_image_url: '',
    name: '',
    next_lesson: lesson,
    progress: progress,
    stages: [],
    started_at: '',
    subtitle: '',
    summary_counts: summaryCounts,
    thumbnail_image_url: '',
    title: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseLandingPageComponent, MockComponent(CourseProgressComponent), MockComponent(CoursePlayerComponent)],
      imports: [MatDialogModule, MatDividerModule],
      providers: [
        { provide: UiDownloadService, useClass: MockUIDownloadService },
        { provide: 'environment', useValue: environment },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLandingPageComponent);
    component = fixture.componentInstance;
    component.course = course;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockUIDownloadService {}
