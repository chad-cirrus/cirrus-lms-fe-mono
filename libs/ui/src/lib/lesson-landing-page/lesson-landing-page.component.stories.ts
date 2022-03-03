import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LessonProgress, ProgressType } from '@cirrus/models';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { testData } from '../../testing/testData';
import { LessonContentItemComponent } from '../lesson-content-item/lesson-content-item.component';
import { PlaylistComponent } from '../playlist/playlist.component';
import { LessonLandingPageComponent } from './lesson-landing-page.component';

export default {
  title: 'LessonLandingPageComponent',
  component: LessonLandingPageComponent,
  decorators: [
    moduleMetadata({
      declarations: [LessonContentItemComponent, PlaylistComponent],
      imports: [MatButtonModule, FlexLayoutModule, MatCardModule],
    }),
  ],
} as Meta<LessonLandingPageComponent>;

const Template: Story<LessonLandingPageComponent> = (
  args: LessonLandingPageComponent
) => ({
  component: LessonLandingPageComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  lesson: {
    ...testData,
    lesson_progress: LessonProgress.Complete,
    self_study_progress: LessonProgress.Complete,
    assessment_progress: LessonProgress.Complete,
  },
  progress: [
    {
      type: ProgressType.Ground,
      completedCourses: 5,
      totalCourses: 10,
    },
    {
      type: ProgressType.Flight,
      completedCourses: 12,
      totalCourses: 20,
    },
    {
      type: ProgressType.Land,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Land,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Land,
      completedCourses: 12,
      totalCourses: 20,
    },
  ],
  instructorView: false,
  sideNavOpen: false,
  courseComplete: false,
};

export const InProgress = Template.bind({});
InProgress.args = {
  lesson: {
    ...testData,
    lesson_progress: LessonProgress.InProgress,
    self_study_progress: LessonProgress.InProgress,
    assessment_progress: LessonProgress.InProgress,
  },
  progress: [
    {
      type: ProgressType.Ground,
      completedCourses: 5,
      totalCourses: 10,
    },
    {
      type: ProgressType.Flight,
      completedCourses: 12,
      totalCourses: 20,
    },
    {
      type: ProgressType.Land,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Land,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Land,
      completedCourses: 12,
      totalCourses: 20,
    },
  ],
  instructorView: false,
  sideNavOpen: false,
  courseComplete: false,
};

export const Complete = Template.bind({});
Complete.args = {
  lesson: {
    ...testData,
    lesson_progress: LessonProgress.Complete,
    self_study_progress: LessonProgress.Complete,
    assessment_progress: LessonProgress.Complete,
  },
  progress: [
    {
      type: ProgressType.Ground,
      completedCourses: 5,
      totalCourses: 10,
    },
    {
      type: ProgressType.Flight,
      completedCourses: 12,
      totalCourses: 20,
    },
    {
      type: ProgressType.Land,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Land,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Land,
      completedCourses: 12,
      totalCourses: 20,
    },
  ],
  instructorView: false,
  sideNavOpen: false,
  courseComplete: false,
};

export const NotStarted = Template.bind({});
NotStarted.args = {
  lesson: {
    ...testData,
    lesson_progress: LessonProgress.NotStarted,
    self_study_progress: LessonProgress.NotStarted,
    assessment_progress: LessonProgress.NotStarted,
  },
  progress: [
    {
      type: ProgressType.Ground,
      completedCourses: 5,
      totalCourses: 10,
    },
    {
      type: ProgressType.Flight,
      completedCourses: 12,
      totalCourses: 20,
    },
    {
      type: ProgressType.Land,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Land,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Land,
      completedCourses: 12,
      totalCourses: 20,
    },
  ],
  instructorView: false,
  sideNavOpen: false,
  courseComplete: false,
};

export const LastLessonCompleteCourse = Template.bind({});
LastLessonCompleteCourse.args = {
  lesson: {
    ...testData,
    lesson_progress: LessonProgress.Complete,
    self_study_progress: LessonProgress.Complete,
    assessment_progress: LessonProgress.Complete,
  },
  progress: [
    {
      type: ProgressType.Ground,
      completedCourses: 5,
      totalCourses: 10,
    },
    {
      type: ProgressType.Flight,
      completedCourses: 12,
      totalCourses: 20,
    },
    {
      type: ProgressType.Land,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Land,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Land,
      completedCourses: 12,
      totalCourses: 20,
    },
  ],
  instructorView: false,
  sideNavOpen: false,
  courseComplete: false,
};
