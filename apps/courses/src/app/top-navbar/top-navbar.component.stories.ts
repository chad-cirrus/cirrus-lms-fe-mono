import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TopNavbarComponent } from './top-navbar.component';

export default {
  title: 'TopNavbarComponent',
  component: TopNavbarComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<TopNavbarComponent>;

const Template: Story<TopNavbarComponent> = (args: TopNavbarComponent) => ({
  component: TopNavbarComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}