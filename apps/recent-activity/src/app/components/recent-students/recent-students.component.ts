import { Component, Input } from '@angular/core';
import { Navigation, Pagination, Swiper } from 'swiper';
import { IStudent } from '../../models/IRecentActivityInstructors';

// install Swiper modules
Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'cirrus-recent-students',
  templateUrl: './recent-students.component.html',
  styleUrls: ['./recent-students.component.scss'],
})
export class RecentStudentsComponent {
  @Input() recentStudents: IStudent[] = [];

}
