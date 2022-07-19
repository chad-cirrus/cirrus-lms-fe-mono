import { CourseComponent } from './course.component';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

export default {
  title: 'Course Component',
  component: CourseComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<CourseComponent>;

const Template: Story<CourseComponent> = (args: CourseComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
