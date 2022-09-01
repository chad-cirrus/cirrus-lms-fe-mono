import { HoursAndLandingsComponent } from './hours-and-landings.component';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { HoursAndLandingStatType } from '../../../../models/src';
import { HoursLandingTypeToTextPipe } from '../helpers/HoursLandingTypeToText.pipe';
import { MatIconRegistryModule } from '../mat-icon-registry.module';
import { HoursLandingTypeToIconPipe } from '../helpers/HoursLandingTypeToIcon.pipe';

export default {
  title: 'Hours and Landings',
  component: HoursAndLandingsComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule, MatIconModule, MatIconRegistryModule],
      declarations: [HoursLandingTypeToTextPipe, HoursLandingTypeToIconPipe],
    }),
  ],
} as Meta<HoursAndLandingsComponent>;

const Template: Story<HoursAndLandingsComponent> = (
  args: HoursAndLandingsComponent
) => ({ props: args });

export const Primary = Template.bind({});
Primary.args = {
  stats: [
    { type: HoursAndLandingStatType.completed_total_hours, completed: 16 },
    { type: 'completed_ground_instruction_hours', completed: 5 },
    { type: HoursAndLandingStatType.completed_sim_hours, completed: 9 },
    { type: 'completed_cross_country_hours', completed: 12 },
    { type: HoursAndLandingStatType.completed_total_landings, completed: 4 },
  ],
};

export const OnlyTwo = Template.bind({});
OnlyTwo.args = {
  stats: [
    { type: HoursAndLandingStatType.completed_total_hours, completed: 16 },
    { type: HoursAndLandingStatType.completed_total_landings, completed: 4 },
  ],
};

export const OnlyFour = Template.bind({});
OnlyFour.args = {
  stats: [
    { type: HoursAndLandingStatType.completed_total_hours, completed: 16 },
    { type: HoursAndLandingStatType.completed_sim_hours, completed: 9 },
    { type: 'completed_cross_country_hours', completed: 12 },
    { type: HoursAndLandingStatType.completed_total_landings, completed: 4 },
  ],
};
