import { Component, Input, OnInit } from '@angular/core';
import { Navigation, Pagination, Swiper } from 'swiper';
import { IStudent } from '../../models/IRecentActivityInstructors';
import { RecentActivityFacade } from '../../recent-activity-facade.service';
import { Observable } from 'rxjs';

// install Swiper modules
Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'cirrus-recent-students',
  templateUrl: './recent-students.component.html',
  styleUrls: ['./recent-students.component.scss'],
})
export class RecentStudentsComponent implements OnInit {
  @Input() recentStudents: IStudent[] = [];

  isMyStudentsEnabled$: Observable<boolean> =
   this.facadeService.isFeatureFlagEnabled('my_students');

  constructor(private facadeService: RecentActivityFacade) {}

  ngOnInit(): void {
    this.isMyStudentsEnabled$.subscribe();
  }
}
