import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ContentCounts,
  IBadge,
  ICertificate,
  ICourseOverview,
  ICourseOverviewLesson,
} from '@cirrus/models';

import { CourseOverviewComponent } from './course-overview.component';
import { MockComponent } from 'ng-mocks';
import {
  CourseOverviewLessonProgressBarComponent,
  CourseSummaryCountsComponent,
} from '@cirrus/ui';

const summaryCounts: ContentCounts = {};
const nextLesson: Partial<ICourseOverviewLesson> = {};
const badge: IBadge = {
  badge_image: '',
  desc: '',
  id: 0,
  isActive: false,
  name: '',
  progress: 0,
};
const certificate: ICertificate = { expiration: '' };

const course: ICourseOverview = {
  badge: badge,
  certificate: certificate,
  completed_at: '',
  course_attempt: {
    id: 0,
    user_course: {
      accepted_agreement: false,
      accepted_agreement_at: '',
      id: 234234,
    },
  },
  course_content_stats: [],
  hours_and_landings_stats: [],
  next_lesson: nextLesson,
  started_at: '',
  summary_counts: summaryCounts,
  thumbnail_image_url: '',
  id: 351,
  name: 'Private Pilot License Course ',
  major_version: 4,
  minor_version: 11,
  title: 'Private Pilot License Course ',
  subtitle: 'An introductory subhead to the Private Pilot License Course.',
  has_agreement: true,
  agreement_body:
    '\u003cp class="MsoNormal"\u003eThis training is limited to aircraft familiarization training and is not inclusive of all the knowledge and skill required for safe flight. I must comply with the regulations, exercise sound judgment, and maintain a high level of flying proficiency to minimize the risks associated with flight.\u0026nbsp;\u003c/p\u003e\u003cp class="MsoNormal"\u003e\u003cbr\u003e\u003c/p\u003e\u003cp class="MsoNormal"\u003eSafely flying under Instrument Flight Rules (IFR) requires peak levels of skill, sound decision making, and good risk management skills. Many IFR skills degrade over periods of inactivity and each pilot must assess risks for individual flights considering their proficiency levels required to handle forecasted weather, airspace, and other challenges that may arise. Pilots who desire to fly IFR are strongly encouraged to complete an Instrument Proficiency Check in 6-month intervals, regardless of IFR currency requirements.\u0026nbsp;\u0026nbsp;\u003c/p\u003e\u003cp class="MsoNormal"\u003e\u003cbr\u003e\u003c/p\u003e\u003cp class="MsoNormal"\u003eI acknowledge that for my continued proficiency and safety, Cirrus Aircraft strongly recommends that all pilots conduct recurrent training from an approved Cirrus Standardized Instructor Pilot (CSIP) or Cirrus Training Center (CTC).\u003c/p\u003e\u003cp class="MsoNormal"\u003e\u003cbr\u003e\u003c/p\u003e\u003cp class="MsoNormal"\u003eI acknowledge that my instructor will only observe my flight proficiency during this training for the task prescribed in this course. These tasks may not be inclusive of all the knowledge and skill required to safely fly under visual or instrument flight rules.\u003c/p\u003e',
  overview: '',
  completion_time: '1h 1m',
  minimum_flight_hours: 0,
  desktop_hero_image_url:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/fac20f6e5eb4f50962f0d7340ec9edSR20G3CourseThumbnail2.jpg',
  mobile_hero_image_url: '',
  can_reenroll: true,
  lessons_stats: { completed: 1, total: 15 },
  certificate_stats: { completed: 2, total: 3 },
  stages: [
    {
      id: 243,
      title: 'Course Intro',
      overview: '',
      order: 0,
      lessons_are_linear: false,
      lessons: [
        {
          id: 692,
          stage_id: 0,
          title: 'Welcome To Your Cirrus Training',
          order: 0,
          index: '1.1',
          thumbnail_image_url: '',
          lesson_type: 0,
          completion_time: '1h 1m',
          content_counts: { documents: 3 },
          progress: { id: 1775463, status: 'completed' },
        },
      ],
      progress: { id: 1775462, status: 'completed' },
    },
    {
      id: 244,
      title: 'Self Study',
      overview: '',
      order: 1,
      lessons_are_linear: false,
      lessons: [
        {
          id: 857,
          stage_id: 0,
          title: 'CAPS',
          order: 0,
          index: '2.1',
          thumbnail_image_url: '',
          lesson_type: 0,
          completion_time: '1h 1m',
          content_counts: { videos: 10 },
          progress: { id: 1775468, status: 'not_started' },
        },
        {
          id: 318,
          stage_id: 0,
          title: 'Takeoffs and Landings',
          order: 1,
          index: '2.2',
          thumbnail_image_url: '',
          lesson_type: 0,
          completion_time: '1h 1m',
          content_counts: { videos: 49 },
          progress: { id: 1775479, status: 'not_started' },
        },
        {
          id: 317,
          stage_id: 0,
          title: 'Engine Management',
          order: 2,
          index: '2.3',
          thumbnail_image_url: '',
          lesson_type: 0,
          completion_time: '1h 1m',
          content_counts: { videos: 6 },
          progress: { id: 1775529, status: 'not_started' },
        },
        {
          id: 595,
          stage_id: 0,
          title: 'Workbook',
          order: 3,
          index: '2.4',
          thumbnail_image_url: '',
          lesson_type: 0,
          completion_time: '1h 1m',
          content_counts: { documents: 3 },
          progress: { id: 1775536, status: 'not_started' },
        },
      ],
      progress: { id: 1775467, status: 'not_started' },
    },
    {
      id: 245,
      title: 'Transition',
      overview: '',
      order: 2,
      lessons_are_linear: false,
      lessons: [
        {
          id: 834,
          stage_id: 0,
          title: 'Lesson 1',
          order: 0,
          index: '3.1',
          thumbnail_image_url: '',
          lesson_type: 1,
          completion_time: '1h 1m',
          content_counts: { documents: 1, assessments: 1 },
          progress: { id: 1775541, status: 'not_started' },
        },
        {
          id: 835,
          stage_id: 0,
          title: 'Lesson 2',
          order: 1,
          index: '3.2',
          thumbnail_image_url: '',
          lesson_type: 2,
          completion_time: '1h 1m',
          content_counts: { assessments: 1 },
          progress: { id: 1775545, status: 'not_started' },
        },
        {
          id: 836,
          stage_id: 0,
          title: 'Lesson 3',
          order: 2,
          index: '3.3',
          thumbnail_image_url: '',
          lesson_type: 2,
          completion_time: '1h 1m',
          content_counts: { assessments: 1 },
          progress: { id: 1775547, status: 'not_started' },
        },
        {
          id: 837,
          stage_id: 0,
          title: 'Lesson 4',
          order: 3,
          index: '3.4',
          thumbnail_image_url: '',
          lesson_type: 2,
          completion_time: '1h 1m',
          content_counts: { assessments: 1 },
          progress: { id: 1775549, status: 'not_started' },
        },
        {
          id: 838,
          stage_id: 0,
          title: 'Lesson 5',
          order: 4,
          index: '3.5',
          thumbnail_image_url: '',
          lesson_type: 2,
          completion_time: '1h 1m',
          content_counts: { assessments: 1 },
          progress: { id: 1775551, status: 'not_started' },
        },
        {
          id: 839,
          stage_id: 0,
          title: 'Lesson 6',
          order: 5,
          index: '3.6',
          thumbnail_image_url: '',
          lesson_type: 2,
          completion_time: '1h 1m',
          content_counts: { assessments: 1 },
          progress: { id: 1775553, status: 'not_started' },
        },
      ],
      progress: { id: 1775540, status: 'not_started' },
    },
    {
      id: 246,
      title: 'Advanced',
      overview: '',
      order: 3,
      lessons_are_linear: false,
      lessons: [
        {
          id: 840,
          stage_id: 0,
          title: 'Lesson 7',
          order: 0,
          index: '4.1',
          thumbnail_image_url: '',
          lesson_type: 2,
          completion_time: '1h 1m',
          content_counts: { assessments: 1 },
          progress: { id: 1775556, status: 'not_started' },
        },
        {
          id: 841,
          stage_id: 0,
          title: 'Lesson 8',
          order: 1,
          index: '4.2',
          thumbnail_image_url: '',
          lesson_type: 2,
          completion_time: '1h 1m',
          content_counts: { assessments: 1 },
          progress: { id: 1775558, status: 'not_started' },
        },
        {
          id: 842,
          stage_id: 0,
          title: 'Lesson 9',
          order: 2,
          index: '4.3',
          thumbnail_image_url: '',
          lesson_type: 2,
          completion_time: '1h 1m',
          content_counts: { assessments: 1 },
          progress: { id: 1775560, status: 'not_started' },
        },
        {
          id: 843,
          stage_id: 0,
          title: 'Lesson 10',
          order: 3,
          index: '4.4',
          thumbnail_image_url: '',
          lesson_type: 2,
          completion_time: '1h 1m',
          content_counts: { assessments: 1 },
          progress: { id: 1775562, status: 'not_started' },
        },
      ],
      progress: { id: 1775555, status: 'not_started' },
    },
  ],
  progress: { id: 1775461, status: 'in_progress' },
};

describe('CourseOverviewComponent', () => {
  let component: CourseOverviewComponent;
  let fixture: ComponentFixture<CourseOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CourseOverviewComponent,
        MockComponent(CourseSummaryCountsComponent),
        MockComponent(CourseOverviewLessonProgressBarComponent),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOverviewComponent);
    component = fixture.componentInstance;
    component.courseOverview = course;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
