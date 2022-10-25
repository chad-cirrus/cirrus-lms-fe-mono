import { Badge } from '../../../models/IRecentActivity';
import { BadgesComponent } from './badges.component';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

const badges: Badge[] = [
  {
    course_name: 'SR20 Airframe and Powerplant Differences',
    badge_image:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/a1ba7a6e54e24244206d411dafbefbbadge-airframe-and-powerplant-sr20.png',
    achieved_on: '3/10/22',
  },
  {
    course_name: 'IFR Recurrent Check',
    badge_image:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/91c97317c8336b3cd60c2269af34b6badge-ifr-recurrent.png',
    achieved_on: '3/10/22',
  },
  {
    course_name: 'SR22TN Perspective Advanced Transition ',
    badge_image:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/aca7f3e271f9d138da064f4e41c957badge-perspective-adv-transition-sr22tn.png',
    achieved_on: '3/10/22',
  },
  {
    course_name: 'Avidyne Entegra Advanced Avionics Differences',
    badge_image:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/5912309e9358013395f75adc931e7cbadge-entegra-adv-differences.png',
    achieved_on: '3/10/22',
  },
  {
    course_name: 'SR20 Avidyne Entegra Advanced Transition ',
    badge_image:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/28cc7159dcbe79ef2e5a1435bc5c70badge-entegra-adv-transition-sr20.png',
    achieved_on: '3/10/22',
  },
];

export default {
  title: 'Badges',
  component: BadgesComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterModule.forRoot([], { useHash: true })],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  ],
} as Meta<BadgesComponent>;

const Template: Story<BadgesComponent> = (args: BadgesComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = { badges };

export const NoAchievedBadges = Template.bind({});
NoAchievedBadges.args = {
  badges: badges.map(b => ({ ...b, achieved_on: null })),
};

export const TwoAchievedBadges = Template.bind({});
TwoAchievedBadges.args = {
  badges: [
    ...badges.slice(0, 2),
    ...badges.slice(2, 5).map(b => ({ ...b, achieved_on: null })),
  ],
};
