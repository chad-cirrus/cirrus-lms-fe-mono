import { Certificate } from '../../../models/IRecentActivity';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CertificatesComponent } from './certificates.component';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

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
  title: 'Certificates',
  component: CertificatesComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterModule.forRoot([], { useHash: true })],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  ],
} as Meta<CertificatesComponent>;

const Template: Story<CertificatesComponent> = (
  args: CertificatesComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  certificates,
};

export const TwoCerts = Template.bind({});
TwoCerts.args = {
  certificates: certificates.slice(0, 2),
};

export const NoCerts = Template.bind({});
NoCerts.args = {
  certificates: [],
};
