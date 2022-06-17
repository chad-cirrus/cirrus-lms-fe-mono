import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { HamburgerMenuComponent } from './hamburger-menu.component';

export default {
  title: 'HamburgerMenuComponent',
  component: HamburgerMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<HamburgerMenuComponent>;

const Template: Story<HamburgerMenuComponent> = (args: HamburgerMenuComponent) => ({
  component: HamburgerMenuComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    notificationCount:  0,
}