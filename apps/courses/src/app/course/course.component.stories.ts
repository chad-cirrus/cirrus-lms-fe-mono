import { CourseComponent } from './course.component';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CourseLandingPageComponent, MatIconRegistryModule } from '@cirrus/ui';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

export default {
  title: 'Course Component',
  component: CourseComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatDividerModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatIconRegistryModule,
      ],
      declarations: [CourseLandingPageComponent],
    }),
  ],
} as Meta<CourseComponent>;

const Template: Story<CourseComponent> = (args: CourseComponent) => ({
  props: args,
});

export const Primary = Template.bind({});

export const Desktop = Template.bind({});
export const Mobile = Template.bind({});
