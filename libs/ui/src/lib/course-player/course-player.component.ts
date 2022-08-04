import { Component } from '@angular/core';

@Component({
  selector: 'cirrus-course-player',
  templateUrl: './course-player.component.html',
  styleUrls: ['./course-player.component.scss'],
})
export class CoursePlayerComponent {
  lessonNumber = 0;
  chapter = 0;
  description = '';
  buttonText = '';
  thumbnail = 'courses/images/lesson-thumbnail.png';
}
