import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CoursesInProgressComponent } from './courses-in-progress.component';
import { InProgressCourses } from '../../models/IRecentActivity';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SwiperModule } from 'swiper/angular';
import { CourseInProgressValuePipe } from './course-in-progress-value.pipe';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Courses In Progress',
  component: CoursesInProgressComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatProgressBarModule,
        SwiperModule,
        RouterModule.forRoot([], { useHash: true }),
        MatFormFieldModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [CourseInProgressValuePipe],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  ],
} as Meta<CoursesInProgressComponent>;

const Template: Story<CoursesInProgressComponent> = (
  args: CoursesInProgressComponent
) => ({
  props: args,
});

const in_progress_courses: InProgressCourses[] = [
  {
    id: 199,
    name: 'Instrument Flight Procedures Course',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/9d3c6767a85cbfc5288df9d605db16InstrumentCourseThumbnail.jpg',
    lessons_total: 13,
    lessons_completed: 0,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 211,
    name: 'VFR Recurrent Check',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/8958afa9e06742bead773eae984fd5VFRReccurentCourseThumbnail.jpg',
    lessons_total: 6,
    lessons_completed: 4,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 211,
    name: 'VFR Recurrent Check',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/8958afa9e06742bead773eae984fd5VFRReccurentCourseThumbnail.jpg',
    lessons_total: 6,
    lessons_completed: 4,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 213,
    name: 'IFR Recurrent Check',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/8b73a8e9c836dc05abdbd2964a76d5IFRRecurrentCourseThumbnail.jpg',
    lessons_total: 3,
    lessons_completed: 2,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 215,
    name: 'Icing Awareness Course',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/0ca6534b373a1d94371e2a78a7e3d7Thumbnail-Icing_Awareness_Course.jpg',
    lessons_total: 10,
    lessons_completed: 1,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 325,
    name: 'Skill Refresher',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/fab38c4d4501458518c152a56daff3ManueveringThumbnail.jpg',
    lessons_total: 4,
    lessons_completed: 0,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 325,
    name: 'Skill Refresher',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/fab38c4d4501458518c152a56daff3ManueveringThumbnail.jpg',
    lessons_total: 4,
    lessons_completed: 0,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 336,
    name: 'SR22TN Perspective Advanced Transition ',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/e60c931ccdddb53e9ad850d86330f1SR22TCourseThumbnail.jpg',
    lessons_total: 18,
    lessons_completed: 8,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 345,
    name: 'SR22TN Perspective Transition',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/1055f0a70d9c534a855404280a57efSR22TCourseThumbnail.jpg',
    lessons_total: 13,
    lessons_completed: 1,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 348,
    name: 'SR20 Avidyne Entegra Transition',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/5f1053d79b4274a953c2acac4c0803SR20G3CourseThumbnail2.jpg',
    lessons_total: 11,
    lessons_completed: 0,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 349,
    name: 'SR22TN Avidyne Entegra Transition',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/72e52bdaa8449a1b8cd568486befa0Turbo_6-1.jpg',
    lessons_total: 11,
    lessons_completed: 1,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 351,
    name: 'SR20 Avidyne Entegra Advanced Transition ',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/fac20f6e5eb4f50962f0d7340ec9edSR20G3CourseThumbnail2.jpg',
    lessons_total: 15,
    lessons_completed: 2,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 352,
    name: 'SR20 Airframe and Powerplant Differences',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/9ec5aeaf5b6760629bbadc6686d354DiffCourseThumbnail.jpg',
    lessons_total: 5,
    lessons_completed: 3,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 355,
    name: 'SR22T Airframe and Powerplant Differences',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/6812bd09481eb252ab6ae80ade6f3cDiffCourseThumbnail.jpg',
    lessons_total: 5,
    lessons_completed: 1,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 356,
    name: 'Avidyne Entegra Avionics Differences Course',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/9152f2876d44c7c11debf9aa10ba6cAvidyneAvionicsDifferenceCourse.jpg',
    lessons_total: 3,
    lessons_completed: 1,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 357,
    name: 'Avidyne Entegra Advanced Avionics Differences',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/81310b150097086e7af7d2e1593c81AvidyneAvionicsDifferenceCourse.jpg',
    lessons_total: 7,
    lessons_completed: 1,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 360,
    name: 'Takeoffs & Landings Flight Syllabus',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/473f25c35b1d600ceeda8822ead350LandingCourseThumbnail (1).jpg',
    lessons_total: 2,
    lessons_completed: 1,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 466,
    name: 'SR Series Takeoffs and Landings Course',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/e79b1b57db54ef8b5e0486d80f758fTOLDCourseThumnail.jpg',
    lessons_total: 12,
    lessons_completed: 0,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 467,
    name: 'Perspective CSIP Validation',
    thumbnail_image_url: '',
    lessons_total: 7,
    lessons_completed: 0,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
  {
    id: 476,
    name: 'Dave Harms Goofy Course Friday 16, 2022',
    thumbnail_image_url:
      'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/343483f716e544fbf6fd3c50a71a05goofy.png',
    lessons_total: 1,
    lessons_completed: 0,
    next_lesson: {
      stage_id: 0,
      lesson_id: 0,
    },
  },
];

export const Primary = Template.bind({});
Primary.args = {
  inProgressCourses: in_progress_courses.slice(0, 2),
};

export const NoCourses = Template.bind({});
NoCourses.args = {
  inProgressCourses: [],
};

export const FullArray = Template.bind({});
FullArray.args = {
  inProgressCourses: in_progress_courses,
};
