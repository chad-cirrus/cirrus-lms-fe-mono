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
  defaultLessonThumbnail:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-thumbnail.jpg',
  defaultMobileLesson:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-mobile.jpg',
  defaultDesktopLesson:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-desktop.jpg',
  defaultMobileCourse:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-course-hero-sm.jpg',
  defaultDesktopCourse:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-course-hero-lg.jpg',
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
    id: 692,
    title: 'Welcome To Your Cirrus Training',
    subtitle: 'subtitle',
    order: 0,
    index: '1.1',
    thumbnail_image_url: '',
    lesson_type: 0,
    completion_time: '1h 1m',
    content_counts: { documents: 3 },
    progress: { id: 1775463, status: 'completed' },
    stage_id: 0,
  },
};

export const Ground = Template.bind({});
Ground.args = {
  courseLesson: {
    id: 692,
    title: 'Welcome To Your Cirrus Training',
    order: 0,
    index: '1.1',
    thumbnail_image_url: '',
    lesson_type: 0,
    completion_time: '1h 1m',
    content_counts: { documents: 3 },
    progress: { id: 1775463, status: 'completed' },
    stage_id: 0,
  },
};

export const Simulator = Template.bind({});
Simulator.args = {
  courseLesson: {
    completion_time: '2',
    content_counts: {},
    id: 1058,
    index: '1.1',
    lesson_type: 3,
    order: 0,
    progress: { id: 0, status: 'completed' },
    stage_id: 501,
    subtitle: 'The Quick Brown Fox Jumped',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/90c0a0c7068f836dd6e8d210f57f6cGoofy_football_pose.webp',
    title: 'Dave Harms Simulator Lesson Edited Friday 16, 2022',
  },
};

export const SimulatorDefaultThumbnail = Template.bind({});
SimulatorDefaultThumbnail.args = {
  courseLesson: {
    completion_time: '2',
    content_counts: {},
    id: 1058,
    index: '1.1',
    lesson_type: 3,
    order: 0,
    progress: { id: 0, status: 'completed' },
    stage_id: 501,
    subtitle: 'The Quick Brown Fox Jumped',
    thumbnail_image_url: '',
    title: 'Dave Harms Simulator Lesson Edited Friday 16, 2022',
  },
};
