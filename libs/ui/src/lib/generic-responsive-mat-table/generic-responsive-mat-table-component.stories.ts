import { FlexLayoutModule } from '@angular/flex-layout';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { GenericResponsiveMatTableComponent } from './generic-responsive-mat-table.component';
import { MatTableModule } from '@angular/material/table';
import { enrollment, task } from './StoryData';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableFormatPipe } from '../table-format.pipe';
import { UiDownloadService } from '../course-completion/ui-download.service';
import { HttpClientModule } from '@angular/common/http';

const mockEnvironment = {
  production: false,
  baseUrl: 'http://cirrusapproach.local:3000',
  profile:
    'https://cirfullsb-cirrusaircraftvpo.cs41.force.com/approachsso/s/profile/',
  defaultMobileLesson:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-mobile.jpg',
  defaultDesktopLesson:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-desktop.jpg',
  defaultMobileCourse:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-course-hero-sm.jpg',
  defaultDesktopCourse:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-course-hero-lg.jpg',
};

export default {
  title: 'Generic Responsive Mat Table',
  component: GenericResponsiveMatTableComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FlexLayoutModule,
        MatTableModule,
        BrowserAnimationsModule,
        HttpClientModule,
      ],
      declarations: [TableFormatPipe],
      providers: [
        UiDownloadService,
        {
          provide: 'environment',
          useValue: mockEnvironment,
        },
      ],
    }),
  ],
} as Meta<GenericResponsiveMatTableComponent>;

const Template: Story<GenericResponsiveMatTableComponent> = (
  args: GenericResponsiveMatTableComponent
) => ({ props: args });

export const primaryEnrollment = Template.bind({});
primaryEnrollment.args = {
  data: enrollment.data,
  columns: enrollment.columns,
  displayedColumns: enrollment.displayedColumns,
};

export const primaryTask = Template.bind({});
primaryTask.args = {
  data: task.data,
  columns: task.columns,
  displayedColumns: task.displayedColumns,
};
