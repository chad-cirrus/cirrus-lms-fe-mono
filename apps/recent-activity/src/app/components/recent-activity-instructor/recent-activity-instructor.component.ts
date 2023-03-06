import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SidenavHeaderService } from '@cirrus/sidenav-header';
import { tap } from 'rxjs/operators';
import { RecentActivityService } from '../../services/recent-activity.service';
import { UserState } from '../../store/reducers/cirrus-user.reducer';

@Component({
  selector: 'cirrus-recent-activity-instructor',
  templateUrl: './recent-activity-instructor.component.html',
  styleUrls: ['./recent-activity-instructor.component.scss'],
})
export class RecentActivityInstructorComponent implements OnInit {
  @Output() toggleViewEmit = new EventEmitter();
  @Input() user!: UserState | null;
  @Input() instructorHours!: number | null;
  @Input() studentHours!: number | null;

  recentActivityNotificationsInstructors$ =
    this.recentActivityService.recentActivityNotificationsInstructors$.pipe(
      tap(a => console.log('receent', a))
    );

  constructor(
    private recentActivityService: RecentActivityService,
    private sidenavHeaderService: SidenavHeaderService
  ) {}

  ngOnInit(): void {
    this.recentActivityService.getRecentActivityAndNotificationsInstructor();
  }

  viewAllNotifications() {
    this.sidenavHeaderService.setShowNotifications(true);
  }

  toggleView() {
    this.toggleViewEmit.emit('student');
  }
}
