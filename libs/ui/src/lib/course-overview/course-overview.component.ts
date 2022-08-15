import { Component, Input } from '@angular/core';
import { ICourseOverviewInfo } from '@cirrus/models';

@Component({
  selector: 'cirrus-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss'],
})
export class CourseOverviewComponent {
  @Input() courseOverview!: ICourseOverviewInfo;
}
