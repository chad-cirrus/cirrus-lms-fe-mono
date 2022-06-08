import { Component, Input } from '@angular/core';
import { ICourseProgress } from '@cirrus/models';

@Component({
  selector: 'cirrus-lesson-progress-stats',
  templateUrl: './lesson-progress-stats.component.html',
  styleUrls: ['./lesson-progress-stats.component.scss'],
})
export class LessonProgressStatsComponent {
  @Input() progress!: ICourseProgress[];
}
