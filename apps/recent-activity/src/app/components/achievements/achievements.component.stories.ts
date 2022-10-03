import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { AchievementsComponent } from './achievements.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BadgesComponent } from './badges/badges.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Achievements',
  component: AchievementsComponent,
  decorators: [
    moduleMetadata({
      imports: [MatTabsModule, BrowserAnimationsModule],
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
