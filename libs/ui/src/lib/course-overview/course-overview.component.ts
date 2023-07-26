import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourseOverview } from '@cirrus/models';
import {
  produceProgressStatsConfig,
  ProgressStatConfig,
} from '../helpers/produceProgressStatsConfig';


@Component({
  selector: 'cirrus-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss'],
})
export class CourseOverviewComponent {
  
  @Output() navigateTrainingPartners = new EventEmitter<void>();

  private _lessonProgress: { total: number; completed: number } = {
    total: 0,
    completed: 0,
  };

  showHoursAndLandings = false;

  get lessonProgress() {
    return this._lessonProgress;
  }

  private _progressStatsConfigs: ProgressStatConfig[] = [];

  get progressStatsConfig() {
    return this._progressStatsConfigs;
  }

  private _courseOverview!: ICourseOverview;

  @Input()
  set courseOverview(value: ICourseOverview) {
    this._courseOverview = value;
    this._lessonProgress = value.lessons_stats;
    this._progressStatsConfigs = produceProgressStatsConfig(
      value.course_content_stats
    );

    const totalAssessmentContent = value.course_content_stats
      .filter(stat => stat.type !== 'self_study')
      .map(stat => stat.total)
      .reduce((sum, current) => sum + current, 0);

    this.showHoursAndLandings = totalAssessmentContent > 0;
  }

  get courseOverview() {
    return this._courseOverview;
  }

  get version() {
    return `${this.courseOverview.major_version}.${this.courseOverview.minor_version}`;
  }

  emitNavigation() {
    this.navigateTrainingPartners.emit();
  }

}
