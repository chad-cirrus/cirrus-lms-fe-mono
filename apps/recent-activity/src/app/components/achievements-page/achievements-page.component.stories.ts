import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { AchievementsPageComponent } from './achievements-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { BadgesFullComponent } from './badges-full/badges-full.component';
import { CertificatesFullComponent } from './certificates-full/certificates-full.component';
import { HttpClientModule } from '@angular/common/http';
import { UiDownloadService } from '@cirrus/ui';
import { RouterModule } from '@angular/router';

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

export default {
  title: 'Achievements Page',
  component: AchievementsPageComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatTabsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        HttpClientModule,
        RouterModule.forRoot([], { useHash: true }),
      ],
      declarations: [BadgesFullComponent, CertificatesFullComponent],
      providers: [
        {
          provide: 'environment',
          useValue: mockEnvironment,
        },
        UiDownloadService,
      ],
    }),
  ],
  parameters: {
    mockData: [
      {
        url: 'http://cirrusapproach.local:3000/api/v4/recent_activity',
        method: 'GET',
        status: 200,
        response: {
          overall_progress: {
            logbook_stats: [
              {
                type: 'completed_total_hours',
                completed: 0,
              },
              {
                type: 'completed_sim_hours',
                completed: 0,
              },
              {
                type: 'completed_actual_instrument_hours',
                completed: 0,
              },
              {
                type: 'completed_ground_instruction_hours',
                completed: 0,
              },
              {
                type: 'completed_cross_country_hours',
                completed: 0,
              },
              {
                type: 'flight_logs_by_month',
                completed: [
                  {
                    total: 0,
                    month: 'NOV',
                    year: '2021',
                  },
                  {
                    total: 0,
                    month: 'DEC',
                    year: '2021',
                  },
                  {
                    total: 0,
                    month: 'JAN',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'FEB',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'MAR',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'APR',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'MAY',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'JUN',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'JUL',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'AUG',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'SEP',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'OCT',
                    year: '2022',
                  },
                ],
              },
            ],
            course_work_stats: [
              {
                type: 'lesson',
                completed: 1,
              },
              {
                type: 'course',
                completed: 0,
              },
              {
                type: 'flight_assessment',
                completed: 0,
              },
              {
                type: 'ground_assessment',
                completed: 0,
              },
              {
                type: 'scorm',
                completed: 0,
              },
              {
                type: 'lessons_by_month',
                completed: [
                  {
                    total: 0,
                    month: 'NOV',
                    year: '2021',
                  },
                  {
                    total: 0,
                    month: 'DEC',
                    year: '2021',
                  },
                  {
                    total: 0,
                    month: 'JAN',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'FEB',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'MAR',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'APR',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'MAY',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'JUN',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'JUL',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'AUG',
                    year: '2022',
                  },
                  {
                    total: 0,
                    month: 'SEP',
                    year: '2022',
                  },
                  {
                    total: 1,
                    month: 'OCT',
                    year: '2022',
                  },
                ],
              },
            ],
            iacra_stats: [
              {
                type: 'completed_dual_received_hours',
                completed: 0,
              },
              {
                type: 'completed_solo_hours',
                completed: 0,
              },
              {
                type: 'completed_cross_country_hours',
                completed: 0,
              },
              {
                type: 'completed_pic_hours',
                completed: 0,
              },
              {
                type: 'completed_night_takeoffs',
                completed: 0,
              },
              {
                type: 'completed_night_landings',
                completed: 0,
              },
              {
                type: 'completed_actual_instrument_hours',
                completed: 0,
              },
              {
                type: 'completed_total_hours',
                completed: 0,
              },
              {
                type: 'completed_cross_country_dual_hours',
                completed: 0,
              },
              {
                type: 'completed_cross_country_pic_hours',
                completed: 0,
              },
              {
                type: 'completed_night_dual_received_hours',
                completed: 0,
              },
              {
                type: 'completed_night_pic_hours',
                completed: 0,
              },
            ],
          },
          achievements: {
            certificates: [],
            badges: [
              {
                course_name: 'CAPS Course',
                badge_image:
                  'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/c45d2e3d264b94db1ebb4f69a2a741CAPS_Badge-Color.png',
                achieved_on: null,
              },
              {
                course_name: 'SR Series Takeoffs and Landings Course',
                badge_image:
                  'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/ee730e60aa94aa57339122601bc167TOLD-badge.png',
                achieved_on: null,
              },
            ],
          },
          in_progress_courses: [
            {
              id: 466,
              name: 'SR Series Takeoffs and Landings Course',
              title: 'SR Series Takeoffs and Landings Course',
              thumbnail_image_url:
                'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/e79b1b57db54ef8b5e0486d80f758fTOLDCourseThumnail.jpg',
              next_lesson: {
                stage_id: 495,
                lesson_id: 856,
              },
              lessons_total: 12,
              lessons_completed: 0,
            },
            {
              id: 424,
              name: 'CAPS Course',
              title: 'CAPS Course',
              thumbnail_image_url:
                'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/e3d276474b41b6bd2d6c151da30d0ccaps_course_card-poster.jpg',
              next_lesson: {
                stage_id: 371,
                lesson_id: 824,
              },
              lessons_total: 8,
              lessons_completed: 1,
            },
          ],
        },
      },
      {
        url: 'http://cirrusapproach.local:3000/api/v3/notifications/my-notifications',
        method: 'GET',
        status: 200,
        response: [
          {
            id: 24396,
            body: 'boom boom boom hey hey hey',
            notific_type: 'message',
            created_at: '2022-09-21T14:46:37.180Z',
            certificate_id: null,
            badge_id: null,
            instructor: null,
            student: null,
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
                contact_user: null,
                contactid: null,
              },
              salesforce_id: '0054O000009hk3o',
              ctc_admin: false,
            },
            notified_at: '2022-09-21T14:46:37.178Z',
            notifiable: null,
          },
          {
            id: 24395,
            body: 'yo yo yo yo',
            notific_type: 'message',
            created_at: '2022-09-21T14:46:20.167Z',
            certificate_id: null,
            badge_id: null,
            instructor: null,
            student: null,
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
                contact_user: null,
                contactid: null,
              },
              salesforce_id: '0054O000009hk3o',
              ctc_admin: false,
            },
            notified_at: '2022-09-21T14:46:20.165Z',
            notifiable: null,
          },
          {
            id: 24394,
            body: 'test test test',
            notific_type: 'message',
            created_at: '2022-09-21T14:46:06.318Z',
            certificate_id: null,
            badge_id: null,
            instructor: null,
            student: null,
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
                contact_user: null,
                contactid: null,
              },
              salesforce_id: '0054O000009hk3o',
              ctc_admin: false,
            },
            notified_at: '2022-09-21T14:46:06.312Z',
            notifiable: null,
          },
        ],
      },
    ],
  },
} as Meta<AchievementsPageComponent>;

const Template: Story<AchievementsPageComponent> = (
  args: AchievementsPageComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
