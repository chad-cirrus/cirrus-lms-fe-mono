import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { FlightHours } from '../../models/IRecentActivity';
import { RecentActivityService } from '../../services/recent-activity.service';
import { UserState } from '../../store/reducers/cirrus-user.reducer';

@Component({
  selector: 'cirrus-recent-activity-instructor',
  templateUrl: './recent-activity-instructor.component.html',
  styleUrls: ['./recent-activity-instructor.component.scss'],
})
export class RecentActivityInstructorComponent {
  @Output() toggleViewEmit = new EventEmitter();
  @Input() user!: UserState | null;
  @Input() instructorHours!: number | null;
  @Input() studentHours!: number | null;

  recentActivityNotifications$ =
    this.recentActivityService.recentActivityNotifications$;

  constructor(private recentActivityService: RecentActivityService) {}

  toggleView() {
    this.toggleViewEmit.emit('student');
  }
}
