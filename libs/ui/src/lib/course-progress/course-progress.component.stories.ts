import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CourseProgressComponent } from './course-progress.component';

export default {
  title: 'Course Progress',
  component: CourseProgressComponent,
  decorators: [
    moduleMetadata({
      imports: [MatProgressBarModule],
    }),
  ],
} as Meta<CourseProgressComponent>;

const Template: Story<CourseProgressComponent> = (
  args: CourseProgressComponent
) => ({ props: args });

export const Primary = Template.bind({});
Primary.args = {
  lessonStats: {
    completed: 10,
    total: 50,
  },
};
