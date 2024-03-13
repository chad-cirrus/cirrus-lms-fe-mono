/* eslint-disable @nx/enforce-module-boundaries */
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { testData } from 'libs/models/src/testing/testData';
import { testDataReccurent853 } from 'libs/models/src/testing/testData853';
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

const Template: Story<LessonProgressComponent> = (args: LessonProgressComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  lesson: testData,
  sideNavOpen: false,
};

export const SelfStudyInProgress = Template.bind({});
SelfStudyInProgress.args = {
  lesson: testData,
  sideNavOpen: false,
};

export const SelfStudyFlightAssessmentBothInProgress = Template.bind({});
SelfStudyFlightAssessmentBothInProgress.args = {
  lesson: testData,
  sideNavOpen: false,
};

export const SelfStudyInProgressGroundAssessmentInProgress = Template.bind({});
SelfStudyInProgressGroundAssessmentInProgress.args = {
  lesson: testData,
  sideNavOpen: false,
};

export const GroundAssessmentOnlyNotStarted = Template.bind({});
GroundAssessmentOnlyNotStarted.args = {
  lesson: {
    ...testData,
    lesson_type: 2,
  },
  sideNavOpen: false,
};

export const FlightAssessmentOnlyInProgress = Template.bind({});
FlightAssessmentOnlyInProgress.args = {
  lesson: testDataReccurent853,
  sideNavOpen: false,
};
