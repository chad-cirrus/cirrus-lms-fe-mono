import { Component, Input } from '@angular/core';

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

  @Input() iconUrl = '';
  @Input() label = '';

  private _progress = {
    completed: 0,
    total: 0,
  };

  @Input()
  set progress(value: { completed: number; total: number }) {
    this._progress = value;
    const dave = ((value.completed / value.total) * 100) | 0;
    console.log(dave);
    this._dash = `${dave}, 100`;
  }

  get progress() {
    return this._progress;
  }
}
