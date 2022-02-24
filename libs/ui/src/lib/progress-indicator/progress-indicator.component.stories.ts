import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ProgressIndicatorComponent } from './progress-indicator.component';

export default {
  title: 'ProgressIndicatorComponent',
  component: ProgressIndicatorComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<ProgressIndicatorComponent>;

const Template: Story<ProgressIndicatorComponent> = (args: ProgressIndicatorComponent) => ({
  component: ProgressIndicatorComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}