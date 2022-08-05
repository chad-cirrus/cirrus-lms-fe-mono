import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CourseLessonContentCountComponent } from '../course-lesson-content-count/course-lesson-content-count.component';
import { MatIconRegistryModule } from '../mat-icon-registry.module';
import { CourseLessonItemComponent } from './course-lesson-item.component';

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

export default {
  title: 'Course Lesson Item',
  component: CourseLessonItemComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule, MatIconModule, MatIconRegistryModule],
      declarations: [CourseLessonContentCountComponent],
      providers: [
        {
          provide: 'environment',
          useValue: mockEnvironment,
        },
      ],
    }),
  ],
} as Meta<CourseLessonItemComponent>;

const Template: Story<CourseLessonItemComponent> = (
  args: CourseLessonItemComponent
) => ({ props: args });

export const Primary = Template.bind({});
Primary.args = {
  courseLesson: {
    id: 622,
    title: 'This is a Title with Exactly 60 Characters which is the maxx',
    order: 0,
    progress: {
      id: 1683034,
      status: 'not_started',
    },
    stage_lesson_index: '2.1 Self-Study',
    thumbnail_image_url: '',
    lesson_type: 0,
    completion_time: undefined,
    content_counts: {
      videos: 5,
    },
    description:
      "Arguably the most fun you'll have in your Cirrus, not to mention a great way to develop a feel for your Cirrus at more normal flying airspeeds.",
  },
};

export const Ground = Template.bind({});
Ground.args = {
  courseLesson: {
    id: 622,
    title: 'Ground Lesson 1',
    order: 0,
    progress: {
      id: 1683034,
      status: 'in_progress',
    },
    stage_lesson_index: '1.1 Self-Study',
    thumbnail_image_url: '',
    lesson_type: 0,
    completion_time: undefined,
    content_counts: {
      videos: 4,
      documents: 3,
      quizzes: 1,
    },
    description:
      "Arguably the most fun you'll have in your Cirrus, not to mention a great way to develop a feel for your Cirrus at more normal flying airspeeds.",
  },
};

export const Simulator = Template.bind({});
Simulator.args = {
  courseLesson: {
    id: 622,
    title: 'Simulator Lesson 1',
    order: 0,
    progress: {
      id: 1683034,
      status: 'completed',
    },
    stage_lesson_index: '1.2 Self-Study',
    thumbnail_image_url: '',
    lesson_type: 0,
    completion_time: undefined,
    content_counts: {
      videos: 4,
      documents: 3,
      quizzes: 1,
    },
    description:
      "Arguably the most fun you'll have in your Cirrus, not to mention a great way to develop a feel for your Cirrus at more normal flying airspeeds.",
  },
};
