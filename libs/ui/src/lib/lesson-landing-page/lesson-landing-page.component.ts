import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILesson } from '@cirrus/models';

@Component({
  selector: 'cirrus-lesson-landing-page',
  templateUrl: './lesson-landing-page.component.html',
  styleUrls: ['./lesson-landing-page.component.scss'],
})
export class LessonLandingPageComponent implements OnInit {
  @Input() lesson: ILesson | null = {
    title: '',
    subTitle: '',
    progess: [],
    id: 0,
    system_desc: '',
    created_at: '',
    updated_at: '',
    system_name: '',
    lesson_type: 0,
    overview: '',
    is_archived: false,
    contents_are_linear: false,
    is_preview: false,
    major_version: 0,
    minor_version: 0,
    contents: [],
  };
  profileImageUrl = '/assets/ui/images/profile.png';
  libraryImageUrl = '/assets/ui/images/library.png';
  bookOpenImageUrl = '/assets/ui/images/book-open.png';

  @Output() lessonStart = new EventEmitter();

  ngOnInit(): void {}

  startLesson() {
    this.lessonStart.next();
  }
}
