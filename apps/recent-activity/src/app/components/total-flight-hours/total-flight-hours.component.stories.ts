import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { TotalFlightHoursComponent } from './total-flight-hours.component';

export default {
  title: 'Total Flight Hours Component',
  component: TotalFlightHoursComponent,
  decorators: [moduleMetadata({})],
} as Meta<TotalFlightHoursComponent>;

const Template: Story<TotalFlightHoursComponent> = (
  args: TotalFlightHoursComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});

export const CoursesInProgress = Template.bind({});
CoursesInProgress.args = {
  hours: '1244',
};
