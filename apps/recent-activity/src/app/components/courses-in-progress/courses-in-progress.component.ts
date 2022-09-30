import { Component, Input, ViewEncapsulation } from '@angular/core';
import { InProgressCourses } from '../../models/IRecentActivity';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'cirrus-courses-in-progress',
  templateUrl: './courses-in-progress.component.html',
  styleUrls: ['./courses-in-progress.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CoursesInProgressComponent {
  @Input() inProgressCourses: InProgressCourses[] = [];
}
