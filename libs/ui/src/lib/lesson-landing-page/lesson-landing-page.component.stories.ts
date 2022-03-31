/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  ASSESSMENT_TYPE,
  LessonProgress,
  ProgressType,
  LessonHelper,
} from '@cirrus/models';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { testData } from 'libs/models/src/testing/testData';
import { testData855 } from 'libs/models/src/testing/testData855';
import { testDataIcingAwarenessCourse } from 'libs/models/src/testing/testDataIcingLesson';

import { LessonContentItemComponent } from '../lesson-content-item/lesson-content-item.component';
import { LessonContentsComponent } from '../lesson-contents/lesson-contents.component';
import { LessonProgressComponent } from '../lesson-progress/lesson-progress.component';
import { ProgressCardComponent } from '../progress-card/progress-card.component';
import { LessonLandingPageComponent } from './lesson-landing-page.component';

export default {
  title: 'LessonLandingPageComponent',
  component: LessonLandingPageComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        LessonContentItemComponent,
        LessonProgressComponent,
        LessonContentsComponent,
        ProgressCardComponent,
      ],
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
    lesson_progress: LessonProgress.NotStarted,
    self_study_progress: LessonProgress.NotStarted,
    assessment_progress: LessonProgress.NotStarted,
    assessment: ASSESSMENT_TYPE.flight,
    self_study: true,
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
      type: ProgressType.Simulator,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Landings,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Assessment,
      completedCourses: 12,
      totalCourses: 20,
    },
  ],
  instructorView: false,
  sideNavOpen: false,
  courseComplete: false,
};

export const InstructorView = Template.bind({});
InstructorView.args = {
  lesson: {
    ...testData,
    lesson_progress: LessonProgress.NotStarted,
    self_study_progress: LessonProgress.NotStarted,
    assessment_progress: LessonProgress.NotStarted,
    assessment: ASSESSMENT_TYPE.flight,
    self_study: true,
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
      type: ProgressType.Simulator,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Landings,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Assessment,
      completedCourses: 12,
      totalCourses: 20,
    },
  ],
  instructorView: true,
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
    assessment: ASSESSMENT_TYPE.flight,
    self_study: true,
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
      type: ProgressType.Simulator,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Landings,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Assessment,
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
    assessment: ASSESSMENT_TYPE.flight,
    self_study: true,
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
      type: ProgressType.Simulator,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Landings,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Assessment,
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
    assessment: ASSESSMENT_TYPE.flight,
    self_study: true,
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
      type: ProgressType.Simulator,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Landings,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Assessment,
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
    assessment: ASSESSMENT_TYPE.flight,
    self_study: true,
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
      type: ProgressType.Simulator,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Landings,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Assessment,
      completedCourses: 12,
      totalCourses: 20,
    },
  ],
  instructorView: false,
  sideNavOpen: false,
  courseComplete: true,
};

export const FlightAssessmentOnly = Template.bind({});
FlightAssessmentOnly.args = {
  lesson: {
    ...testData,
    lesson_progress: LessonProgress.NotStarted,
    assessment_progress: LessonProgress.NotStarted,
    self_study: false,
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
      type: ProgressType.Simulator,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Landings,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Assessment,
      completedCourses: 12,
      totalCourses: 20,
    },
  ],
  instructorView: false,
  sideNavOpen: false,
  courseComplete: false,
};

export const IcingAwarenessCourse = Template.bind({});
IcingAwarenessCourse.args = {
  lesson: {
    ...LessonHelper.createLessonObject(testDataIcingAwarenessCourse),
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
      type: ProgressType.Simulator,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Landings,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Assessment,
      completedCourses: 12,
      totalCourses: 20,
    },
  ],
  instructorView: false,
  sideNavOpen: false,
  courseComplete: false,
};

export const TakeOffsAndLandings = Template.bind({});
TakeOffsAndLandings.args = {
  lesson: {
    ...LessonHelper.createLessonObject(testData855),
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
      type: ProgressType.Simulator,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Landings,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Assessment,
      completedCourses: 12,
      totalCourses: 20,
    },
  ],
  instructorView: false,
  sideNavOpen: false,
  courseComplete: false,
};
