import { Component, Input } from '@angular/core';
import { CourseWorkStat } from '../../../models/IRecentActivity';

@Component({
  selector: 'cirrus-coursework',
  templateUrl: './coursework.component.html',
  styleUrls: ['./coursework.component.scss'],
})
export class CourseworkComponent {
  @Input() courseWorkStats!: CourseWorkStat[];
}
