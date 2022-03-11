/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LessonProgress, ASSESSMENT_TYPE } from '@cirrus/models';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { testData } from 'libs/models/src/testing/testData';
import { LessonProgressComponent } from './lesson-progress.component';

export default {
  title: 'LessonProgressComponent',
  component: LessonProgressComponent,
  decorators: [
    moduleMetadata({
      imports: [MatButtonModule, FlexLayoutModule, MatCardModule],
    }),
  ],
} as Meta<LessonProgressComponent>;

const Template: Story<LessonProgressComponent> = (
  args: LessonProgressComponent
) => ({
  component: LessonProgressComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  lesson: {
    ...testData,
    self_study_progress: LessonProgress.NotStarted,
    assessment_progress: LessonProgress.NotStarted,
    assessment: ASSESSMENT_TYPE.flight,
    self_study: true,
  },
  sideNavOpen: false,
};

export const SelfStudyOnly = Template.bind({});
SelfStudyOnly.args = {
  lesson: {
    ...testData,
    self_study_progress: LessonProgress.NotStarted,
    assessment: ASSESSMENT_TYPE.none,
    self_study: true,
  },
  sideNavOpen: false,
};

export const FlightAssessmentOnlyNotStarted = Template.bind({});
FlightAssessmentOnlyNotStarted.args = {
  lesson: {
    ...testData,
    assessment_progress: LessonProgress.NotStarted,
    assessment: ASSESSMENT_TYPE.flight,
    self_study: false,
  },
  sideNavOpen: false,
};

export const FlightAssessmentSelfStudyNotStarted = Template.bind({});
FlightAssessmentSelfStudyNotStarted.args = {
  lesson: {
    ...testData,
    assessment_progress: LessonProgress.NotStarted,
    assessment: ASSESSMENT_TYPE.flight,
    self_study: true,
  },
  sideNavOpen: false,
};

export const GroundAssessmentOnlyNotStarted = Template.bind({});
GroundAssessmentOnlyNotStarted.args = {
  lesson: {
    ...testData,
    assessment_progress: LessonProgress.NotStarted,
    assessment: ASSESSMENT_TYPE.ground,
    self_study: false,
  },
  sideNavOpen: false,
};
