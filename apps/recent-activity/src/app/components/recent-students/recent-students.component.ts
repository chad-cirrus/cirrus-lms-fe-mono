import { Component, Input, OnInit } from '@angular/core';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { IRecentStudent } from '../../models/IRecentActivityInstructors';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'cirrus-recent-students',
  templateUrl: './recent-students.component.html',
  styleUrls: ['./recent-students.component.scss'],
})
export class RecentStudentsComponent {
  @Input() recentStudents: IRecentStudent[] = [];
}
