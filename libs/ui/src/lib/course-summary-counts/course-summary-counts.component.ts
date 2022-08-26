import { Component, Input } from '@angular/core';
import { ContentCounts } from '@cirrus/models';

@Component({
  selector: 'cirrus-course-summary-counts',
  templateUrl: './course-summary-counts.component.html',
  styleUrls: ['./course-summary-counts.component.scss'],
})
export class CourseSummaryCountsComponent {
  @Input() courseSummaryCounts: ContentCounts = {};
}
