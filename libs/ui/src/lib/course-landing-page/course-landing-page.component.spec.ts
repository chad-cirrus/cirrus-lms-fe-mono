import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLandingPageComponent } from './course-landing-page.component';
import { CoursePlayerComponent } from '../course-player/course-player.component';
import { CourseProgressComponent } from '../course-progress/course-progress.component';
import { UiDownloadService } from '../course-completion/ui-download.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  ContentCounts,
  IBadge,
  ICertificate,
  ICertificatestats,
  IContent,
  ICourseOverview,
  ICourseOverviewLesson,
  ILessonsstats,
  IProgress,
} from '@cirrus/models';
import { MatDividerModule } from '@angular/material/divider';
import { MockComponent } from 'ng-mocks';
import { HttpClientModule } from '@angular/common/http';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';
import { anonymize } from '@fullstory/browser';
import { of } from 'rxjs';
import { FullstoryService } from '../lib-services/fullstory/fullstory.service';

describe('CourseLandingPageComponent', () => {
  let component: CourseLandingPageComponent;
  let fixture: ComponentFixture<CourseLandingPageComponent>;
  const environment: Record<string, unknown> = {};
  const summaryCounts: ContentCounts = {};
  const progress: IProgress = { id: 0, status: '' };
  const lesson: Partial<ICourseOverviewLesson> = {};
  const lessonStats: ILessonsstats = { completed: 0, total: 0 };
  const certificateStats: ICertificatestats = { completed: 0, total: 0 };
  const certificate: ICertificate = { expiration: '' };
  const badge: IBadge = {
    badge_image: '',
    desc: '',
    id: 0,
    isActive: false,
    name: '',
    progress: 0,
  };
  const course: ICourseOverview = {
    agreement_body: '',
    badge: badge,
    can_reenroll: false,
    certificate: certificate,
    completed_at: '',
    course_attempt: {
      id: 1234,
      user_course: {
        accepted_agreement: false,
        accepted_agreement_at: '',
        id: 234234,
      },
    },
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
    title: '',
    certificate_stats: certificateStats,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CourseLandingPageComponent,
        MockComponent(CourseProgressComponent),
        MockComponent(CoursePlayerComponent),
      ],
      imports: [MatDialogModule, MatDividerModule, HttpClientModule],
      providers: [
        { provide: UiDownloadService, useClass: MockUIDownloadService },
        { provide: CirrusSanitizerService, useClass: MockCirrusSanitizerService },
        { provide: 'environment', useValue: environment },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: FullstoryService, useClass: MockFullstoryService}
      ],
    }).compileComponents();
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

  it('should hide watch preview cta in header when user is enrolled and intro video is null', () => {
    const courseLandingPageElement = fixture.debugElement.nativeElement;
    expect(courseLandingPageElement.querySelector('.watch-course-intro')).toBeFalsy();
  });

  it('should show watch preview cta in header when user is enrolled and intro video is truthy', () => {
    component.course = {...course, course_overview_video: mockCourseOverviewVideo()};
    fixture.detectChanges();
    const courseLandingPageElement = fixture.debugElement.nativeElement;
    expect(courseLandingPageElement.querySelector('.watch-course-intro')).toBeTruthy();
  });
});

// class MockUIDownloadService {}
class MockCirrusSanitizerService {}

function mockCourseOverviewVideo(): IContent {
  return {
    id: 401,
    order: 0,
    title: 'Course Intro Video',
    subtitle: 'This is the Course Intro Video',
    progress: { id: 1, status: 'not_completed' },
    score: 0,
    url: '309005652',
    meta_tags: [],
    content_tasks: [],
    quiz: '',
    content_type: 0,
    desc: 'Perspective & Perspective+ Avionics Course',
    content_file: '',
    placeholder_image:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/content-files/5c480eb38443724475091bf0d91ba12.2.png',
    jet_scoring: false,
    content_html: '',
    created_by: '',
    upload_image: '',
    content_filename: '',
    starter_file: '',
    blob_directory: '',
    show_comments: false,
    courseTitle: ''
  };
}

class MockUIDownloadService {
  getCourse(course_id: number): any {
    return of('');
  }
}

class MockFullstoryService {}
