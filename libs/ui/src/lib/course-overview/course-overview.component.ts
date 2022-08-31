import { Component, Input } from '@angular/core';
import { ICourseOveview } from '@cirrus/models';
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
  private _lessonProgress: { total: number; completed: number } = {
    total: 0,
    completed: 0,
  };

  get lessonProgress() {
    return this._lessonProgress;
  }

  private _progressStatsConfigs: ProgressStatConfig[] = [];

  get progressStatsConfig() {
    return this._progressStatsConfigs;
  }

  private _courseOverview!: ICourseOveview;

  @Input()
  set courseOverview(value: ICourseOveview) {
    this._courseOverview = value;
    this._lessonProgress = value.progress_stats.reduce(
      (prev, curr) => ({
        total: prev.total + curr.total,
        completed: prev.completed + curr.completed,
      }),
      { total: 0, completed: 0 }
    );
    this._progressStatsConfigs = produceProgressStatsConfig(
      value.progress_stats
    );
  }

  get courseOverview() {
    return this._courseOverview;
  }

  get version() {
    return `${this.courseOverview.major_version}.${this.courseOverview.minor_version}`;
  }

}
