/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ctdContents, ctdLesson, ProgressType } from '@cirrus/models';
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
      imports: [
        MatButtonModule,
        FlexLayoutModule,
        MatCardModule,
        MatDialogModule,
      ],
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
  lesson: testData,
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
  isScreenSmall: false,
};

export const PrimaryMobile = Template.bind({});
PrimaryMobile.args = {
  lesson: testData,
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
  isScreenSmall: true,
};

export const CrashTestDummy = Template.bind({});
CrashTestDummy.args = {
  lesson: {
    ...ctdLesson,
    contents: ctdContents,
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
  lesson: testData,
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
  lesson: { ...testData, progress: { id: 0, status: 'in_progress' } },
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

export const Completed = Template.bind({});
Completed.args = {
  lesson: { ...testData, progress: { id: 0, status: 'completed' } },
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
  lesson: testData,
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
  lesson: { ...testData, progress: { id: 0, status: 'completed' } },
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
  lesson: { ...testData, lesson_type: 2 },
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
  lesson: testDataIcingAwarenessCourse,
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
  lesson: testData855,
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
