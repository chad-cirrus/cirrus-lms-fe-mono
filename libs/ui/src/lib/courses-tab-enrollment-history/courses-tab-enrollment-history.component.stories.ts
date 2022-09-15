import { FlexLayoutModule } from '@angular/flex-layout';
import { PROGRESS_STATUS } from '@cirrus/models';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CoursesTabEnrollmentHistoryComponent } from './courses-tab-enrollment-history.component';
import { UiDownloadService } from '../course-completion/ui-download.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericResponsiveMatTableComponent } from '../generic-responsive-mat-table/generic-responsive-mat-table.component';
import { MatTableModule } from '@angular/material/table';
import { TableFormatPipe } from '../table-format.pipe';

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
  title: 'Course Tab Enrollment History',
  component: CoursesTabEnrollmentHistoryComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FlexLayoutModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
      ],
      declarations: [GenericResponsiveMatTableComponent, TableFormatPipe],
      providers: [
        UiDownloadService,
        {
          provide: 'environment',
          useValue: mockEnvironment,
        },
      ],
    }),
  ],
} as Meta<CoursesTabEnrollmentHistoryComponent>;

const Template: Story<CoursesTabEnrollmentHistoryComponent> = (
  args: CoursesTabEnrollmentHistoryComponent
) => ({ props: args });

export const Primary = Template.bind({});
Primary.args = {
  enrollments: [
    {
      id: 119066,
      course_version: '1.10',
      enrollment_date: '07/14/22 - present',
      transcript_available: false,
      progress: {
        id: 1768442,
        status: PROGRESS_STATUS.in_progress,
      },
      user_certificate: {
        id: 20440,
        expires_on: '4/30/2022',
      },
    },
    {
      id: 119061,
      course_version: '1.10',
      enrollment_date: '06/16/22 - 06/16/22',
      transcript_available: true,
      progress: {
        id: 1768127,
        status: PROGRESS_STATUS.completed,
      },
      user_certificate: {
        id: 20440,
        expires_on: '4/30/2022',
      },
    },
  ],
};
