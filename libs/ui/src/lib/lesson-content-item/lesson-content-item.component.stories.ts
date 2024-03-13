/* eslint-disable @nx/enforce-module-boundaries */
import { FlexLayoutModule } from '@angular/flex-layout';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { testData, testData2 } from 'libs/models/src/testing/testData';
import { LessonContentItemComponent } from './lesson-content-item.component';

export default {
  title: 'LessonContentItemComponent',
  component: LessonContentItemComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule],
    }),
  ],
} as Meta<LessonContentItemComponent>;

const Template: Story<LessonContentItemComponent> = (args: LessonContentItemComponent) => ({
  component: LessonContentItemComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  content: testData.contents[0],
};

export const Video = Template.bind({});
Video.args = {
  content: testData.contents[0],
};

export const Document = Template.bind({});
Document.args = {
  content: { ...testData.contents[0], content_type: 4 },
};

export const Quiz = Template.bind({});
Quiz.args = {
  content: { ...testData.contents[0], content_type: 5 },
};

export const RTF = Template.bind({});
RTF.args = {
  content: { ...testData.contents[0], content_type: 8 },
};

export const FlightAssessment = Template.bind({});
FlightAssessment.args = {
  content: { ...testData.contents[0], content_type: 9 },
};

export const GroundAssessment = Template.bind({});
GroundAssessment.args = {
  content: {
    ...testData.contents[0],
    content_type: 10,
  },
};

export const Image = Template.bind({});
Image.args = {
  content: {
    ...testData.contents[0],
    content_type: 11,
  },
};

export const NotStarted = Template.bind({});
NotStarted.args = {
  content: {
    ...testData2.contents[0],
    progress: {
      id: 1,
      status: 'not_started',
    },
  },
};

export const InProgress = Template.bind({});
InProgress.args = {
  content: {
    ...testData2.contents[0],
    progress: {
      id: 1,
      status: 'in_progress',
    },
  },
};

export const Completed = Template.bind({});
Completed.args = {
  content: {
    ...testData2.contents[1],
    progress: {
      id: 1,
      status: 'completed',
    },
  },
};
