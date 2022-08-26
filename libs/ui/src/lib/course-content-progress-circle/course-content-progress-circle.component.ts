import { Component, Input } from '@angular/core';
import { ProgressStatConfig } from '../helpers/produceProgressStatsConfig';

@Component({
  selector: 'cirrus-course-content-progress-circle',
  templateUrl: './course-content-progress-circle.component.html',
  styleUrls: ['./course-content-progress-circle.component.scss'],
})
export class CourseContentProgressCircleComponent {
  private _dash = '0, 100';
  get dash() {
    return this._dash;
  }

  private _progress: ProgressStatConfig = {
    iconUrl: '',
    label: '',
    completed: 0,
    total: 0,
  };

  @Input()
  set progress(value: ProgressStatConfig) {
    this._progress = value;
    const dash = ((value.completed / value.total) * 100) | 0;
    this._dash = `${dash}, 100`;
  }

  get progress() {
    return this._progress;
  }
}
