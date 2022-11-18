import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CertificatesFullComponent } from './certificates-full.component';
import { Certificate } from '../../../models/IRecentActivity';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService, UiDownloadService } from '@cirrus/ui';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockEnvironment = {
  production: false,
  baseUrl: 'http://cirrusapproach.local:3000',
  profile:
    'https://cirfullsb-cirrusaircraftvpo.cs41.force.com/approachsso/s/profile/',
  defaultMobileLesson:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-mobile.jpg',
  defaultDesktopLesson:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-desktop.jpg',
};

const certificates: Certificate[] = [
  {
    course_name: 'CAPS Course',
    course_attempt_id: 119053,
    enrollment_date: '03/08/22 - 07/13/22',
  },
  {
    course_name: 'Icing Awareness Course',
    course_attempt_id: 119050,
    enrollment_date: '01/12/22 - 07/13/22',
  },
];

export default {
  title: 'Certificates Full',
  component: CertificatesFullComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: 'environment',
          useValue: mockEnvironment,
        },
        UiDownloadService,
        NotificationService,
      ],
    }),
  ],
} as Meta<CertificatesFullComponent>;

const Template: Story<CertificatesFullComponent> = (
  args: CertificatesFullComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});

export const NoCerts = Template.bind({});

export const Certs = Template.bind({});
Certs.args = { certificates };

export const Search = Template.bind({});
Search.args = {
  certificates: [
    {
      course_name: 'Star Wars',
      course_attempt_id: 119050,
      enrollment_date: '01/12/22 - 07/13/22',
    },
    {
      course_name: 'Star Wars One',
      course_attempt_id: 119051,
      enrollment_date: '01/12/22 - 07/13/22',
    },
    {
      course_name: 'STAR WARS TWO',
      course_attempt_id: 119052,
      enrollment_date: '01/12/22 - 07/13/22',
    },
    {
      course_name: 'Reservoir Dogs',
      course_attempt_id: 119053,
      enrollment_date: '01/12/22 - 07/13/22',
    },
    {
      course_name: 'pulp fiction',
      course_attempt_id: 119054,
      enrollment_date: '01/12/22 - 07/13/22',
    },
    {
      course_name: '123455',
      course_attempt_id: 119055,
      enrollment_date: '01/12/22 - 07/13/22',
    },
    {
      course_name: '***(((()))))*****',
      course_attempt_id: 119056,
      enrollment_date: '01/12/22 - 07/13/22',
    },
    {
      course_name: 'Harry Potter',
      course_attempt_id: 119057,
      enrollment_date: '01/12/22 - 07/13/22',
    },
    {
      course_name: 'Inglorious Bastards',
      course_attempt_id: 119058,
      enrollment_date: '01/12/22 - 07/13/22',
    },
  ],
};
