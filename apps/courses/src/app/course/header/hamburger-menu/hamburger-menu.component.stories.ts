import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { HamburgerMenuComponent } from './hamburger-menu.component';
import { OverlayModule } from '@angular/cdk/overlay';

export default {
  title: 'HamburgerMenuComponent',
  component: HamburgerMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [OverlayModule],
    }),
  ],
} as Meta<HamburgerMenuComponent>;

const Template: Story<HamburgerMenuComponent> = (
  args: HamburgerMenuComponent
) => ({
  component: HamburgerMenuComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  notificationCount: 0,
};
