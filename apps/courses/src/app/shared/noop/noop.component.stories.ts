import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { NoopComponent } from './noop.component';

export default {
  title: 'NoopComponent',
  component: NoopComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<NoopComponent>;

const Template: Story<NoopComponent> = (args: NoopComponent) => ({
  component: NoopComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}