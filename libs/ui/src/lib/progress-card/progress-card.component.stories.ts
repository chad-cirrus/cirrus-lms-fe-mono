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
  component: ProgressCardComponent,
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
    type: ProgressType.Land,
    completedCourses: 1,
    totalCourses: 2,
  },
};
