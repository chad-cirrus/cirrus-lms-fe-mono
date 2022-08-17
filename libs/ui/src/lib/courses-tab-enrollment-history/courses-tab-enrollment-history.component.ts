import { Component, Input, OnInit } from '@angular/core';
import { IEnrollmentHistory } from '@cirrus/models';

@Component({
  selector: 'cirrus-courses-tab-enrollment-history',
  templateUrl: './courses-tab-enrollment-history.component.html',
  styleUrls: ['./courses-tab-enrollment-history.component.scss'],
})
export class CoursesTabEnrollmentHistoryComponent {
  @Input() enrollments!: IEnrollmentHistory[];
  @Input() tablet!: boolean;
}
