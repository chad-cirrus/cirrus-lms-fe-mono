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
  lastCompletedDate: '05/06/22',
  lessonsCompleted: 0,
  lessonsTotal: 50,
  milestonesReached: 0,
  milestonesTotal: 8,
};
