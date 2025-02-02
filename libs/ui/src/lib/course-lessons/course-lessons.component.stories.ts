import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { MatMenuModule } from '@angular/material/menu';

import { ICourseOverviewStage } from '@cirrus/models';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CourseLessonContentCountComponent } from '../course-lesson-content-count/course-lesson-content-count.component';
import { CourseLessonItemComponent } from '../course-lesson-item/course-lesson-item.component';
import { MatIconRegistryModule } from '../mat-icon-registry.module';
import { CourseLessonsComponent } from './course-lessons.component';
import { FilterComponent } from '../filter/filter.component';
import { FormatFilterPipe } from '../format-filter.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

const mockEnvironment = {
  production: false,
  baseUrl: 'http://cirrusapproach.local:3000',
  profile:
    'https://cirfullsb-cirrusaircraftvpo.cs41.force.com/approachsso/s/profile/',
  defaultMobileLesson:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-mobile.jpg',
  defaultDesktopLesson:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-desktop.jpg',
};

const stages: ICourseOverviewStage[] = [
  {
    id: 243,
    title: 'Course Intro',
    overview: '',
    order: 0,
    lessons_are_linear: false,
    lessons: [
      {
        id: 692,
        title: 'Welcome To Your Cirrus Training',
        order: 0,
        index: '1.1',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { documents: 3 },
        progress: { id: 1775463, status: 'completed' },
        stage_id: 243,
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
        title: 'CAPS',
        order: 0,
        index: '2.1',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { videos: 10 },
        progress: { id: 1775468, status: 'not_started' },
        stage_id: 244,
      },
      {
        id: 318,
        title: 'Takeoffs and Landings',
        order: 1,
        index: '2.2',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { videos: 49 },
        progress: { id: 1775479, status: 'not_started' },
        stage_id: 244,
      },
      {
        id: 317,
        title: 'Engine Management',
        order: 2,
        index: '2.3',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { videos: 6 },
        progress: { id: 1775529, status: 'not_started' },
        stage_id: 244,
      },
      {
        id: 595,
        title: 'Workbook',
        order: 3,
        index: '2.4',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { documents: 3 },
        progress: { id: 1775536, status: 'not_started' },
        stage_id: 244,
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
        title: 'Lesson 1',
        order: 0,
        index: '3.1',
        thumbnail_image_url: '',
        lesson_type: 1,
        completion_time: '1h 1m',
        content_counts: { documents: 1, assessments: 1 },
        progress: { id: 1775541, status: 'not_started' },
        stage_id: 245,
      },
      {
        id: 835,
        title: 'Lesson 2',
        order: 1,
        index: '3.2',
        thumbnail_image_url: '',
        lesson_type: 2,
        completion_time: '1h 1m',
        content_counts: { assessments: 1 },
        progress: { id: 1775545, status: 'not_started' },
        stage_id: 245,
      },
      {
        id: 836,
        title: 'Lesson 3',
        order: 2,
        index: '3.3',
        thumbnail_image_url: '',
        lesson_type: 2,
        completion_time: '1h 1m',
        content_counts: { assessments: 1 },
        progress: { id: 1775547, status: 'not_started' },
        stage_id: 245,
      },
      {
        id: 837,
        title: 'Lesson 4',
        order: 3,
        index: '3.4',
        thumbnail_image_url: '',
        lesson_type: 2,
        completion_time: '1h 1m',
        content_counts: { assessments: 1 },
        progress: { id: 1775549, status: 'not_started' },
        stage_id: 245,
      },
      {
        id: 838,
        title: 'Lesson 5',
        order: 4,
        index: '3.5',
        thumbnail_image_url: '',
        lesson_type: 2,
        completion_time: '1h 1m',
        content_counts: { assessments: 1 },
        progress: { id: 1775551, status: 'not_started' },
        stage_id: 245,
      },
      {
        id: 839,
        title: 'Lesson 6',
        order: 5,
        index: '3.6',
        thumbnail_image_url: '',
        lesson_type: 2,
        completion_time: '1h 1m',
        content_counts: { assessments: 1 },
        progress: { id: 1775553, status: 'not_started' },
        stage_id: 245,
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
        title: 'Lesson 7',
        order: 0,
        index: '4.1',
        thumbnail_image_url: '',
        lesson_type: 2,
        completion_time: '1h 1m',
        content_counts: { assessments: 1 },
        progress: { id: 1775556, status: 'not_started' },
        stage_id: 246,
      },
      {
        id: 841,
        title: 'Lesson 8',
        order: 1,
        index: '4.2',
        thumbnail_image_url: '',
        lesson_type: 2,
        completion_time: '1h 1m',
        content_counts: { assessments: 1 },
        progress: { id: 1775558, status: 'not_started' },
        stage_id: 246,
      },
      {
        id: 842,
        title: 'Lesson 9',
        order: 2,
        index: '4.3',
        thumbnail_image_url: '',
        lesson_type: 2,
        completion_time: '1h 1m',
        content_counts: { assessments: 1 },
        progress: { id: 1775560, status: 'not_started' },
        stage_id: 246,
      },
      {
        id: 843,
        title: 'Lesson 10',
        order: 3,
        index: '4.4',
        thumbnail_image_url: '',
        lesson_type: 2,
        completion_time: '1h 1m',
        content_counts: { assessments: 1 },
        progress: { id: 1775562, status: 'not_started' },
        stage_id: 246,
      },
    ],
    progress: { id: 1775555, status: 'not_started' },
  },
];

export default {
  title: 'Course Lessons',
  component: CourseLessonsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FlexLayoutModule,
        MatIconModule,
        MatIconRegistryModule,
        MatDividerModule,
        MatMenuModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatDialogModule,
      ],
      declarations: [
        CourseLessonItemComponent,
        CourseLessonContentCountComponent,
        FilterComponent,
        FormatFilterPipe,
      ],
      providers: [
        {
          provide: 'environment',
          useValue: mockEnvironment,
        },
      ],
    }),
  ],
} as Meta<CourseLessonsComponent>;

const Template: Story<CourseLessonsComponent> = (
  args: CourseLessonsComponent
) => ({ props: args });

export const Primary = Template.bind({});
Primary.args = {
  stages: stages,
};
