import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ICourseOverviewLessons } from '@cirrus/models';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CourseLessonContentCountComponent } from '../course-lesson-content-count/course-lesson-content-count.component';
import { CourseLessonItemComponent } from '../course-lesson-item/course-lesson-item.component';
import { MatIconRegistryModule } from '../mat-icon-registry.module';
import { CourseLessonsComponent } from './course-lessons.component';

const mockEnvironment = {
  production: false,
  baseUrl: 'http://cirrusapproach.local:3000',
  profile:
    'https://cirfullsb-cirrusaircraftvpo.cs41.force.com/approachsso/s/profile/',
  defaultMobile:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-mobile.jpg',
  defaultDesktop:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-desktop.jpg',
};

const courseOverviewLessons: ICourseOverviewLessons = {
  id: 355,
  progress: {
    id: 154738,
    status: 'in_progress',
  },
  name: 'SR22T Airframe and Powerplant Differences',
  stages: [
    {
      id: 256,
      order: 0,
      title: 'Course Intro',
      progress: {
        id: 1683029,
        status: 'not_started',
      },
      overview:
        'Tail hamburger pork belly, alcatra meatball doner brisket buffalo pancetta swine tri-tip kielbasa tongue andouille t-bone. Pork turkey prosciutto shank bresaola meatball. Pork chop swine cupim, frankfurter salami bresaola biltong pancetta beef andouille. Meatball t-bone rump kevin cow drumstick bacon tail spare ribs pig jowl. Drumstick tri-tip sirloin fatback, strip steak cow pancetta beef meatloaf ball tip. Tail drumstick biltong fatback. Porchetta ham swine, flank brisket ribeye chuck picanha pig burgdoggen andouille bacon shoulder.',
      lessons: [
        {
          id: 621,
          title: 'Your Cirrus Training',
          description:
            "Arguably the most fun you'll have in your Cirrus, not to mention a great way to develop a feel for your Cirrus at more normal flying airspeeds.",
          order: 0,
          progress: {
            id: 1683030,
            status: 'completed',
          },
          stage_lesson_index: '1.1 Self-Study',
          thumbnail_image_url: '',
          lesson_type: 0,
          completion_time: undefined,
          content_counts: {
            documents: 1,
          },
        },
      ],
    },
    {
      id: 257,
      order: 1,
      title: 'Self Study',
      progress: {
        id: 1683032,
        status: 'not_started',
      },
      overview:
        'Tail hamburger pork belly, alcatra meatball doner brisket buffalo pancetta swine tri-tip kielbasa tongue andouille t-bone. Pork turkey prosciutto shank bresaola meatball. Pork chop swine cupim, frankfurter salami bresaola biltong pancetta beef andouille. Meatball t-bone rump kevin cow drumstick bacon tail spare ribs pig jowl. Drumstick tri-tip sirloin fatback, strip steak cow pancetta beef meatloaf ball tip. Tail drumstick biltong fatback. Porchetta ham swine, flank brisket ribeye chuck picanha pig burgdoggen andouille bacon shoulder.',
      lessons: [
        {
          id: 622,
          title: 'Takeoffs and Landings',
          description:
            "Arguably the most fun you'll have in your Cirrus, not to mention a great way to develop a feel for your Cirrus at more normal flying airspeeds.",
          order: 0,
          progress: {
            id: 1683034,
            status: 'completed',
          },
          stage_lesson_index: '2.1 Self-Study',
          thumbnail_image_url: '',
          lesson_type: 0,
          completion_time: undefined,
          content_counts: {
            videos: 5,
          },
        },
        {
          id: 623,
          title: 'Engine Management',
          description:
            "Arguably the most fun you'll have in your Cirrus, not to mention a great way to develop a feel for your Cirrus at more normal flying airspeeds.",
          order: 1,
          progress: {
            id: 1683036,
            status: 'completed',
          },
          stage_lesson_index: '2.2 Self-Study',
          thumbnail_image_url: '',
          lesson_type: 0,
          completion_time: undefined,
          content_counts: {
            videos: 5,
          },
        },
        {
          id: 622,
          title: 'Takeoffs and Landings',
          description:
            "Arguably the most fun you'll have in your Cirrus, not to mention a great way to develop a feel for your Cirrus at more normal flying airspeeds.",
          order: 0,
          progress: {
            id: 1683034,
            status: 'in_progress',
          },
          stage_lesson_index: '2.1 Self-Study',
          thumbnail_image_url: '',
          lesson_type: 0,
          completion_time: undefined,
          content_counts: {
            videos: 5,
          },
        },
        {
          id: 623,
          title: 'Engine Management',
          description:
            "Arguably the most fun you'll have in your Cirrus, not to mention a great way to develop a feel for your Cirrus at more normal flying airspeeds.",
          order: 1,
          progress: {
            id: 1683036,
            status: 'not_started',
          },
          stage_lesson_index: '2.2 Self-Study',
          thumbnail_image_url: '',
          lesson_type: 0,
          completion_time: undefined,
          content_counts: {
            videos: 5,
          },
        },
      ],
    },
    {
      id: 258,
      order: 2,
      title: 'Instructor-Led Training',
      progress: {
        id: 1683039,
        status: 'not_started',
      },
      overview:
        'Tail hamburger pork belly, alcatra meatball doner brisket buffalo pancetta swine tri-tip kielbasa tongue andouille t-bone. Pork turkey prosciutto shank bresaola meatball. Pork chop swine cupim, frankfurter salami bresaola biltong pancetta beef andouille. Meatball t-bone rump kevin cow drumstick bacon tail spare ribs pig jowl. Drumstick tri-tip sirloin fatback, strip steak cow pancetta beef meatloaf ball tip. Tail drumstick biltong fatback. Porchetta ham swine, flank brisket ribeye chuck picanha pig burgdoggen andouille bacon shoulder.',
      lessons: [
        {
          id: 624,
          title: 'Lesson 1 but lets have a longer title as well',
          description:
            "Arguably the most fun you'll have in your Cirrus, not to mention a great way to develop a feel for your Cirrus at more normal flying airspeeds.",
          order: 0,
          progress: {
            id: 1683041,
            status: 'completed',
          },
          stage_lesson_index: '3.1 Flight',
          thumbnail_image_url: '',
          lesson_type: 2,
          completion_time: undefined,
          content_counts: {
            documents: 5,
            assessments: 1,
          },
        },
        {
          id: 625,
          title: 'Lesson 2',
          description:
            "Arguably the most fun you'll have in your Cirrus, not to mention a great way to develop a feel for your Cirrus at more normal flying airspeeds.",
          order: 1,
          progress: {
            id: 1683043,
            status: 'not_started',
          },
          stage_lesson_index: '3.2 Flight',
          thumbnail_image_url: '',
          lesson_type: 2,
          completion_time: undefined,
          content_counts: {
            documents: 1,
            assessments: 1,
          },
        },
      ],
    },
  ],
};

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
      ],
      declarations: [
        CourseLessonItemComponent,
        CourseLessonContentCountComponent,
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
  courseOverviewLessons: courseOverviewLessons,
};
