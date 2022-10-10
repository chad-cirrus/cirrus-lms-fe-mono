import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CertificatesFullComponent } from './certificates-full.component';
import { Certificate } from '../../../models/IRecentActivity';
import { HttpClientModule } from '@angular/common/http';
import { UiDownloadService } from '@cirrus/ui';

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
      imports: [HttpClientModule],
      providers: [
        {
          provide: 'environment',
          useValue: mockEnvironment,
        },
        UiDownloadService,
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
