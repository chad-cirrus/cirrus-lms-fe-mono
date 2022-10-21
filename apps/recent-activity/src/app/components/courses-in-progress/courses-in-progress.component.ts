import { Component, Input, ViewEncapsulation } from '@angular/core';
import { InProgressCourses } from '../../models/IRecentActivity';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { environment } from '../../../environments/environment';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'cirrus-courses-in-progress',
  templateUrl: './courses-in-progress.component.html',
  styleUrls: ['./courses-in-progress.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CoursesInProgressComponent {
  private _inProgressCourses: InProgressCourses[] = [];

  @Input()
  set inProgressCourses(value: InProgressCourses[]) {
    this._inProgressCourses = value.map(course => ({
      ...course,
      thumbnail_image_url: course.thumbnail_image_url
        ? course.thumbnail_image_url
        : environment.defaultThumbnailCourse,
    }));
  }

  get inProgressCourses() {
    return this._inProgressCourses;
  }
}
