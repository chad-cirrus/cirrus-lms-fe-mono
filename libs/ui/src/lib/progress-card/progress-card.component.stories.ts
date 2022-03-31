import { MatCardModule } from '@angular/material/card';
import { ProgressType } from '@cirrus/models';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ProgressCardComponent } from './progress-card.component';

export default {
  title: 'ProgressCardComponent',
  component: ProgressCardComponent,
  decorators: [
    moduleMetadata({
      imports: [MatCardModule],
    }),
  ],
} as Meta<ProgressCardComponent>;

const Template: Story<ProgressCardComponent> = (
  args: ProgressCardComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  progress: {
    type: ProgressType.Flight,
    completedCourses: 1,
    totalCourses: 2,
  },
};

export const Flight = Template.bind({});
Flight.args = {
  progress: {
    type: ProgressType.Flight,
    completedCourses: 1,
    totalCourses: 2,
  },
};

export const Ground = Template.bind({});
Ground.args = {
  progress: {
    type: ProgressType.Ground,
    completedCourses: 1,
    totalCourses: 2,
  },
};

export const Land = Template.bind({});
Land.args = {
  progress: {
    type: ProgressType.Landings,
    completedCourses: 1,
    totalCourses: 2,
  },
};

export const Simulator = Template.bind({});
Simulator.args = {
  progress: {
    type: ProgressType.Simulator,
    completedCourses: 1,
    totalCourses: 2,
  },
};

export const Assessment = Template.bind({});
Assessment.args = {
  progress: {
    type: ProgressType.Assessment,
    completedCourses: 1,
    totalCourses: 2,
  },
};

export const SelfStudy = Template.bind({});
SelfStudy.args = {
  progress: {
    type: ProgressType.SelfStudy,
    completedCourses: 1,
    totalCourses: 2,
  },
};
