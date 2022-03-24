/* eslint-disable @nrwl/nx/enforce-module-boundaries */
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

const Template: Story<LessonContentItemComponent> = (
  args: LessonContentItemComponent
) => ({
  component: LessonContentItemComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  content: { ...testData.contents[0], estimated_time: '6:01' },
};

export const InProgress = Template.bind({});
InProgress.args = {
  content: { ...testData2.contents[0], estimated_time: '6:01' },
};

export const Completed = Template.bind({});
Completed.args = {
  content: { ...testData2.contents[1], estimated_time: '6:01' },
};
