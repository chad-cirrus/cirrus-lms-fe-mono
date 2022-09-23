import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { NotificationsSectionComponent } from './notifications-section.component';

export default {
  title: 'Page Header Notifications Section',
  component: NotificationsSectionComponent,
  decorators: [moduleMetadata({})],
} as Meta<NotificationsSectionComponent>;

const Template: Story<NotificationsSectionComponent> = (
  args: NotificationsSectionComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});

export const NoNotifications = Template.bind({});

export const WithNotifications = Template.bind({});
WithNotifications.args = {
  notifications: [
    {
      id: 24394,
      body: 'test test test',
      notific_type: 'message',
      created_at: '2022-09-21T14:46:06.318Z',
      certificate_id: undefined,
      badge_id: undefined,
      instructor: undefined,
      student: undefined,
      sender: {
        id: 25524,
        email: 'myockey@cirrusaircraft.com',
        role: 'super_admin',
        admin: true,
        deactivated: false,
        contact: {
          id: 25630,
          firstname: 'Mike',
          lastname: 'Yockey',
          name: 'Mike Yockey',
          contact_user: undefined,
          contactid: undefined,
        },
        salesforce_id: '0054O000009hk3o',
        ctc_admin: false,
      },
      notified_at: '2022-09-21T14:46:06.312Z',
      notifiable: undefined,
    },
    {
      id: 24395,
      body: 'yo yo yo yo',
      notific_type: 'message',
      created_at: '2022-09-21T14:46:20.167Z',
      certificate_id: undefined,
      badge_id: undefined,
      instructor: undefined,
      student: undefined,
      sender: {
        id: 25524,
        email: 'myockey@cirrusaircraft.com',
        role: 'super_admin',
        admin: true,
        deactivated: false,
        contact: {
          id: 25630,
          firstname: 'Mike',
          lastname: 'Yockey',
          name: 'Mike Yockey',
          contact_user: undefined,
          contactid: undefined,
        },
        salesforce_id: '0054O000009hk3o',
        ctc_admin: false,
      },
      notified_at: '2022-09-21T14:46:20.165Z',
      notifiable: undefined,
    },
    {
      id: 24396,
      body: 'boom boom boom hey hey hey',
      notific_type: 'message',
      created_at: '2022-09-21T14:46:37.180Z',
      certificate_id: undefined,
      badge_id: undefined,
      instructor: undefined,
      student: undefined,
      sender: {
        id: 25524,
        email: 'myockey@cirrusaircraft.com',
        role: 'super_admin',
        admin: true,
        deactivated: false,
        contact: {
          id: 25630,
          firstname: 'Mike',
          lastname: 'Yockey',
          name: 'Mike Yockey',
          contact_user: undefined,
          contactid: undefined,
        },
        salesforce_id: '0054O000009hk3o',
        ctc_admin: false,
      },
      notified_at: '2022-09-21T14:46:37.178Z',
      notifiable: undefined,
    },
  ],
};
