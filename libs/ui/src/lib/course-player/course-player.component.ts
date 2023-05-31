import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICoursePlayerConfig } from '@cirrus/models';

@Component({
  selector: 'cirrus-course-player',
  templateUrl: './course-player.component.html',
  styleUrls: ['./course-player.component.scss'],
})
export class CoursePlayerComponent {
  @Input() config!: ICoursePlayerConfig;
  @Output() ctaAction = new EventEmitter();
  @Output() watchPreview = new EventEmitter();

  emitNavigate() {
    this.ctaAction.emit();
  }

  emitWatchPreview() {
    this.watchPreview.emit();
  }
}
