import { Component, Input } from '@angular/core';
import { IStudentAchievement } from '../../models/IRecentActivityInstructors';

@Component({
  selector: 'cirrus-recent-student-achievment',
  templateUrl: './recent-student-achievment.component.html',
  styleUrls: ['./recent-student-achievment.component.scss'],
})
export class RecentStudentAchievmentComponent {
  @Input() student_achievements!: IStudentAchievement[];
}
