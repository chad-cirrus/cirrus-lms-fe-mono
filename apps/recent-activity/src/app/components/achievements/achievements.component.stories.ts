import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { AchievementsComponent } from './achievements.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BadgesComponent } from './badges/badges.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { Achievements } from '../../models/IRecentActivity';

const achievements: Achievements = {
  certificates: [
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
      course_name: 'course three',
      course_attempt_id: 0,
      enrollment_date: '01/01/2021 - 05/06/2021',
    },
    {
      course_name: 'course four',
      course_attempt_id: 0,
      enrollment_date: '01/01/2021 - 05/06/2021',
    },
    {
      course_name: 'course five',
      course_attempt_id: 0,
      enrollment_date: '01/01/2021 - 05/06/2021',
    },
    {
      course_name: 'course six',
      course_attempt_id: 0,
      enrollment_date: '01/01/2021 - 05/06/2021',
    },
    {
      course_name: 'course seven',
      course_attempt_id: 0,
      enrollment_date: '01/01/2021 - 05/06/2021',
    },
  ],
  badges: [
    {
      course_name: 'Perspective CSIP Validation',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/13c79383c44d59cbb0ded750788c83default_badge.png',
      achieved_on: '',
    },
    {
      course_name: 'SR20 Airframe and Powerplant Differences',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/a1ba7a6e54e24244206d411dafbefbbadge-airframe-and-powerplant-sr20.png',
      achieved_on: '',
    },
    {
      course_name: 'IFR Recurrent Check',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/91c97317c8336b3cd60c2269af34b6badge-ifr-recurrent.png',
      achieved_on: '',
    },
    {
      course_name: 'SR22TN Perspective Advanced Transition ',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/aca7f3e271f9d138da064f4e41c957badge-perspective-adv-transition-sr22tn.png',
      achieved_on: '',
    },
    {
      course_name: 'Avidyne Entegra Advanced Avionics Differences',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/5912309e9358013395f75adc931e7cbadge-entegra-adv-differences.png',
      achieved_on: '',
    },
    {
      course_name: 'SR20 Avidyne Entegra Advanced Transition ',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/28cc7159dcbe79ef2e5a1435bc5c70badge-entegra-adv-transition-sr20.png',
      achieved_on: '',
    },
    {
      course_name: 'SR22TN Perspective Transition',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/190dae11b78b47fd387b5260329574badge-perspective-transition-sr22tn.png',
      achieved_on: '',
    },
    {
      course_name: 'VFR Recurrent Check',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/26acc4701443b07a699c8744c1dad0badge-vfr-recurrent.png',
      achieved_on: '',
    },
    {
      course_name: 'Skill Refresher',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/3ea071fa9b5b87613e147705d6c334badge-skill-refresher.png',
      achieved_on: '',
    },
    {
      course_name: 'SR20 Avidyne Entegra Transition',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/865f849c85f06c803d8dc3ba85e133badge-entegra-transition-sr20.png',
      achieved_on: '',
    },
    {
      course_name: 'Avidyne Entegra Avionics Differences Course',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/2a4dcb19fb84ce1bbf2e3c40c38c55badge-entegra-diff.png',
      achieved_on: '',
    },
    {
      course_name: 'Instrument Flight Procedures Course',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/e03db7b1b0ef0a283e3c575d15077dbadge-instrument-procedures.png',
      achieved_on: '',
    },
    {
      course_name: 'Icing Awareness Course',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/c315233b1436bd1a176331153d97a2badge-icing-awareness.png',
      achieved_on: '',
    },
    {
      course_name: 'SR22TN Avidyne Entegra Transition',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/420acbe0dc5f23787ee2e132c9c5d0badge-entegra-transition-sr22tn.png',
      achieved_on: '',
    },
    {
      course_name: 'SR22T Airframe and Powerplant Differences',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/996199f8aa22fd79e9fbc067684e6abadge-airframe-and-powerplant-sr22t.png',
      achieved_on: '',
    },
    {
      course_name: 'CAPS Course',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/c45d2e3d264b94db1ebb4f69a2a741CAPS_Badge-Color.png',
      achieved_on: '',
    },
    {
      course_name: 'SR Series Takeoffs and Landings Course',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/ee730e60aa94aa57339122601bc167TOLD-badge.png',
      achieved_on: '',
    },
    {
      course_name: 'Takeoffs & Landings Flight Syllabus',
      badge_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/ee730e60aa94aa57339122601bc167TOLD-badge.png',
      achieved_on: '',
    },
  ],
};

export default {
  title: 'Achievements',
  component: AchievementsComponent,
  decorators: [
    moduleMetadata({
      imports: [MatTabsModule, BrowserAnimationsModule, MatButtonModule],
      declarations: [BadgesComponent, CertificatesComponent],
    }),
  ],
} as Meta<AchievementsComponent>;

const Template: Story<AchievementsComponent> = (
  args: AchievementsComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
export const NoCertsBadges = Template.bind({});
export const WithCerts = Template.bind({});
WithCerts.args = {
  achievements,
};
