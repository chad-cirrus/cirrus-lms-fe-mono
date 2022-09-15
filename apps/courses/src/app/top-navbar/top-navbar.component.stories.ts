import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { TopNavbarComponent } from './top-navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

export default {
  title: 'TopNavbarComponent',
  component: TopNavbarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
      ],
    }),
  ],
} as Meta<TopNavbarComponent>;

const Template: Story<TopNavbarComponent> = (args: TopNavbarComponent) => ({
  component: TopNavbarComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
