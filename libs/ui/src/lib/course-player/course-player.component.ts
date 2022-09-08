import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICoursePlayerConfig } from '@cirrus/models';

@Component({
  selector: 'cirrus-course-player',
  templateUrl: './course-player.component.html',
  styleUrls: ['./course-player.component.scss'],
})
export class CoursePlayerComponent {
  @Input() config!: ICoursePlayerConfig;
  @Output() navigateToNextLesson = new EventEmitter();

  emitNavigate() {
    this.navigateToNextLesson.emit();
  }
}
