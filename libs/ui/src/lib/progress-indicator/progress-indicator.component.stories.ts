import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ProgressIndicatorComponent } from './progress-indicator.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export default {
  title: 'ProgressIndicatorComponent',
  component: ProgressIndicatorComponent,
  decorators: [
    moduleMetadata({
      imports: [MatProgressSpinnerModule],
    }),
  ],
} as Meta<ProgressIndicatorComponent>;

const Template: Story<ProgressIndicatorComponent> = (
  args: ProgressIndicatorComponent
) => ({
  component: ProgressIndicatorComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
