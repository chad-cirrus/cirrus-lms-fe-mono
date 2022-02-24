import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { InstructorBarComponent } from './instructor-bar.component';

export default {
  title: 'InstructorBarComponent',
  component: InstructorBarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        MatSlideToggleModule,
        FlexLayoutModule,
        MatIconModule,
      ],
    }),
  ],
} as Meta<InstructorBarComponent>;

const Template: Story<InstructorBarComponent> = (
  args: InstructorBarComponent
) => ({
  component: InstructorBarComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
