import { HoursAndLandingsComponent } from './hours-and-landings.component';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

export default {
  title: 'Hours and Landings',
  component: HoursAndLandingsComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule, MatIconModule],
    }),
  ],
} as Meta<HoursAndLandingsComponent>;

const Template: Story<HoursAndLandingsComponent> = (
  args: HoursAndLandingsComponent
) => ({ props: args });

export const Primary = Template.bind({});
Primary.args = {};
