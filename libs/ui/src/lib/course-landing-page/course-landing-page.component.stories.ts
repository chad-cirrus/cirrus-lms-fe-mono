import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CourseLandingPageComponent } from './course-landing-page.component';
import { EncodeUriPipe } from '../encode-uri.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { CourseProgressComponent } from '../course-progress/course-progress.component';
import { CoursePlayerComponent } from '../course-player/course-player.component';
import { CourseOverviewComponent } from '../course-overview/course-overview.component';
import { CourseOverviewLessonProgressBarComponent } from '../course-overview-lesson-progress-bar/course-overview-lesson-progress-bar.component';
import { CourseContentProgressCircleComponent } from '../course-content-progress-circle/course-content-progress-circle.component';
import { CourseSummaryCountsComponent } from '../course-summary-counts/course-summary-counts.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CtaButtonComponent } from '../cta-button/cta-button.component';
import { HoursAndLandingStatType, PROGRESS_STATUS } from '@cirrus/models';
import { RouterModule } from '@angular/router';

export default {
  title: 'Course Landing Page',
  component: CourseLandingPageComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FlexLayoutModule,
        MatDividerModule,
        MatProgressBarModule,
        RouterModule.forRoot([], { useHash: true }),
      ],
      declarations: [
        EncodeUriPipe,
        CourseProgressComponent,
        CoursePlayerComponent,
        CourseOverviewComponent,
        CourseOverviewLessonProgressBarComponent,
        CourseContentProgressCircleComponent,
        CourseSummaryCountsComponent,
        CtaButtonComponent,
      ],
    }),
  ],
} as Meta<CourseLandingPageComponent>;

const Template: Story<CourseLandingPageComponent> = (
  args: CourseLandingPageComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  course: {
    id: 351,
    name: 'SR20 Avidyne Entegra Advanced Transition ',
    major_version: 4,
    minor_version: 11,
    title: 'SR20 Avidyne Entegra Advanced Transition ',
    subtitle: '',
    has_agreement: true,
    thumbnail_image_url: '',
    hours_and_landings_stats: [
      { type: HoursAndLandingStatType.completed_total_hours, completed: 0 },
      {
        type: HoursAndLandingStatType.completed_ground_instruction_hours,
        completed: 0,
      },
      { type: HoursAndLandingStatType.completed_sim_hours, completed: 0 },
      {
        type: HoursAndLandingStatType.completed_cross_country_hours,
        completed: 0,
      },
      { type: HoursAndLandingStatType.completed_total_landings, completed: 0 },
    ],
    certificate: {
      expiration: null,
    },
    course_content_stats: [
      {
        type: 'self_study',
        completed: 13,
        total: 73,
      },
      {
        type: 'flight_assessment',
        completed: 1,
        total: 9,
      },
      {
        type: 'ground_assessment',
        completed: 1,
        total: 1,
      },
    ],
    agreement_body:
      '\u003cp class="MsoNormal"\u003eThis training is limited to aircraft familiarization training and is not inclusive of all the knowledge and skill required for safe flight. I must comply with the regulations, exercise sound judgment, and maintain a high level of flying proficiency to minimize the risks associated with flight.\u0026nbsp;\u003c/p\u003e\u003cp class="MsoNormal"\u003e\u003cbr\u003e\u003c/p\u003e\u003cp class="MsoNormal"\u003eSafely flying under Instrument Flight Rules (IFR) requires peak levels of skill, sound decision making, and good risk management skills. Many IFR skills degrade over periods of inactivity and each pilot must assess risks for individual flights considering their proficiency levels required to handle forecasted weather, airspace, and other challenges that may arise. Pilots who desire to fly IFR are strongly encouraged to complete an Instrument Proficiency Check in 6-month intervals, regardless of IFR currency requirements.\u0026nbsp;\u0026nbsp;\u003c/p\u003e\u003cp class="MsoNormal"\u003e\u003cbr\u003e\u003c/p\u003e\u003cp class="MsoNormal"\u003eI acknowledge that for my continued proficiency and safety, Cirrus Aircraft strongly recommends that all pilots conduct recurrent training from an approved Cirrus Standardized Instructor Pilot (CSIP) or Cirrus Training Center (CTC).\u003c/p\u003e\u003cp class="MsoNormal"\u003e\u003cbr\u003e\u003c/p\u003e\u003cp class="MsoNormal"\u003eI acknowledge that my instructor will only observe my flight proficiency during this training for the task prescribed in this course. These tasks may not be inclusive of all the knowledge and skill required to safely fly under visual or instrument flight rules.\u003c/p\u003e',
    completion_time: '',
    minimum_flight_hours: 0,
    desktop_hero_image_url: '',
    mobile_hero_image_url: '',
    can_reenroll: true,
    lessons_stats: {
      completed: 2,
      total: 15,
    },
    summary_counts: {
      lessons: 15,
      videos: 65,
      documents: 7,
      assessments: 10,
    },
    stages: [
      {
        id: 243,
        title: 'Course Intro',
        desc: '',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 692,
            title: 'Welcome To Your Cirrus Training',
            subtitle: '',
            order: 0,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '',
            content_counts: {
              documents: 3,
            },
            progress: {
              id: 1775463,
              status: 'completed',
            },
            stage_id: 243,
          },
        ],
        progress: {
          id: 1775462,
          status: 'completed',
        },
      },
      {
        id: 244,
        title: 'Self Study',
        desc: '',
        overview: '',
        order: 1,
        lessons_are_linear: false,
        lessons: [
          {
            id: 857,
            title: 'CAPS',
            subtitle: '',
            order: 0,
            index: '2.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '',
            content_counts: {
              videos: 10,
            },
            progress: {
              id: 1775468,
              status: 'completed',
            },
            stage_id: 244,
          },
          {
            id: 318,
            title: 'Takeoffs and Landings',
            subtitle: '',
            order: 1,
            index: '2.2',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '',
            content_counts: {
              videos: 49,
            },
            progress: {
              id: 1775479,
              status: 'not_started',
            },
            stage_id: 244,
          },
          {
            id: 317,
            title: 'Engine Management',
            subtitle: '',
            order: 2,
            index: '2.3',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '',
            content_counts: {
              videos: 6,
            },
            progress: {
              id: 1775529,
              status: 'not_started',
            },
            stage_id: 244,
          },
          {
            id: 595,
            title: 'Workbook',
            subtitle: '',
            order: 3,
            index: '2.4',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '',
            content_counts: {
              documents: 3,
            },
            progress: {
              id: 1775536,
              status: 'not_started',
            },
            stage_id: 244,
          },
        ],
        progress: {
          id: 1775467,
          status: 'in_progress',
        },
      },
      {
        id: 245,
        title: 'Transition',
        desc: '',
        overview: '',
        order: 2,
        lessons_are_linear: false,
        lessons: [
          {
            id: 834,
            title: 'Lesson 1',
            subtitle: '',
            order: 0,
            index: '3.1',
            thumbnail_image_url: '',
            lesson_type: 1,
            completion_time: '',
            content_counts: {
              documents: 1,
              assessments: 1,
            },
            progress: {
              id: 1775541,
              status: 'not_started',
            },
            stage_id: 245,
          },
          {
            id: 835,
            title: 'Lesson 2',
            subtitle: '',
            order: 1,
            index: '3.2',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: {
              assessments: 1,
            },
            progress: {
              id: 1775545,
              status: 'not_started',
            },
            stage_id: 245,
          },
          {
            id: 836,
            title: 'Lesson 3',
            subtitle: '',
            order: 2,
            index: '3.3',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: {
              assessments: 1,
            },
            progress: {
              id: 1775547,
              status: 'not_started',
            },
            stage_id: 245,
          },
          {
            id: 837,
            title: 'Lesson 4',
            subtitle: '',
            order: 3,
            index: '3.4',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: {
              assessments: 1,
            },
            progress: {
              id: 1775549,
              status: 'not_started',
            },
            stage_id: 245,
          },
          {
            id: 838,
            title: 'Lesson 5',
            subtitle: '',
            order: 4,
            index: '3.5',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: {
              assessments: 1,
            },
            progress: {
              id: 1775551,
              status: 'not_started',
            },
            stage_id: 245,
          },
          {
            id: 839,
            title: 'Lesson 6',
            subtitle: '',
            order: 5,
            index: '3.6',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: {
              assessments: 1,
            },
            progress: {
              id: 1775553,
              status: 'not_started',
            },
            stage_id: 245,
          },
        ],
        progress: {
          id: 1775540,
          status: 'not_started',
        },
      },
      {
        id: 246,
        title: 'Advanced',
        desc: '',
        overview: '',
        order: 3,
        lessons_are_linear: false,
        lessons: [
          {
            id: 840,
            title: 'Lesson 7',
            subtitle: '',
            order: 0,
            index: '4.1',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: {
              assessments: 1,
            },
            progress: {
              id: 1775556,
              status: 'not_started',
            },
            stage_id: 246,
          },
          {
            id: 841,
            title: 'Lesson 8',
            subtitle: '',
            order: 1,
            index: '4.2',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: {
              assessments: 1,
            },
            progress: {
              id: 1775558,
              status: 'not_started',
            },
            stage_id: 246,
          },
          {
            id: 842,
            title: 'Lesson 9',
            subtitle: '',
            order: 2,
            index: '4.3',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: {
              assessments: 1,
            },
            progress: {
              id: 1775560,
              status: 'not_started',
            },
            stage_id: 246,
          },
          {
            id: 843,
            title: 'Lesson 10',
            subtitle: '',
            order: 3,
            index: '4.4',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: {
              assessments: 1,
            },
            progress: {
              id: 1775562,
              status: 'not_started',
            },
            stage_id: 246,
          },
        ],
        progress: {
          id: 1775555,
          status: 'not_started',
        },
      },
    ],
    progress: {
      id: 1775461,
      status: 'in_progress',
    },
    enrollments: [
      {
        id: 119061,
        course_version: '1.14',
        enrollment_date: '06/10/22 - present',
        transcript_available: false,
        progress: {
          id: 1775461,
          status: PROGRESS_STATUS.in_progress,
        },
        user_certificate: { id: 0, expires_on: '' },
      },
    ],
    next_lesson: {
      id: 692,
      title: 'Welcome To Your Cirrus Training',
      subtitle: '',
      order: 0,
      index: '1.1',
      thumbnail_image_url: '',
      lesson_type: 0,
      completion_time: '',
      content_counts: {
        documents: 3,
      },
    },
  },
};
