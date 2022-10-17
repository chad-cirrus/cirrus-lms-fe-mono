import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SideNavComponent } from './side-nav.component';

export default {
  title: 'SideNavComponent',
  component: SideNavComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule, BrowserAnimationsModule],
    }),
  ],
} as Meta<SideNavComponent>;

const Template: Story<SideNavComponent> = (args: SideNavComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  cirrusUser: {
    admin: true,
    authentication_token: 'kbTpyxQ54sZbhyfFL1Nu',
    authentication_token_created_at: '2021-08-02T14:55:58.471Z',
    created_at: '2021-01-14T01:19:30.847Z',
    ctc_admin: false,
    deactivated: false,
    name: 'me',
    email: 'myockey@cirrusaircraft.com',
    full_sfid: '0054O000009hk3oQAA',
    id: 25524,
    nts_user_id: null,
    role: 'super_admin',
    salesforce_id: '0054O000009hk3o',
    session_index: null,
    sf_lms_role: '1',
    token_expires: '2022-04-24T19:47:57.511Z',
    updated_at: '2022-03-25T19:47:57.511Z',
    firstname: 'me',
    lastname: 'me',
  },
};

export const Student = Template.bind({});
Student.args = {
  cirrusUser: {
    admin: true,
    authentication_token: 'kbTpyxQ54sZbhyfFL1Nu',
    authentication_token_created_at: '2021-08-02T14:55:58.471Z',
    created_at: '2021-01-14T01:19:30.847Z',
    ctc_admin: false,
    deactivated: false,
    name: 'me',
    email: 'myockey@cirrusaircraft.com',
    full_sfid: '0054O000009hk3oQAA',
    id: 25524,
    nts_user_id: null,
    role: 'pilot',
    salesforce_id: '0054O000009hk3o',
    session_index: null,
    sf_lms_role: '1',
    token_expires: '2022-04-24T19:47:57.511Z',
    updated_at: '2022-03-25T19:47:57.511Z',
    firstname: 'me',
    lastname: 'me',
  },
};

export const Instructor = Template.bind({});
Instructor.args = {
  cirrusUser: {
    admin: true,
    authentication_token: 'kbTpyxQ54sZbhyfFL1Nu',
    authentication_token_created_at: '2021-08-02T14:55:58.471Z',
    created_at: '2021-01-14T01:19:30.847Z',
    ctc_admin: false,
    deactivated: false,
    name: 'me',
    email: 'myockey@cirrusaircraft.com',
    full_sfid: '0054O000009hk3oQAA',
    id: 25524,
    nts_user_id: null,
    role: 'instructor',
    salesforce_id: '0054O000009hk3o',
    session_index: null,
    sf_lms_role: '1',
    token_expires: '2022-04-24T19:47:57.511Z',
    updated_at: '2022-03-25T19:47:57.511Z',
    firstname: 'me',
    lastname: 'me',
  },
};

export const CTC = Template.bind({});
CTC.args = {
  cirrusUser: {
    admin: true,
    authentication_token: 'kbTpyxQ54sZbhyfFL1Nu',
    authentication_token_created_at: '2021-08-02T14:55:58.471Z',
    created_at: '2021-01-14T01:19:30.847Z',
    ctc_admin: false,
    deactivated: false,
    name: 'me',
    email: 'myockey@cirrusaircraft.com',
    full_sfid: '0054O000009hk3oQAA',
    id: 25524,
    nts_user_id: null,
    role: 'admin',
    salesforce_id: '0054O000009hk3o',
    session_index: null,
    sf_lms_role: '1',
    token_expires: '2022-04-24T19:47:57.511Z',
    updated_at: '2022-03-25T19:47:57.511Z',
    firstname: 'me',
    lastname: 'me',
  },
};

export const LMS = Template.bind({});
LMS.args = {
  cirrusUser: {
    admin: true,
    authentication_token: 'kbTpyxQ54sZbhyfFL1Nu',
    authentication_token_created_at: '2021-08-02T14:55:58.471Z',
    created_at: '2021-01-14T01:19:30.847Z',
    ctc_admin: false,
    deactivated: false,
    name: 'me',
    email: 'myockey@cirrusaircraft.com',
    full_sfid: '0054O000009hk3oQAA',
    id: 25524,
    nts_user_id: null,
    role: 'super_admin',
    salesforce_id: '0054O000009hk3o',
    session_index: null,
    sf_lms_role: '1',
    token_expires: '2022-04-24T19:47:57.511Z',
    updated_at: '2022-03-25T19:47:57.511Z',
    firstname: 'me',
    lastname: 'me',
  },
};
