import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CourseProgressCompletedComponent } from './course-progress-completed.component';

export default {
  title: 'Course Progress Completed',
  component: CourseProgressCompletedComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<CourseProgressCompletedComponent>;

const Template: Story<CourseProgressCompletedComponent> = (
  args: CourseProgressCompletedComponent
) => ({ props: args });

export const Primary = Template.bind({});
Primary.args = {
  completeDate: '5/6/22',
  certificate: true,
};

export const No_Certificate = Template.bind({});
No_Certificate.args = {
  completeDate: '5/6/22',
  certificate: false,
};
