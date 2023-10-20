import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InstructorIntroVideo, StudentIntroVideo } from '@cirrus/models';
import { CONTENT_TYPE } from '@cirrus/models';

@Component({
  selector: 'cirrus-lesson-intro-video',
  templateUrl: './lesson-intro-video.component.html',
  styleUrls: ['./lesson-intro-video.component.scss'],
})
export class LessonIntroVideoComponent {
    @Input() instructorView!: boolean | null;
    @Input() studentIntroVideo?: StudentIntroVideo;
    @Input() instructorIntroVideo?: InstructorIntroVideo;
    @Output() playVideoClicked = new EventEmitter();

    constructor() {}

    willDisplay(): boolean {
      return this.shouldDisplayInstructorIntroVideo() || this.shouldDisplayStudentIntroVideo();
    }

    hasValidStudentIntroVideo(): boolean {
      return !!this.studentIntroVideo && this.studentIntroVideo.content.content_type === CONTENT_TYPE.vimeo;
    }

    hasValidInstructorIntroVideo(): boolean {
      return !!this.instructorIntroVideo && this.instructorIntroVideo.content.content_type === CONTENT_TYPE.vimeo;
    }

    shouldDisplayStudentIntroVideo(): boolean {
      return !this.instructorView && this.hasValidStudentIntroVideo();
    }

    shouldDisplayInstructorIntroVideo(): boolean {
      return !!this.instructorView && this.hasValidInstructorIntroVideo();
    }

    subtitle(): string {
      const title = this.instructorView ? this.instructorIntroVideo?.title : this.studentIntroVideo?.title;
      return (title && title.length > 0) ? title : 'Lesson Introduction Video';
    }

    onPlayVideoClick() {
      this.playVideoClicked.emit();
    }
}
